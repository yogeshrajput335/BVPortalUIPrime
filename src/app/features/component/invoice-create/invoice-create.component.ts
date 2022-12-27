import { Company } from './../company/company';
import { GlobalDataService } from './../../../core/services/global-data.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { InvoiceService } from '../../service/invoice-list.service';
import { Invoice } from './invoice-create';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyService } from '../../service/company.service ';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../../service/customer.service ';

@Component({
    templateUrl: './invoice-create.component.html',
    styleUrls: ['./invoice-create.component.scss'],
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceCreateComponent implements OnInit {

    invoice: Invoice = {
        products :[]
    };

    items: MenuItem[] = [];

    customers: any[] = [];

    displayCustomerPanel = false;

    submitted: boolean = false;

    displayCompanyPanel = false;
    displayTagPanel = false;
    masterData:any={}

    selectedCompany:any = {};
    statuses: any[] = [];
    selectedCustomer:any = {};
    selectedProductServices:any[] = [];
    productServices:any[] = []
    grandTotal=0

    constructor(private cd: ChangeDetectorRef,private messageService: MessageService,private router: Router,
        private commonService: CommonService, private globalDataService: GlobalDataService,
        private companyService:CompanyService,private invoiceService : InvoiceService,
        private customerService:CustomerService) {
        }

        newProduct(){
        return {
            id: 0,
            invoiceId: 0,
            product: '',
            service: '',
            itemTypeId: '',
            unit: '',
            quantity: 0,
            rate: 0,
            total: 0,
            isProduct: true,
            description:''
        }
         }
         addProducts() {
            if(this.invoice.products==null){
                this.invoice.products =[]
            }
            this.invoice.products.push(this.newProduct());
            this.cd.detectChanges();
         }
         removeProduct(i:number) {
            this.invoice.products.splice(i, 1);
            this.cd.detectChanges();
          }

          onSave() {
            console.log(this.invoice)
            if(this.invoice.id===0){
                this.invoiceService.addInvoice(this.invoice).subscribe((data: any) => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoice Created', life: 3000 });
                    this.router.navigateByUrl('/features/invoice-list');
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.invoiceService.updateInvoice(this.invoice).subscribe((data: any) => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoice Updated', life: 3000 });
                    this.router.navigateByUrl('/features/invoice-list');
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            }

        }
    ngOnInit() {
        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];
        this.globalDataService.setPageName("Create Invoice");

        this.loadMasterDetails();
    }
    loadMasterDetails(){
        let masters = ['Customer','Company','Product','Service','PaymentOption']
        this.commonService.GetMasterDetails(masters).subscribe((data: any) => {
            this.masterData = data;

            this.masterData.product.forEach((element : any) => {
                this.productServices.push({itemTypeId:'product'+element.id,name:element.productName,isProduct:true,unit:element.unit,quantity:element.quantity??0,rate:element.rate,total:element.total??0})
            });
            this.masterData.service.forEach((element : any) => {
                this.productServices.push({itemTypeId:'service'+element.id,name:element.serviceName,isProduct:false,unit:element.unit,quantity:element.quantity??0,rate:element.rate,total:element.total??0})
            });
            this.invoice.id = 0;
            this.invoice.companyId = this.masterData.company[0].id;
            this.invoice.companyName = this.masterData.company[0].companyName;
            this.invoice.companyAddressLine1 = this.masterData.company[0].addressLine1;
            this.invoice.companyAddressLine2 = this.masterData.company[0].addressLine2;
            this.invoice.companyAddressLine3 = this.masterData.company[0].addressLine3;
            this.invoice.companyEmailAddress = this.masterData.company[0].emailAddress;
            this.invoice.companyPhoneNumber = this.masterData.company[0].phoneNumber;
            this.invoice.customerId = this.masterData.customer[0].id;
            this.invoice.customerName = this.masterData.customer[0].companyName;
            this.invoice.customerAddressLine1 = this.masterData.customer[0].addressLine1;
            this.invoice.customerAddressLine2 = this.masterData.customer[0].addressLine2;
            this.invoice.customerAddressLine3 = this.masterData.customer[0].addressLine3;
            this.invoice.term = this.masterData.customer[0].term;
            this.cd.detectChanges();

            this.globalDataService.getInvoice().subscribe((param: any) => {
                if(param){
                    this.invoice = param;
                }
                this.cd.detectChanges();
            });
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    onProductChange(event:any,i:any){
        let data:any = this.productServices.filter(x=>x.itemTypeId==event.value.itemTypeId)
        this.invoice.products[i].unit = data[0].unit;
        this.invoice.products[i].rate = data[0].rate;
        this.calculateTotal(i)
        this.cd.detectChanges();
    }

    calculateTotal(i:number){
        let subTotal = 0
        if(Number.isFinite(this.invoice.products[i].rate) && Number.isFinite(Number(this.invoice.products[i].quantity))){
            this.invoice.products[i].total = Number(this.invoice.products[i].rate)*Number(this.invoice.products[i].quantity)
            this.invoice.products.forEach((element:any) => {
                subTotal += element.total;
            });
        }
        this.invoice.total=subTotal;
        this.cd.detectChanges();

    }
    EditCustomer(){
        let cust = {
            id:this.invoice.customerId,
            customerName:this.invoice.customerName,
            addressLine1:this.invoice.customerAddressLine1,
            addressLine2:this.invoice.customerAddressLine2,
            addressLine3:this.invoice.customerAddressLine3,
            term:this.invoice.term
        }
        this.customerService.updateCustomer(cust).subscribe((data: any) => {
            this.displayCustomerPanel = false;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Updated', life: 3000 });
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }
    EditCompany(){
        let comp = {
            id:this.invoice.companyId,
            companyName:this.invoice.companyName,
            addressLine1:this.invoice.companyAddressLine1,
            addressLine2:this.invoice.companyAddressLine2,
            addressLine3:this.invoice.companyAddressLine3,
            emailAddress:this.invoice.companyEmailAddress,
            phoneNumber:this.invoice.companyPhoneNumber
        }
        this.companyService.updateCompany(comp).subscribe((data: any) => {
            this.displayCompanyPanel = false;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Updated', life: 3000 });
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    updateDueDate(){
        if(this.invoice.term && this.invoice.invoiceDate){
            this.invoice.dueDate=this.addDays(this.invoice.invoiceDate,Number(this.invoice.term))
            this.cd.detectChanges();
        }
    }
    addDays(theDate:any, days:number) {
        return new Date(theDate.getTime() + days*24*60*60*1000);
    }


}
