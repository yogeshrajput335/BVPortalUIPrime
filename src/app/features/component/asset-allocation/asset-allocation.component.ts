import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { AssetAllocation } from './asset-allocation';
import { AssetAllocationService } from '../../service/asset-allocation.service';

@Component({
    templateUrl: './asset-allocation.component.html',
    providers: [MessageService]
})
export class AssetAllocationComponent implements OnInit {
    
    assetAllocation: AssetAllocation = {};

    assetAllocations: AssetAllocation[] = [];

    employees: any[] = [];

    assetAllocationDialog: boolean = false;

    deleteAssetAllocationDialog: boolean = false;

    deleteAssetAllocationsDialog: boolean = false;

    selectedAssetAllocations: AssetAllocation[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private assetAllocationService: AssetAllocationService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("AssetAllocations");
        this.loadAssetAllocations();
        this.loadEmployees();

        this.cols = [
            { field: 'assetName', header: 'Asset' },
            { field: 'allocatedById', header: 'Allocated By' },
            { field: 'allocatedToId', header: 'Allocated To' },
            { field: 'allocatedDate', header: 'Allocated Date' },
            { field: 'returnDate', header: 'Return Date' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

    }
    loadAssetAllocations(){
        this.assetAllocationService.getAllAssetAllocations().subscribe((data: any) => {
            this.assetAllocations = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    
    loadEmployees(){
        this.assetAllocationService.getAllEmployees().subscribe((data: any) => {
            this.employees = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    openNew() {
        this.assetAllocation = {};
        this.submitted = false;
        this.assetAllocationDialog = true;
    }

    deleteSelectedAssetAllocations() {
        this.deleteAssetAllocationsDialog = true;
    }

    editAssetAllocation(assetAllocation: AssetAllocation) {
        this.assetAllocation = { ...assetAllocation };
        this.assetAllocationDialog = true;
    }

    deleteAssetAllocation(assetAllocation: AssetAllocation) {
        this.deleteAssetAllocationDialog = true;
        this.assetAllocation = { ...assetAllocation };
    }

    confirmDeleteSelected() {
        this.deleteAssetAllocationsDialog = false;
        this.assetAllocationService.deleteAssetAllocations(this.selectedAssetAllocations).subscribe((data: any) => {
            this.loadAssetAllocations();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Asset Allocations Deleted', life: 3000 });
            this.selectedAssetAllocations = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deleteAssetAllocationDialog = false;
        this.assetAllocationService.deleteAssetAllocation(this.assetAllocation.id).subscribe((data: any) => {
            this.loadAssetAllocations();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Asset Allocation Deleted', life: 3000 });
            this.assetAllocation = {};
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });


    }

    hideDialog() {
        this.assetAllocationDialog = false;
        this.submitted = false;
    }

    saveAssetAllocation() {
        this.submitted = true;

        if (this.assetAllocation.assetName?.trim()) {
            if (this.assetAllocation.id) {
                this.assetAllocationService.updateAssetAllocation(this.assetAllocation).subscribe((data: any) => {
                    this.loadAssetAllocations();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Asset Allocation Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.assetAllocationService.addAssetAllocation(this.assetAllocation).subscribe((data: any) => {
                    this.loadAssetAllocations();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Asset Allocation Created', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.assetAllocationDialog = false;
            this.assetAllocation = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
