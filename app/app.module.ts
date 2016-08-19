import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HTTP_PROVIDERS } from '@angular/http';

import { bind, provide } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import * as _ from 'lodash';
import { APP_ROUTER_PROVIDER } from './routes';
import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customer/customers.component';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule, HttpModule],
  declarations: [AppComponent, DashboardComponent, CustomersComponent],
  providers: [
    APP_ROUTER_PROVIDER,
    HTTP_PROVIDERS,
    bind(LocationStrategy).toClass(HashLocationStrategy)
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
