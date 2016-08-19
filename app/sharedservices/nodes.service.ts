import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

import { NodegraphModel, NodeModel } from './nodes.model';

const urlNodegraph = 'app/sharedservices/nodesgraph.json';
const urlNode = 'app/sharedservices/nodes.json';

@Injectable()
export class NodesService {

    constructor(private _http: Http) { }

    public getNodegraph = (): Promise<NodegraphModel> => {
        return this._http.get(urlNodegraph)
            .map((response: Response) => response.json())
            .toPromise()
            .catch((err: any) => {
                console.log("error in getNodegraph", err); // customise
                return Promise.reject(err);
            })
    }

    public getNodes = (): Promise<Array<NodeModel>> => {
        return this._http.get(urlNode)
            .map((response: Response) => response.json())
            .toPromise()
            .catch((err: any) => {
                console.log("error in getNodegraph", err); // customise
                return Promise.reject(err);
            })
    }

    // Bit of a hack ;)
    public getNodeByName = (name: string): Promise<NodeModel> => {
        return this.getNodes().then((nodes: NodeModel[]) => {
            return _.find(nodes, {'name': name});
        }).catch((err: any) => {
            console.log("error in getNodeByName", err); // customise
            return Promise.reject(err);
        })
    }
}