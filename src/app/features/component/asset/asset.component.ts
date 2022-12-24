import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
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

    assetTypes: any[] = [];

    assetDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    selectedAssets: Asset[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private messageService: MessageService,
        private assetService: AssetService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Assets");
        this.loadAssetTypes();
        this.loadAssets();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'type', header: 'Type' },
            { field: 'modelNumber', header: 'Model Number' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
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
    loadAssetTypes(){
        this.assetService.getAllAssetTypes().subscribe((data: any) => {
            this.assetTypes = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    openNew() {
        this.asset = {};
        this.submitted = false;
        this.assetDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(asset: Asset) {
        this.asset = { ...asset };
        this.assetDialog = true;
    }

    deleteProduct(asset: Asset) {
        this.deleteProductDialog = true;
        this.asset = { ...asset };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.assetService.deleteAssets(this.selectedAssets).subscribe((data: any) => {
            this.loadAssets();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Assets Deleted', life: 3000 });
            this.selectedAssets = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.assetService.deleteAsset(this.asset.id).subscribe((data: any) => {
            this.loadAssets();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Asset Deleted', life: 3000 });
            this.asset = {};
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });


    }

    hideDialog() {
        this.assetDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.asset.name?.trim()) {
            if (this.asset.id) {
                this.assetService.updateAsset(this.asset).subscribe((data: any) => {
                    this.loadAssets();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.assetService.addAsset(this.asset).subscribe((data: any) => {
                    this.loadAssets();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Asset Created', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.assetDialog = false;
            this.asset = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
