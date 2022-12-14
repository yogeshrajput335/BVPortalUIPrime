import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { AssetService } from '../../service/asset.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Asset } from './asset';

@Component({
    templateUrl: './asset.component.html',
    providers: [MessageService]
})
export class AssetComponent implements OnInit {

    assets: Asset[] = [];

    asset: Asset = {};


    assetDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService,private assetService: AssetService) { }

    ngOnInit() {
        this.loadAssets();
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'type', header: 'Type' },
            { field: 'modelNumber', header: 'Model Number' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    loadAssets(){
        this.assetService.getAllAsset().subscribe((data: any) => {
            this.assets = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.assetDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.assetDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.assetDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.asset.name?.trim()) {
            if (this.asset.id) {
                // @ts-ignore
                // this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                // this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                // this.product.id = this.createId();
                // this.product.code = this.createId();
                // this.product.image = 'product-placeholder.svg';
                // // @ts-ignore
                // this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                // this.products.push(this.product);
                this.assetService.addAsset(this.asset);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Asset Created', life: 3000 });
            }
            this.loadAssets();
            //this.assets = [...this.assets];
            this.assetDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
