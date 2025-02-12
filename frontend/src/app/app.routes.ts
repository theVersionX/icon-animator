import { Routes } from '@angular/router';
import { PAGE_ROUTES } from './shared/consts/page-routes';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: PAGE_ROUTES.HOME },
    { path: PAGE_ROUTES.HOME, component: HomeComponent }
];
