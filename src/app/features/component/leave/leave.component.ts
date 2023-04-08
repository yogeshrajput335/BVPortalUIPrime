import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Leave } from './leave';
import { LeaveService } from '../../service/leave.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './leave.component.html',
    providers: [MessageService]
})
export class LeaveComponent implements OnInit, OnDestroy {

    subscriptions = new Subscription();

    leave: Leave = {};

    leaves: Leave[] = [];

    leaveTypes: any[] = [];

    employees: any[] = [];

    leaveDialog: boolean = false;

    deleteLeaveDialog: boolean = false;

    deleteLeavesDialog: boolean = false;

    selectedLeaves: Leave[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private leaveService: LeaveService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Leaves");
        this.loadLeaveTypes();
        this.loadLeaves();

        this.cols = [
            { field: 'fullName', header: 'Full Name' },
            { field: 'leaveType', header: 'Leave Type' },
            { field: 'fromDate', header: 'From Date' },
            { field: 'toDate', header: 'To Date' },
            { field: 'reason', header: 'Reason' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

    }
    loadLeaves() {
        this.subscriptions.add(
            this.leaveService.getAllLeaves().subscribe((data: any) => {
                this.leaves = data;
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }

    loadLeaveTypes() {
        this.subscriptions.add(
            this.leaveService.getAllLeaveTypes().subscribe((data: any) => {
                this.leaveTypes = data;
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }

    loadEmployees() {
        this.subscriptions.add(
            this.leaveService.getAllEmployees().subscribe((data: any) => {
                this.employees = data;
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }

    openNew() {
        this.leave = {};
        this.submitted = false;
        this.leaveDialog = true;
    }

    deleteSelectedLeaves() {
        this.deleteLeavesDialog = true;
    }

    editLeave(leave: Leave) {
        this.leave = { ...leave };
        this.leaveDialog = true;
    }

    deleteLeave(leave: Leave) {
        this.deleteLeaveDialog = true;
        this.leave = { ...leave };
    }

    confirmDeleteSelected() {
        this.deleteLeavesDialog = false;
        this.subscriptions.add(
            this.leaveService.deleteLeaves(this.selectedLeaves).subscribe((data: any) => {
                this.loadLeaves();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leaves Deleted', life: 3000 });
                this.selectedLeaves = [];
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }

    confirmDelete() {
        this.deleteLeaveDialog = false;
        this.subscriptions.add(
            this.leaveService.deleteLeave(this.leave.id).subscribe((data: any) => {
                this.loadLeaves();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leave Deleted', life: 3000 });
                this.leave = {};
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );


    }

    hideDialog() {
        this.leaveDialog = false;
        this.submitted = false;
    }

    saveLeave() {
        this.submitted = true;

        if (this.leave.fullName?.trim()) {
            if (this.leave.id) {
                this.subscriptions.add(
                    this.leaveService.updateLeave(this.leave).subscribe((data: any) => {
                        this.loadLeaves();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leave Updated', life: 3000 });
                    },
                        (error: HttpErrorResponse) => {
                            console.log(error.name + ' ' + error.message);
                        })
                );
            } else {
                this.subscriptions.add(
                    this.leaveService.addLeave(this.leave).subscribe((data: any) => {
                        this.loadLeaves();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leave Created', life: 3000 });
                    },
                        (error: HttpErrorResponse) => {
                            console.log(error.name + ' ' + error.message);
                        })
                );
            }
            this.leaveDialog = false;
            this.leave = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
