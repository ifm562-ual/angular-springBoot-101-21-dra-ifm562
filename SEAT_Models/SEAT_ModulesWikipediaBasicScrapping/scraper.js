const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeSeatModels() {
    const url = 'https://es.wikipedia.org/wiki/SEAT';
    try {
        const { data } = await axios.get(url, {
            family: 4, // Force IPv4 to avoid timeout issues in some Node.js environments
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
            }
        });
        const $ = cheerio.load(data);

        const models = [];

        console.log('Searching for tables...');
        const extractModelsFromTable = (tableElement) => {
            console.log(`Processing table... Rows found: ${$(tableElement).find('tr').length}`);
            $(tableElement).find('tr').each((j, row) => {
                const links = $(row).find('a');
                let link = null;
                links.each((k, el) => {
                    if ($(el).text().trim().length > 0) {
                        link = $(el);
                        return false;
                    }
                });

                if (link) {
                    const title = link.text().trim();
                    const href = link.attr('href');
                    if (title && href) {
                        models.push({
                            title: title,
                            url: href.startsWith('http') ? href : `https://es.wikipedia.org${href}`,
                        });
                    }
                }
            });
        };

        console.log('Searching for tables...');
        $('table.infobox').each((i, table) => {
            const $table = $(table);
            const caption = $table.find('caption').text().trim();
            const tdText = $table.find('td').text().trim();

            console.log(`Table ${i} caption: "${caption}"`);

            if (tdText.includes('Modelos anteriores') || caption.includes('Modelos')) {
                extractModelsFromTable(table);
            }
        });

        if (models.length === 0) {
            console.log('No models found. Check the captions printed above.');
        } else {
            console.log('SEAT Models found:');
            console.table(models);

            fs.writeFileSync('models.json', JSON.stringify(models, null, 2));
            console.log('Results saved to models.json');
        }
    } catch (error) {
        console.error('Error fetching data:', error.code || error.message || error);
    }
}

scrapeSeatModels();
