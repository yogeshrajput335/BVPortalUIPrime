import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { InvoiceService } from '../../service/invoice-list.service';
import { Invoice } from './invoice-create';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    templateUrl: './invoice-create.component.html',
    styleUrls: ['./invoice-create.component.scss'],
    providers: [MessageService]
})
export class InvoiceCreateComponent implements OnInit {

    invoice: Invoice = {};

    items: MenuItem[] = [];

    customers: any[] = [];
    //selectedCustomer:any;
    displayCustomerPanel = false;

    displayCompanyPanel = false;
    displayTagPanel = false;
    masterData:any

    selectedCompany:any = null;
    selectedCustomer:any = null;
    productServices:any[] = []

    constructor(private messageService: MessageService,private router: Router,
        private commonService: CommonService, private globalDataService: GlobalDataService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Create Invoice");
        this.loadMasterDetails();
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
            }

        ];
        this.customers = [{id:1,name:'Customer 1'},{id:2,name:'Customer 2'}]
    }
    loadMasterDetails(){
        let masters = ['Customer','Company','Product','Service','PaymentOption']
        this.commonService.GetMasterDetails(masters).subscribe((data: any) => {
            this.masterData = data;
            this.selectedCompany = this.masterData.company[0];
            this.masterData.product.forEach((element : any) => {
                this.productServices.push({id:'product'+element.id,name:element.productName,isProduct:true})
            });
            this.masterData.service.forEach((element : any) => {
                this.productServices.push({id:'service'+element.id,name:element.serviceName,isProduct:false})
            });
            console.log(this.productServices)
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }


}
