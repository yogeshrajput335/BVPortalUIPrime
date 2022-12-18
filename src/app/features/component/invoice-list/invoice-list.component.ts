import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { AssetService } from '../../service/asset.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InvoiceList } from './invoice-list';
import { AssetTypeService } from '../../service/asset-type.service';
import { InvoiceService } from '../../service/invoice-list.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './invoice-list.component.html',
    providers: [MessageService]
})
export class InvoiceListComponent implements OnInit {

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


    constructor(private productService: ProductService, private messageService: MessageService,
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

    // loadAssets(){
    //     this.invoiceService.getAllAsset().subscribe((data: any) => {
    //         this.assets = data;
    //     },
    //     (error: HttpErrorResponse) => {
    //         console.log(error.name + ' ' + error.message);
    //     });
    // }
    loadInvoiceList(){
        this.invoiceService.getAllInvoices().subscribe((data: any) => {
            this.invoices = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    openNew() {
        this.router.navigateByUrl('/features/invoice-create');
        // this.invoice = {};
        // this.submitted = false;
        // this.assettypeDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(invoice: InvoiceList) {
        this.invoice = { ...invoice };
        this.assettypeDialog = true;
    }

    deleteProduct(invoice: InvoiceList) {
        this.deleteProductDialog = true;
        this.invoice = { ...invoice };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.invoiceService.deleteInvoices(this.selectedAssetTypes).subscribe((data: any) => {
            this.loadInvoiceList();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoices Deleted', life: 3000 });
            this.selectedAssetTypes = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.invoiceService.deleteInvoice(this.invoice.id).subscribe((data: any) => {
            this.loadInvoiceList();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoice Deleted', life: 3000 });
            this.invoice = {};
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });


    }

    hideDialog() {
        this.assettypeDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.invoice.clientName?.trim()) {
            if (this.invoice.id) {
                this.invoiceService.updateInvoice(this.invoice).subscribe((data: any) => {
                    this.loadInvoiceList();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.invoiceService.addInvoice(this.invoice).subscribe((data: any) => {
                    this.loadInvoiceList();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Asset Created', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.assettypeDialog = false;
            this.invoice = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
