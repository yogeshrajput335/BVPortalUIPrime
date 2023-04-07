import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { Customer} from '../component/customer/customer';

@Injectable()
export class CustomerService {

    constructor(private httpClient: HttpCommonService) { }
    getAllCustomers() {
      return this.httpClient.get('Customer/GetCustomer');
    }
    addCustomer(customer: Customer) {
      return this.httpClient.post('Customer/InsertCustomer', customer);
    }
    updateCustomer(customer: any) {
      return this.httpClient.put('Customer/UpdateCustomer', customer);
    }
    deleteCustomer(id?: number) {
      return this.httpClient.delete('Customer/DeleteCustomer/' + id);
    }
    deleteCustomers(customers: Customer[]) {
      return this.httpClient.post('Customer/DeleteCustomers',customers);
    }
}
