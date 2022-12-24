import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AssetService } from '../../service/asset.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AssetType } from './asset-type';
import { AssetTypeService } from '../../service/asset-type.service';

@Component({
    templateUrl: './asset-type.component.html',
    providers: [MessageService]
})
export class AssetTypeComponent implements OnInit {

    // assets: AssetType[] = [];

    // asset: AssetType = {};

    // assettype!: { id: number; name: string; description: string; status: string; };
    assettype: AssetType = {};

    assetTypes: any[] = [];

    assettypeDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    selectedAssetTypes: AssetType[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private assettypeService: AssetTypeService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("AssetTypes");
        this.loadAssetTypes();
        // this.loadAssets();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];
    }

    // loadAssets(){
    //     this.assettypeService.getAllAsset().subscribe((data: any) => {
    //         this.assets = data;
    //     },
    //     (error: HttpErrorResponse) => {
    //         console.log(error.name + ' ' + error.message);
    //     });
    // }
    loadAssetTypes(){
        this.assettypeService.getAllAssetTypes().subscribe((data: any) => {
            this.assetTypes = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    openNew() {
        this.assettype = {};
        this.submitted = false;
        this.assettypeDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(assettype: AssetType) {
        this.assettype = { ...assettype };
        this.assettypeDialog = true;
    }

    deleteProduct(assettype: AssetType) {
        this.deleteProductDialog = true;
        this.assettype = { ...assettype };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.assettypeService.deleteAssetTypes(this.selectedAssetTypes).subscribe((data: any) => {
            this.loadAssetTypes();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Assets Deleted', life: 3000 });
            this.selectedAssetTypes = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.assettypeService.deleteAssetType(this.assettype.id).subscribe((data: any) => {
            this.loadAssetTypes();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Asset Deleted', life: 3000 });
            this.assettype = {};
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

        if (this.assettype.name?.trim()) {
            if (this.assettype.id) {
                this.assettypeService.updateAssetType(this.assettype).subscribe((data: any) => {
                    this.loadAssetTypes();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.assettypeService.addAssetType(this.assettype).subscribe((data: any) => {
                    this.loadAssetTypes();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Asset Created', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.assettypeDialog = false;
            this.assettype = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
