const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeSeatModels() {
    const url = 'http://localhost:3000'
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(data);

        const models = [];

        $('table.infobox').each((i, table) => {
            const caption = $(table).find('caption').text().trim();
            if (caption === 'Modelos') {
                $(table)
                    .find('tr')
                    .each((j, row) => {
                        const link = $(row).find('a').first();
                        const title = link.text().trim();
                        const href = link.attr('href');

                        if (title && href) {
                            models.push({
                                title: title,
                                url: href.startsWith('http') ? href : `https://es.wikipedia.org${href}`,
                            });
                        }
                    });
            }
        });

        if (models.length === 0) {
            console.log('No models found.');
        } else {
            console.log('Success! Found', models.length, 'models.');
            // Save to JSON file
            fs.writeFileSync('models.json', JSON.stringify(models, null, 2));
            console.log('Results saved to models.json');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

scrapeSeatModels();

