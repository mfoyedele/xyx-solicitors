import { Routes } from "@angular/router";

import { HomeComponent } from './home';
import { ClientsComponent } from "./clients";
import { CasesComponent } from "./cases";
import { ReportsComponent } from "./reports/reports.component";
import { SettingsComponent } from "./settings";
import { LoginComponent, RegisterComponent } from './account';
import { authGuard } from './_helpers';

const usersRoutes = () => import('./users/users.routes').then(x => x.USERS_ROUTES);

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard] },
    { path: 'clients', component: ClientsComponent, canActivate: [authGuard] },
    { path: 'cases', component: CasesComponent, canActivate: [authGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [authGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
    { path: 'users', loadChildren: usersRoutes, canActivate: [authGuard] },
    { path: 'account/login', component: LoginComponent },
    { path: 'account/register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
