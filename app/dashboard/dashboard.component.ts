import { Component, OnInit } from '@angular/core';

import { NodesService, NodegraphModel, NodeModel } from '../sharedservices/index';
import { NodegraphComponent } from '../d3components/nodegraph.component';
import { NodetableComponent } from '../nodetable/nodetable.component';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    directives: [ NodegraphComponent, NodetableComponent ]
})
export class DashboardComponent implements OnInit {
    public nodegraphData: NodegraphModel;
    public nodetableData: NodeModel[];

    constructor(private _nodesService: NodesService) { }

    ngOnInit() { 
          this._nodesService.getNodegraph().then((data: NodegraphModel) => {
            this.nodegraphData = data;
            this.nodetableData = data.nodes;
        }).catch((err) => {
            console.log(err); // customise
        })
    }
}