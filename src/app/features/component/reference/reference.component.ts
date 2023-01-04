import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Reference } from './reference';
import { ReferenceService } from '../../service/reference.service';

@Component({
    templateUrl: './reference.component.html',
    providers: [MessageService]
})
export class ReferenceComponent implements OnInit {
    
    reference: Reference = {};

    references: Reference[] = [];

    referenceDialog: boolean = false;

    deleteReferenceDialog: boolean = false;

    deleteReferencesDialog: boolean = false;

    selectedReferences: Reference[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private referenceService: ReferenceService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("References");
        this.loadReferences();

        this.cols = [
            { field: 'firstName', header: 'First Name' },
            { field: 'lastName', header: 'Last Name' },
            { field: 'phoneNumber', header: 'Phone Number' },
            { field: 'email', header: 'Email' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

    }
    loadReferences(){
        this.referenceService.getAllReferences().subscribe((data: any) => {
            this.references = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    
    openNew() {
        this.reference = {};
        this.submitted = false;
        this.referenceDialog = true;
    }

    deleteSelectedReferences() {
        this.deleteReferencesDialog = true;
    }

    editReference(reference: Reference) {
        this.reference = { ...reference };
        this.referenceDialog = true;
    }

    deleteReference(reference: Reference) {
        this.deleteReferenceDialog = true;
        this.reference = { ...reference };
    }

    confirmDeleteSelected() {
        this.deleteReferencesDialog = false;
        this.referenceService.deleteReferences(this.selectedReferences).subscribe((data: any) => {
            this.loadReferences();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'References Deleted', life: 3000 });
            this.selectedReferences = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deleteReferenceDialog = false;
        this.referenceService.deleteReference(this.reference.id).subscribe((data: any) => {
            this.loadReferences();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Reference Deleted', life: 3000 });
            this.reference = {};
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });


    }

    hideDialog() {
        this.referenceDialog = false;
        this.submitted = false;
    }

    saveReference() {
        this.submitted = true;

        if (this.reference.firstName?.trim()) {
            if (this.reference.id) {
                this.referenceService.updateReference(this.reference).subscribe((data: any) => {
                    this.loadReferences();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Reference Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.referenceService.addReference(this.reference).subscribe((data: any) => {
                    this.loadReferences();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Reference Created', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.referenceDialog = false;
            this.reference = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
