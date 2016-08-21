import { provideRouter, RouterConfig } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customer/customers.component';
import { NodeDetailsComponent } from './nodedetails/nodedetails.component';

export const appRoutes: RouterConfig = [
    // base href defined in index.html <base href="/"> {{#unless environment.production}}
    { path: '', component: DashboardComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'nodedetails/:name', component: NodeDetailsComponent }
    // add about here
];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);