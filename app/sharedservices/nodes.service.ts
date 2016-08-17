import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

const URL_NODES = 'app/sharedservices/nodes.json';

@Injectable()
export class NodesService {

    constructor(private _http: Http) { }

    public getNodeGraphData = (): Promise<any> => {
        return this._http.get(URL_NODES)
            .map((response: Response) => response.json())
            .toPromise()
            .catch((err: any) => {
                console.log("getNodeGraphData", err); // customise
                return Promise.reject(err);
            })
    }
}