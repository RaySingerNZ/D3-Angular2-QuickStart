import { Component, OnInit } from '@angular/core';

import { NodesService } from '../sharedservices/nodes.service';
import { NodegraphComponent } from '../d3components/nodegraph.component';

@Component({
    moduleId: module.id,
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    directives: [ NodegraphComponent ]
})
export class DashboardComponent implements OnInit {
    public nodegraphData: any;
    
    public nodes: Array<any> = [
        {id: "X1"},
        {id: "X2"},
        {id: "X3"},
        {id: "X4"}
    ]
    constructor(private _nodesService: NodesService) { }

    ngOnInit() { 
          this._nodesService.getNodeGraphData().then((data) => {
            this.nodegraphData = data;
        }).catch((err) => {
            console.log(err); // customise
        })
    }

}