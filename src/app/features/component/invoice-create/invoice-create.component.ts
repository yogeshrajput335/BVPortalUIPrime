import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { InvoiceService } from '../../service/invoice-list.service';
import { Invoice } from './invoice-create';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyService } from '../../service/company.service ';

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
    masterData:any={}

    selectedCompany:any = {};
    selectedCustomer:any = {};
    selectedProductServices:any[] = [];
    productServices:any[] = []
    counter = Array;

    constructor(private messageService: MessageService,private router: Router,
        private commonService: CommonService, private globalDataService: GlobalDataService,
        private companyService:CompanyService) { }

    ngOnInit() {
        this.globalDataService.setPageName("Create Invoice");
        if(this.selectedProductServices.length==0){
            this.selectedProductServices.push({itemTypeId:null,unit:'',quantity:0,rate:0,total:0})
        }
        this.loadMasterDetails();
        this.items = [
            {
                icon: 'pi pi-save',
                command: () => {
                    this.saveInvoice();
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
                this.productServices.push({itemTypeId:'product'+element.id,name:element.productName,isProduct:true,unit:element.unit,quantity:element.quantity??0,rate:element.rate,total:element.total??0})
            });
            this.masterData.service.forEach((element : any) => {
                this.productServices.push({itemTypeId:'service'+element.id,name:element.serviceName,isProduct:false,unit:element.unit,quantity:element.quantity??0,rate:element.rate,total:element.total??0})
            });
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    saveInvoice(){
        console.log(this.invoice)
        console.log(this.selectedCompany)
        console.log(this.selectedCustomer)
        console.log(this.selectedProductServices)

    }
    grandTotal=0
    calculateTotal(i:number){
        if(!this.selectedProductServices[i].quantity || isNaN(Number(this.selectedProductServices[i].quantity))) this.selectedProductServices[i].quantity =0;
        if(!this.selectedProductServices[i].rate || isNaN(Number(this.selectedProductServices[i].rate))) this.selectedProductServices[i].rate =0;
        this.selectedProductServices[i].total = this.selectedProductServices[i].quantity*this.selectedProductServices[i].rate;
        this.selectedProductServices.forEach(e => {
            this.grandTotal += e.total;
        });

    }
    EditCompany(){
        this.companyService.updateCompany(this.selectedCompany).subscribe((data: any) => {
            this.displayCompanyPanel = false;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Updated', life: 3000 });
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }


}
