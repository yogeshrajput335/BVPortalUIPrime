import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from './employee';
import { EmployeeService } from '../../service/employee.service';

@Component({
    templateUrl: './employee.component.html',
    providers: [MessageService]
})
export class EmployeeComponent implements OnInit {
    
    employee: Employee = {};

    employees: Employee[] = [];

    employeeTypes: any[] = [];

    employeeDialog: boolean = false;

    deleteEmployeeDialog: boolean = false;

    deleteEmployeesDialog: boolean = false;

    selectedEmployees: Employee[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    constructor(private productService: ProductService, private messageService: MessageService,
        private employeeService: EmployeeService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Employees");
        this.loadEmployees();

        this.cols = [
            { field: 'firstName', header: 'First Name' },
            { field: 'lastName', header: 'Last Name' },
            { field: 'email', header: 'Email' },
            { field: 'phoneNumber', header: 'Phone Number' },
            { field: 'employeeType', header: 'Employee Type' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

        this.employeeTypes = [
            { label: 'Permanent', value: 'PERMANENT' },
            { label: 'Contract', value: 'CONTRACT' }
        ];
    }
    loadEmployees(){
        this.employeeService.getAllEmployee().subscribe((data: any) => {
            this.employees = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    
    openNew() {
        this.employee = {};
        this.submitted = false;
        this.employeeDialog = true;
    }

    deleteSelectedEmployees() {
        this.deleteEmployeesDialog = true;
    }

    editEmployee(employee: Employee) {
        this.employee = { ...employee };
        this.employeeDialog = true;
    }

    deleteEmployee(employee: Employee) {
        this.deleteEmployeeDialog = true;
        this.employee = { ...employee };
    }

    confirmDeleteSelected() {
        this.deleteEmployeesDialog = false;
        this.employeeService.deleteEmployees(this.selectedEmployees).subscribe((data: any) => {
            this.loadEmployees();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });
            this.selectedEmployees = [];
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    confirmDelete() {
        this.deleteEmployeeDialog = false;
        this.employeeService.deleteEmployee(this.employee.id).subscribe((data: any) => {
            this.loadEmployees();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
            this.employee = {};
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });


    }

    hideDialog() {
        this.employeeDialog = false;
        this.submitted = false;
    }

    saveEmployee() {
        this.submitted = true;

        if (this.employee.firstName?.trim()) {
            if (this.employee.id) {
                this.employeeService.updateEmployee(this.employee).subscribe((data: any) => {
                    this.loadEmployees();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.employeeService.addEmployee(this.employee).subscribe((data: any) => {
                    this.loadEmployees();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }
            this.employeeDialog = false;
            this.employee = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
