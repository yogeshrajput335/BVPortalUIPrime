import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { AssetService } from '../../service/asset.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Candidate } from './candidate';
import { CandidateService } from '../../service/candidate.service ';

@Component({
    templateUrl: './candidate.component.html',
    providers: [MessageService]
})
export class CandidateComponent implements OnInit {

    candidate: Candidate = {};

    candidates: any[] = [];

    candidateDialog: boolean = false;

    deleteCandidateDialog: boolean = false;

    deleteCandidatesDialog: boolean = false;

    selectedCandidates: Candidate[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private productService: ProductService, private messageService: MessageService,
        private candidateService: CandidateService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Candidates");
        this.loadCandidates();

        this.cols = [
            { field: 'createdDate', header: 'Created Date' },
            { field: 'name', header: 'Name' },
            { field: 'technology', header: 'Technology' },
            { field: 'visa', header: 'Visa' },
            { field: 'rate', header: 'Rate' },
            { field: 'client', header: 'Client' },
            { field: 'clientContact', header: 'Client Contact' },
            { field: 'clientMail', header: 'Client Mail' },
            { field: 'vendor', header: 'Vendor' },
            { field: 'vendorContact', header: 'Vendor Contact' },
            { field: 'vendorMail', header: 'Vendor Mail' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];
    }

    loadCandidates(){
        this.candidateService.getAllCandidates().subscribe((data: any) => {
            this.candidates = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    openNew() {
        this.candidate = {};
        this.submitted = false;
        this.candidateDialog = true;
    }

    deleteSelectedCandidates() {
        this.deleteCandidatesDialog = true;
    }

    editCandidate(candidate: Candidate) {
        this.candidate = { ...candidate };
        this.candidateDialog = true;
    }

    deleteCandidate(candidate: Candidate) {
        this.deleteCandidateDialog = true;
        this.candidate = { ...candidate };
    }

    confirmDeleteSelected() {
        this.deleteCandidatesDialog = false;
        this.candidateService.deleteCandidates(this.selectedCandidates).subscribe((data: any) => {
            this.loadCandidates();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Candidates Deleted', life: 3000 });
            this.selectedCandidates = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deleteCandidateDialog = false;
        this.candidateService.deleteCandidate(this.candidate.id).subscribe((data: any) => {
            this.loadCandidates();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Candidate Deleted', life: 3000 });
            this.candidate = {};
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    hideDialog() {
        this.candidateDialog = false;
        this.submitted = false;
    }

    saveCandidate() {
        this.submitted = true;

        if (this.candidate.firstName?.trim() && this.candidate.lastName?.trim()) {
            if (this.candidate.id) {
                this.candidateService.updateCandidate(this.candidate).subscribe((data: any) => {
                    this.loadCandidates();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Candidate Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.candidateService.addCandidate(this.candidate).subscribe((data: any) => {
                    this.loadCandidates();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Candidate Created', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.candidateDialog = false;
            this.candidate = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
