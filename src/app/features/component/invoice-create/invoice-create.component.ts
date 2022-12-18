import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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

    constructor(private messageService: MessageService,private router: Router,
        private invoiceService: InvoiceService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Create Invoice");
    }

    openInvoiceList(){
        this.router.navigateByUrl('/features/invoice-list');
    }

}
