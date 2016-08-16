import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

const URL_CUSTOMER = 'app/customer/customers.json';

@Injectable()
export class CustomerService {

    constructor(private _http: Http) { }

    // wards preference
    public getCustomers_Promise = (): Promise<any[]> => {
        return this._http.get(URL_CUSTOMER)
            // If you get 404, no json, throw inside the map
            .map((response: Response) => response.json())
            // Convert to promise then send to the Component
            .toPromise()
            // catch will catch it
            .catch((err: any) => {
                console.log(err); // customise
                return Promise.reject(err)
            });
    }


    getCustomers_RxObservable() {
        return this._http.get(URL_CUSTOMER)
            // If you get 404, no json, throw inside the map
            .map((response: Response) => response.json())
            // catch will catch it
            .catch(this._handleError);
    }

    _handleError(err: any) {
        // console log should be logged to backend db and formatted for devs
        console.log("_handleError: ", err);
        // our customiseable error
        return Observable.throw(err);
    }
}