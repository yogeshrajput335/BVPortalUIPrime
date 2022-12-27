import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Service } from './service';
import { ServiceService } from '../../service/service.service';

@Component({
    templateUrl: './service.component.html',
    providers: [MessageService]
})
export class ServiceComponent implements OnInit {
    
    service: Service = {};

    services: Service[] = [];

    serviceDialog: boolean = false;

    deleteServiceDialog: boolean = false;

    deleteServicesDialog: boolean = false;

    selectedServices: Service[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private serviceService: ServiceService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Services");
        this.loadServices();

        this.cols = [
            { field: 'serviceName', header: 'Service Name' },
            { field: 'unit', header: 'Unit' },
            { field: 'rate', header: 'Rate' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

    }
    loadServices(){
        this.serviceService.getAllServices().subscribe((data: any) => {
            this.services = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    
    openNew() {
        this.service= {};
        this.submitted = false;
        this.serviceDialog = true;
    }

    deleteSelectedServices() {
        this.deleteServicesDialog = true;
    }

    editService(service: Service) {
        this.service = { ...service };
        this.serviceDialog = true;
    }

    deleteService(service: Service) {
        this.deleteServiceDialog = true;
        this.service = { ...service };
    }

    confirmDeleteSelected() {
        this.deleteServicesDialog = false;
        this.serviceService.deleteServices(this.selectedServices).subscribe((data: any) => {
            this.loadServices();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Services Deleted', life: 3000 });
            this.selectedServices = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deleteServiceDialog = false;
        this.serviceService.deleteService(this.service.id).subscribe((data: any) => {
            this.loadServices();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Deleted', life: 3000 });
            this.service = {};
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });


    }

    hideDialog() {
        this.serviceDialog = false;
        this.submitted = false;
    }

    saveService() {
        this.submitted = true;

        if (this.service.serviceName?.trim()) {
            if (this.service.id) {
                this.serviceService.updateService(this.service).subscribe((data: any) => {
                    this.loadServices();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.serviceService.addService(this.service).subscribe((data: any) => {
                    this.loadServices();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Created', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.serviceDialog = false;
            this.service = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
