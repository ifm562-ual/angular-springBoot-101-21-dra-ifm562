import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Details } from './components/details/details';

const routeConfig: Routes = [
    {
        path: '',
        component: Home,
        title: 'SEAT Models',
    },
    {
        path: 'details/:id',
        component: Details,
        title: 'SEAT Model Details',
    },
];

export default routeConfig;
