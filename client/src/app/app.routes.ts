import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'auth',
        component: AuthComponent,
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
