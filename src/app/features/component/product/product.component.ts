import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from './product';
import { ProductService } from '../../service/product.service';

@Component({
    templateUrl: './product.component.html',
    providers: [MessageService]
})
export class ProductComponent implements OnInit {
    
    product: Product = {};

    products: Product[] = [];

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private productService: ProductService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Products");
        this.loadProducts();

        this.cols = [
            { field: 'productName', header: 'Product Name' },
            { field: 'unit', header: 'Unit' },
            { field: 'rate', header: 'Rate' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

    }
    loadProducts(){
        this.productService.getAllProducts().subscribe((data: any) => {
            this.products = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    
    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.productService.deleteProducts(this.selectedProducts).subscribe((data: any) => {
            this.loadProducts();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            this.selectedProducts = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.productService.deleteProduct(this.product.id).subscribe((data: any) => {
            this.loadProducts();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            this.product = {};
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });


    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.productName?.trim()) {
            if (this.product.id) {
                this.productService.updateProduct(this.product).subscribe((data: any) => {
                    this.loadProducts();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.productService.addProduct(this.product).subscribe((data: any) => {
                    this.loadProducts();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ProductCreated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.productDialog = false;
            this.product = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
