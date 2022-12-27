import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentOption } from './payment-option';
import { PaymentOptionService } from '../../service/payment-option.service ';

@Component({
    templateUrl: './payment-option.component.html',
    providers: [MessageService]
})
export class PaymentOptionComponent implements OnInit {
    
    paymentOption: PaymentOption = {};

    paymentOptions: PaymentOption[] = [];

    paymentOptionDialog: boolean = false;

    deletePaymentOptionDialog: boolean = false;

    deletePaymentOptionsDialog: boolean = false;

    selectedPaymentOptions: PaymentOption[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private paymentOptionService: PaymentOptionService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("PaymentOptions");
        this.loadPaymentOptions();

        this.cols = [
            { field: 'paymentOptionName', header: 'Payment Option Name' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

    }
    loadPaymentOptions(){
        this.paymentOptionService.getAllPaymentOptions().subscribe((data: any) => {
            this.paymentOptions = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    
    openNew() {
        this.paymentOption = {};
        this.submitted = false;
        this.paymentOptionDialog = true;
    }

    deleteSelectedPaymentOptions() {
        this.deletePaymentOptionsDialog = true;
    }

    editPaymentOption(paymentOption: PaymentOption) {
        this.paymentOption = { ...paymentOption };
        this.paymentOptionDialog = true;
    }

    deletePaymentOption(paymentOption: PaymentOption) {
        this.deletePaymentOptionDialog = true;
        this.paymentOption = { ...paymentOption };
    }

    confirmDeleteSelected() {
        this.deletePaymentOptionsDialog = false;
        this.paymentOptionService.deletePaymentOptions(this.selectedPaymentOptions).subscribe((data: any) => {
            this.loadPaymentOptions();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Payment Options Deleted', life: 3000 });
            this.selectedPaymentOptions = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deletePaymentOptionDialog = false;
        this.paymentOptionService.deletePaymentOption(this.paymentOption.id).subscribe((data: any) => {
            this.loadPaymentOptions();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Payment Option Deleted', life: 3000 });
            this.paymentOption = {};
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });


    }

    hideDialog() {
        this.paymentOptionDialog = false;
        this.submitted = false;
    }

    savePaymentOption() {
        this.submitted = true;

        if (this.paymentOption.paymentOptionName?.trim()) {
            if (this.paymentOption.id) {
                this.paymentOptionService.updatePaymentOption(this.paymentOption).subscribe((data: any) => {
                    this.loadPaymentOptions();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Payment Option Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.paymentOptionService.addPaymentOption(this.paymentOption).subscribe((data: any) => {
                    this.loadPaymentOptions();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Payment Option Created', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.paymentOptionDialog = false;
            this.paymentOption = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
