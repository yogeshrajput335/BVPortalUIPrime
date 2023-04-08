import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Job } from './job';
import { JobService } from '../../service/job.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './job.component.html',
    providers: [MessageService]
})
export class JobComponent implements OnInit, OnDestroy {

    subscriptions = new Subscription();

    job: Job = {};

    jobs: Job[] = [];

    jobDialog: boolean = false;

    deleteJobDialog: boolean = false;

    deleteJobsDialog: boolean = false;

    selectedJobs: Job[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private jobService: JobService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Jobs");
        this.loadJobs();

        this.cols = [
            { field: 'jobName', header: 'Job Name' },
            { field: 'profile', header: 'Profile' },
            { field: 'description', header: 'Description' },
            { field: 'startDate', header: 'Start Date' },
            { field: 'country', header: 'Country' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

    }
    loadJobs() {
        this.subscriptions.add(
            this.jobService.getAllJobs().subscribe((data: any) => {
                this.jobs = data;
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }

    openNew() {
        this.job = {};
        this.submitted = false;
        this.jobDialog = true;
    }

    deleteSelectedJobs() {
        this.deleteJobsDialog = true;
    }

    editJob(job: Job) {
        this.job = { ...job };
        this.jobDialog = true;
    }

    deleteJob(job: Job) {
        this.deleteJobDialog = true;
        this.job = { ...job };
    }

    confirmDeleteSelected() {
        this.deleteJobsDialog = false;
        this.subscriptions.add(
            this.jobService.deleteJobs(this.selectedJobs).subscribe((data: any) => {
                this.loadJobs();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Jobs Deleted', life: 3000 });
                this.selectedJobs = [];
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }

    confirmDelete() {
        this.deleteJobDialog = false;
        this.subscriptions.add(
            this.jobService.deleteJob(this.job.id).subscribe((data: any) => {
                this.loadJobs();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Job Deleted', life: 3000 });
                this.job = {};
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );


    }

    hideDialog() {
        this.jobDialog = false;
        this.submitted = false;
    }

    saveJob() {
        this.submitted = true;

        if (this.job.jobName?.trim()) {
            if (this.job.id) {
                this.subscriptions.add(
                    this.jobService.updateJob(this.job).subscribe((data: any) => {
                        this.loadJobs();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Job Updated', life: 3000 });
                    },
                        (error: HttpErrorResponse) => {
                            console.log(error.name + ' ' + error.message);
                        })
                );
            } else {
                this.subscriptions.add(
                    this.jobService.addJob(this.job).subscribe((data: any) => {
                        this.loadJobs();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Job Created', life: 3000 });
                    },
                        (error: HttpErrorResponse) => {
                            console.log(error.name + ' ' + error.message);
                        })
                );
            }
            this.jobDialog = false;
            this.job = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
