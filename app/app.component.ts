import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';

import { CustomersComponent } from './customer/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html',
    directives: [CustomersComponent, DashboardComponent ],
    providers: [HTTP_PROVIDERS]
})
export class AppComponent {

    public showSideNav = () => {
        let sideWrapper = document.getElementById('sidebar-wrapper');
        sideWrapper.classList.add('active');
    }

    public hideSideNav = () => {
        let sideWrapper = document.getElementById('sidebar-wrapper');
        sideWrapper.classList.remove('active');
    }

    public changeColor = () => {
        this.myColor = (this.myColor == "red") ? "green" : "red";
    }

    title = "Customer App";
    name = "Ward";
    myColor = "red";
}
