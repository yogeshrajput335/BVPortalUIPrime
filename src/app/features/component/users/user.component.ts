import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './user.component.html',
    providers: [MessageService]
})
export class UserComponent implements OnInit, OnDestroy {

    subscriptions = new Subscription();

    users: User[] = [];

    user: User = {};

    userTypes: any[] = [];

    userDialog: boolean = false;

    deleteUserDialog: boolean = false;

    deleteUsersDialog: boolean = false;

    selectedUsers: User[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    employees = []


    constructor(private messageService: MessageService,
        private userService: UserService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Users");
        this.loadEmployees();
        this.loadUsers();


        this.cols = [
            { field: 'username', header: 'UserName' },
            { field: 'userType', header: 'UserType' },
            { field: 'password', header: 'Password' },
            { field: 'email', header: 'Email' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

        this.userTypes = [
            { label: 'Admin', value: 'ADMIN' },
            { label: 'Employee', value: 'EMPLOYEE' }
        ];
    }

    loadUsers() {
        this.subscriptions.add(
            this.userService.getAllUser().subscribe((data: any) => {
                this.users = data;
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }
    loadEmployees() {
        this.subscriptions.add(
            this.userService.getAllEmployeeForDropdown().subscribe((data: any) => {
                this.employees = data;
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDeleteSelected() {
        this.deleteUsersDialog = false;
        this.subscriptions.add(
            this.userService.deleteUsers(this.selectedUsers).subscribe((data: any) => {
                this.loadUsers();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
                this.selectedUsers = [];
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.subscriptions.add(
            this.userService.deleteUser(this.user.id).subscribe((data: any) => {
                this.loadUsers();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
                this.user = {};
            },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                })
        );


    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;

        if (this.user.username?.trim()) {
            if (this.user.id) {
                this.subscriptions.add(
                    this.userService.updateUser(this.user).subscribe((data: any) => {
                        this.loadUsers();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                    },
                        (error: HttpErrorResponse) => {
                            console.log(error.name + ' ' + error.message);
                        })
                );
            } else {
                this.subscriptions.add(
                    this.userService.addUser(this.user).subscribe((data: any) => {
                        this.loadUsers();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
                    },
                        (error: HttpErrorResponse) => {
                            console.log(error.name + ' ' + error.message);
                        })
                );
            }
            this.userDialog = false;
            this.user = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
