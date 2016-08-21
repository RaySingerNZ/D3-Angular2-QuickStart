import { Component, OnInit, Input } from '@angular/core';

import { NodeModel } from '../sharedservices/index';

@Component({
    moduleId: module.id,
    selector: 'app-nodetable',
    templateUrl: 'nodetable.component.html'
})
export class NodetableComponent implements OnInit {
    @Input() nodetableData: NodeModel[];

    constructor() { }

    ngOnInit() { }

}