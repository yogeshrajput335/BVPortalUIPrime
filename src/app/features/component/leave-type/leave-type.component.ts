import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AssetService } from '../../service/asset.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LeaveType } from './leave-type';
import { LeaveTypeService } from '../../service/leave-type.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './leave-type.component.html',
    providers: [MessageService]
})
export class LeaveTypeComponent implements OnInit, OnDestroy {

    subscriptions = new Subscription();

    leaveType: LeaveType = {};

    leaveTypes: any[] = [];

    leaveTypeDialog: boolean = false;

    deleteLeaveTypeDialog: boolean = false;

    deleteLeaveTypesDialog: boolean = false;

    selectedLeaveTypes: LeaveType[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private leaveTypeService: LeaveTypeService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("LeaveTypes");
        this.loadLeaveTypes();

        this.cols = [
            { field: 'type', header: 'Type' },
            { field: 'description', header: 'Description' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];
    }
    loadLeaveTypes() {
        this.subscriptions.add(
            this.leaveTypeService.getAllLeaveTypes().subscribe((data: any) => {
                this.leaveTypes = data;
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }

    openNew() {
        this.leaveType = {};
        this.submitted = false;
        this.leaveTypeDialog = true;
    }

    deleteSelectedLeaveTypes() {
        this.deleteLeaveTypesDialog = true;
    }

    editLeaveType(leaveType: LeaveType) {
        this.leaveType = { ...leaveType };
        this.leaveTypeDialog = true;
    }

    deleteLeaveType(leaveType: LeaveType) {
        this.deleteLeaveTypeDialog = true;
        this.leaveType = { ...leaveType };
    }

    confirmDeleteSelected() {
        this.deleteLeaveTypesDialog = false;
        this.subscriptions.add(
            this.leaveTypeService.deleteLeaveTypes(this.selectedLeaveTypes).subscribe((data: any) => {
                this.loadLeaveTypes();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leave Types Deleted', life: 3000 });
                this.selectedLeaveTypes = [];
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }

    confirmDelete() {
        this.deleteLeaveTypeDialog = false;
        this.subscriptions.add(
            this.leaveTypeService.deleteLeaveType(this.leaveType.id).subscribe((data: any) => {
                this.loadLeaveTypes();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leave Type Deleted', life: 3000 });
                this.leaveType = {};
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );


    }

    hideDialog() {
        this.leaveTypeDialog = false;
        this.submitted = false;
    }

    saveLeaveType() {
        this.submitted = true;

        if (this.leaveType.type?.trim()) {
            if (this.leaveType.id) {
                this.subscriptions.add(
                    this.leaveTypeService.updateLeaveType(this.leaveType).subscribe((data: any) => {
                        this.loadLeaveTypes();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leave Type Updated', life: 3000 });
                    },
                        (error: HttpErrorResponse) => {
                            console.log(error.name + ' ' + error.message);
                        })
                );
            } else {
                this.subscriptions.add(
                    this.leaveTypeService.addLeaveType(this.leaveType).subscribe((data: any) => {
                        this.loadLeaveTypes();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leave Type Created', life: 3000 });
                    },
                        (error: HttpErrorResponse) => {
                            console.log(error.name + ' ' + error.message);
                        })
                );
            }
            this.leaveTypeDialog = false;
            this.leaveType = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
