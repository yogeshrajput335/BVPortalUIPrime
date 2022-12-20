import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { InvoiceService } from '../../service/invoice-list.service';
import { Invoice } from './invoice-create';
import { Router } from '@angular/router';

@Component({
    templateUrl: './invoice-create.component.html',
    styleUrls: ['./invoice-create.component.css'],
    providers: [MessageService]
})
export class InvoiceCreateComponent implements OnInit {

    invoice: Invoice = {};

    items: MenuItem[] = [];

    constructor(private messageService: MessageService,private router: Router,
        private invoiceService: InvoiceService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Create Invoice");
        this.items = [
            {
                icon: 'pi pi-save',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                icon: 'pi pi-print',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                icon: 'pi pi-list',
                command: () => {
                    this.router.navigateByUrl('/features/invoice-list');
                }
            },
            {
                icon: 'pi pi-upload',
                routerLink: ['/fileupload']
            },
            {
                icon: 'pi pi-external-link',
                url: 'http://angular.io'

            }
        ];
    }


}
