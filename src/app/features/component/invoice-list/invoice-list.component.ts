import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AssetService } from '../../service/asset.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InvoiceList } from './invoice-list';
import { AssetTypeService } from '../../service/asset-type.service';
import { InvoiceService } from '../../service/invoice-list.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './invoice-list.component.html',
    providers: [MessageService]
})
export class InvoiceListComponent implements OnInit, OnDestroy {

    subscriptions = new Subscription();

    invoice: InvoiceList = {};

    invoices: any[] = [];

    assettypeDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    selectedAssetTypes: InvoiceList[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private invoiceService: InvoiceService, private globalDataService: GlobalDataService, private router: Router) { }

    ngOnInit() {
        this.globalDataService.setPageName("Invoices");
        this.loadInvoiceList();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'NEW', value: 'new' },
            { label: 'SENT', value: 'sent' }
        ];
    }
    loadInvoiceList() {
        this.subscriptions.add(
            this.invoiceService.getAllInvoices().subscribe((data: any) => {
                this.invoices = data;
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }

    openNew() {
        this.router.navigateByUrl('/features/invoice-create');
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(invoice: InvoiceList) {
        this.globalDataService.setInvoice(invoice);
        this.router.navigateByUrl('/features/invoice-create');

    }

    deleteProduct(invoice: InvoiceList) {
        this.deleteProductDialog = true;
        this.invoice = { ...invoice };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.subscriptions.add(
            this.invoiceService.deleteInvoices(this.selectedAssetTypes).subscribe((data: any) => {
                this.loadInvoiceList();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoices Deleted', life: 3000 });
                this.selectedAssetTypes = [];
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.subscriptions.add(
            this.invoiceService.deleteInvoice(this.invoice.id).subscribe((data: any) => {
                this.loadInvoiceList();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoice Deleted', life: 3000 });
                this.invoice = {};
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );


    }

    hideDialog() {
        this.assettypeDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.invoice.invoiceNumber && this.invoice.invoiceNumber <= 0) {
            if (this.invoice.id) {
                this.subscriptions.add(
                    this.invoiceService.updateInvoice(this.invoice).subscribe((data: any) => {
                        this.loadInvoiceList();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                    },
                        (error: HttpErrorResponse) => {
                            console.log(error.name + ' ' + error.message);
                        })
                );
            } else {
                this.subscriptions.add(
                    this.invoiceService.addInvoice(this.invoice).subscribe((data: any) => {
                        this.loadInvoiceList();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Asset Created', life: 3000 });
                    },
                        (error: HttpErrorResponse) => {
                            console.log(error.name + ' ' + error.message);
                        })
                );
            }
            this.assettypeDialog = false;
            this.invoice = {};
        } else {
            this.messageService.add({ severity: 'error', summary: 'Warning', detail: 'Please enter valid invoice number', life: 3000 });
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
