import { Component, OnInit } from '@angular/core';

import { NodesService } from '../sharedservices/nodes.service';
import { NodegraphComponent } from '../d3components/nodegraph.component';
import { NodegraphModel, Node } from '../sharedservices/nodes.model';

@Component({
    moduleId: module.id,
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    directives: [ NodegraphComponent ]
})
export class DashboardComponent implements OnInit {
    public nodegraphData: NodegraphModel;
    public nodetableData: Node[];

    constructor(private _nodesService: NodesService) { }

    ngOnInit() { 
          this._nodesService.getNodegraphData().then((data: NodegraphModel) => {
            this.nodegraphData = data;
            this.nodetableData = data.nodes;
        }).catch((err) => {
            console.log(err); // customise
        })
    }

}