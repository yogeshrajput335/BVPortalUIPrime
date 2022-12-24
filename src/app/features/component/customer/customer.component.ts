import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Customer } from './customer';
import { CustomerService } from '../../service/customer.service ';

@Component({
    templateUrl: './customer.component.html',
    providers: [MessageService]
})
export class CustomerComponent implements OnInit {
    
    customer: Customer = {};

    customers: Customer[] = [];

    customerDialog: boolean = false;

    deleteCustomerDialog: boolean = false;

    deleteCustomersDialog: boolean = false;

    selectedCustomers: Customer[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private customerService: CustomerService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Customers");
        this.loadCustomers();

        this.cols = [
            { field: 'customerName', header: 'Customer Name' },
            { field: 'addressLine1', header: 'Address Line1' },
            { field: 'addressLine2', header: 'Address Line2' },
            { field: 'addressLine3', header: 'Address Line3' },
            { field: 'emailAddress', header: 'Email Address' },
            { field: 'phoneNumber', header: 'Phone Number' },
            { field: 'term', header: 'Term' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

    }
    loadCustomers(){
        this.customerService.getAllCustomers().subscribe((data: any) => {
            this.customers = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    
    openNew() {
        this.customer = {};
        this.submitted = false;
        this.customerDialog = true;
    }

    deleteSelectedCustomers() {
        this.deleteCustomersDialog = true;
    }

    editCustomer(customer: Customer) {
        this.customer = { ...customer };
        this.customerDialog = true;
    }

    deleteCustomer(customer: Customer) {
        this.deleteCustomerDialog = true;
        this.customer = { ...customer };
    }

    confirmDeleteSelected() {
        this.deleteCustomersDialog = false;
        this.customerService.deleteCustomers(this.selectedCustomers).subscribe((data: any) => {
            this.loadCustomers();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customers Deleted', life: 3000 });
            this.selectedCustomers = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deleteCustomerDialog = false;
        this.customerService.deleteCustomer(this.customer.id).subscribe((data: any) => {
            this.loadCustomers();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Deleted', life: 3000 });
            this.customer = {};
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });


    }

    hideDialog() {
        this.customerDialog = false;
        this.submitted = false;
    }

    saveCustomer() {
        this.submitted = true;

        if (this.customer.customerName?.trim()) {
            if (this.customer.id) {
                this.customerService.updateCustomer(this.customer).subscribe((data: any) => {
                    this.loadCustomers();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.customerService.addCustomer(this.customer).subscribe((data: any) => {
                    this.loadCustomers();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Created', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.customerDialog = false;
            this.customer = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
