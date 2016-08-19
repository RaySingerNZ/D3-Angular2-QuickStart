import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NodesService, NodeModel } from '../sharedservices/index';

@Component({
    moduleId: module.id,
    selector: 'app-nodedetails',
    templateUrl: 'nodedetails.component.html'
})
export class NodeDetailsComponent implements OnInit {
    public nodeDetails: NodeModel;

    constructor(
        private _nodesService: NodesService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params
            .map((params: any) => params['id'])
            .subscribe((id: any) => {
                this._nodesService.getNodeByName(id).then((d) => {
                    this.nodeDetails = d;
                    console.log("node", this.nodeDetails);
                });
            });
    }
}