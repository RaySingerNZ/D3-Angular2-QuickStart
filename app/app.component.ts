import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NodesService } from './sharedservices/nodes.service';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html',
    directives: [],
    providers: [NodesService]
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
