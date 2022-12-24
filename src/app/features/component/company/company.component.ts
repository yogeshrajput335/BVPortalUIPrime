import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Company } from './company';
import { CompanyService } from '../../service/company.service ';

@Component({
    templateUrl: './company.component.html',
    providers: [MessageService]
})
export class CompanyComponent implements OnInit {
    
    company: Company = {};

    companies: Company[] = [];

    companyDialog: boolean = false;

    deleteCompanyDialog: boolean = false;

    deleteCompaniesDialog: boolean = false;

    selectedCompanies: Company[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private companyService: CompanyService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Companies");
        this.loadCompanies();

        this.cols = [
            { field: 'companyName', header: 'Company Name' },
            { field: 'addressLine1', header: 'Address Line1' },
            { field: 'addressLine2', header: 'Address Line2' },
            { field: 'addressLine3', header: 'Address Line3' },
            { field: 'emailAddress', header: 'Email Address' },
            { field: 'phoneNumber', header: 'Phone Number' },
            { field: 'companyLogo', header: 'Company Logo' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

    }
    loadCompanies(){
        this.companyService.getAllCompanies().subscribe((data: any) => {
            this.companies = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    
    openNew() {
        this.company = {};
        this.submitted = false;
        this.companyDialog = true;
    }

    deleteSelectedCompanies() {
        this.deleteCompaniesDialog = true;
    }

    editCompany(company: Company) {
        this.company = { ...company };
        this.companyDialog = true;
    }

    deleteCompany(company: Company) {
        this.deleteCompanyDialog = true;
        this.company = { ...company };
    }

    confirmDeleteSelected() {
        this.deleteCompaniesDialog = false;
        this.companyService.deleteCompanies(this.selectedCompanies).subscribe((data: any) => {
            this.loadCompanies();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Companies Deleted', life: 3000 });
            this.selectedCompanies = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deleteCompanyDialog = false;
        this.companyService.deleteCompany(this.company.id).subscribe((data: any) => {
            this.loadCompanies();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Deleted', life: 3000 });
            this.company = {};
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });


    }

    hideDialog() {
        this.companyDialog = false;
        this.submitted = false;
    }

    saveCompany() {
        this.submitted = true;

        if (this.company.companyName?.trim()) {
            if (this.company.id) {
                this.companyService.updateCompany(this.company).subscribe((data: any) => {
                    this.loadCompanies();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.companyService.addCompany(this.company).subscribe((data: any) => {
                    this.loadCompanies();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Created', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.companyDialog = false;
            this.company = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
