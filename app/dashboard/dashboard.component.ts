import { Component, OnInit } from '@angular/core';
import { NodegraphComponent } from '../d3components/nodegraph.component';

@Component({
    moduleId: module.id,
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    directives: [ NodegraphComponent ]
})
export class DashboardComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}