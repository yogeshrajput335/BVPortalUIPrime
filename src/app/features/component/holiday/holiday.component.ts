import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Holiday } from './holiday';
import { HolidayService } from '../../service/holiday.service ';

@Component({
    templateUrl: './holiday.component.html',
    providers: [MessageService]
})
export class HolidayComponent implements OnInit {
    
    holiday: Holiday = {};

    holidays: Holiday[] = [];

    holidayDialog: boolean = false;

    deleteHolidayDialog: boolean = false;

    deleteHolidaysDialog: boolean = false;

    selectedHolidays: Holiday[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private messageService: MessageService,
        private holidayService: HolidayService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Holidays");
        this.loadHolidays();

        this.cols = [
            { field: 'holidayName', header: 'Holiday Name' },
            { field: 'description', header: 'Description' },
            { field: 'date', header: 'Date' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

    }
    loadHolidays(){
        this.holidayService.getAllHolidays().subscribe((data: any) => {
            this.holidays = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    
    openNew() {
        this.holiday = {};
        this.submitted = false;
        this.holidayDialog = true;
    }

    deleteSelectedHolidays() {
        this.deleteHolidaysDialog = true;
    }

    editHoliday(holiday: Holiday) {
        this.holiday = { ...holiday };
        this.holidayDialog = true;
    }

    deleteHoliday(holiday: Holiday) {
        this.deleteHolidayDialog = true;
        this.holiday = { ...holiday };
    }

    confirmDeleteSelected() {
        this.deleteHolidaysDialog = false;
        this.holidayService.deleteHolidays(this.selectedHolidays).subscribe((data: any) => {
            this.loadHolidays();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Holidays Deleted', life: 3000 });
            this.selectedHolidays = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deleteHolidayDialog = false;
        this.holidayService.deleteHoliday(this.holiday.id).subscribe((data: any) => {
            this.loadHolidays();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Holiday Deleted', life: 3000 });
            this.holiday = {};
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });


    }

    hideDialog() {
        this.holidayDialog = false;
        this.submitted = false;
    }

    saveHoliday() {
        this.submitted = true;

        if (this.holiday.holidayName?.trim()) {
            if (this.holiday.id) {
                this.holidayService.updateHoliday(this.holiday).subscribe((data: any) => {
                    this.loadHolidays();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Holiday Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.holidayService.addHoliday(this.holiday).subscribe((data: any) => {
                    this.loadHolidays();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Holiday Created', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.holidayDialog = false;
            this.holiday = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
