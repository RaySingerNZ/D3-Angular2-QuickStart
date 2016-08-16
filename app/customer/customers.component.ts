import { Component, OnInit } from '@angular/core';
import { CustomerComponent } from './customer.component';
import { CustomerService } from './customer.service';
import { Observable } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'app-customers',
    templateUrl: 'customers.component.html',
    directives: [CustomerComponent],
    // providers injects a service into the component, child components can
    // access these services without having to use the provider, but simply
    // by importing the reference. If the child wants its own instance of
    // a service then use providers to get it's own service through DI
    providers: [CustomerService]
})
export class CustomersComponent implements OnInit {

    customersObs: Observable<any>;
    customersPromise: Promise<any[]>;
    customers: any[];

    // For constructing the object but not doing work
    constructor(private _customerService: CustomerService) { }

    ngOnInit() {
        // Do the work in here instead of the constructor...
        // better for testing to get the data in init rather than ctr
        // this data could be coming from a database call - ie the act of
        // creating the component shouldn't require it to go off and make data calls

        // RX Observable with subscribe to an array
        this._customerService.getCustomers_RxObservable()
            .subscribe(
            // success
            (customers) => {
                this.customers = customers;
            },
            // fail
            (err) => {
                console.log("err on rx obs to array");
            });

        // Straightup promise to array - Wards choice
        // If you want to manipulate the data received from the service then you can't just
        // pipe an observable or promise and you'll have to do this
        this._customerService.getCustomers_Promise()
            .then((customers) => {
                this.customers = customers
            })
            .catch((err) => {
                console.log("err setting customers ", err); // Show nice message
            })

        // Promise
        this.customersPromise = this._customerService.getCustomers_Promise()
            .catch((err) => {
                console.log(err); // Don't do this should show user nice message
                return Observable.of(true); // now eat error if message communicated
            });

        // RX Observable
        this.customersObs = this._customerService.getCustomers_RxObservable()
            .catch((err) => {
                console.log(err); // Don't do this should show user nice message
                return Observable.of(true); // now eat error if message communicated
            });
    }

}


