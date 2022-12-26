import { GlobalDataService } from './../../../core/services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { InvoiceService } from '../../service/invoice-list.service';
import { Invoice } from './invoice-create';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyService } from '../../service/company.service ';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './invoice-create.component.html',
    styleUrls: ['./invoice-create.component.scss'],
    providers: [MessageService]
})
export class InvoiceCreateComponent implements OnInit {

    invoice: Invoice = {};

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
    counter = Array;
    grandTotal=0
    invoiceForm : FormGroup

    constructor(private messageService: MessageService,private router: Router,
        private commonService: CommonService, private globalDataService: GlobalDataService,
        private companyService:CompanyService,private invoiceService : InvoiceService,
        private fb:FormBuilder) {
            this.invoiceForm = this.fb.group({
                id: 0,
                invoiceNumber: '',
                invoiceDate: '',
                term: 0,
                dueDate: '',
                companyId: 0,
                companyName: '',
                companyAddressLine1: '',
                companyAddressLine2: '',
                companyAddressLine3: '',
                companyEmailAddress: '',
                companyPhoneNumber: '',
                customerId: 0,
                customerName: '',
                customerAddressLine1: '',
                customerAddressLine2: '',
                customerAddressLine3: '',
                status: '',
                total: 0,
                products: this.fb.array([{
                    id: 0,
                    InvoiceId: 0,
                    Product: '',
                    Service: '',
                    itemTypeId: '',
                    Unit: '',
                    Quantity: 0,
                    Rate: 0,
                    Total: 0,
                    IsProduct: null,
                }]) ,
              });
        }

        get products() : FormArray {
            return this.invoiceForm.get("products") as FormArray
          }

        newProduct(): FormGroup {
        return this.fb.group({
            id: 0,
            InvoiceId: 0,
            Product: '',
            Service: '',
            itemTypeId: '',
            Unit: '',
            Quantity: 0,
            Rate: 0,
            Total: 0,
            IsProduct: null,
        })
         }
         addProducts() {
            this.products.push(this.newProduct());
         }
         removeProduct(i:number) {
            this.products.removeAt(i);
          }

          onSubmit() {
            console.log(this.invoiceForm.value);
            if(this.invoiceForm.get('id')?.value===0){
                this.invoiceService.addInvoice(this.invoiceForm.value).subscribe((data: any) => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoice Created', life: 3000 });
                    this.router.navigateByUrl('/features/invoice-list');
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                });
            } else {
                this.invoiceService.updateInvoice(this.invoiceForm.value).subscribe((data: any) => {
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
            this.invoiceForm.setValue({
                id: 0,
                invoiceNumber: 0,
                invoiceDate: '',
                term: 15,
                dueDate: '',
                companyId: this.masterData.company[0].id,
                companyName: this.masterData.company[0].companyName,
                companyAddressLine1: this.masterData.company[0].addressLine1,
                companyAddressLine2: this.masterData.company[0].addressLine2,
                companyAddressLine3: this.masterData.company[0].addressLine3,
                companyEmailAddress: this.masterData.company[0].emailAddress,
                companyPhoneNumber: this.masterData.company[0].phoneNumber,
                customerId: this.masterData.customer[0].id,
                customerName: this.masterData.customer[0].customerName,
                customerAddressLine1: this.masterData.customer[0].addressLine1,
                customerAddressLine2: this.masterData.customer[0].addressLine2,
                customerAddressLine3: this.masterData.customer[0].addressLine3,
                status: 'NEW',
                total: 0,
                products: [{
                    id: 0,
                    InvoiceId: 0,
                    Product: '',
                    Service: '',
                    itemTypeId: '',
                    Unit: '',
                    Quantity: 0,
                    Rate: 0,
                    Total: 0,
                    IsProduct: null,
                }]
             });

            this.globalDataService.getInvoice().subscribe((param: any) => {
                this.invoiceForm.setValue({
                    id: param.id,
                    invoiceNumber: param.invoiceNumber,
                    invoiceDate: param.invoiceDate,
                    term: param.term,
                    dueDate: param.dueDate,
                    companyId: (param.companyId ==null || param.companyId ==0)? this.masterData.company[0].id:param.companyId,
                    companyName: (param.companyId ==null || param.companyId ==0)? this.masterData.company[0].companyName:param.companyName,
                    companyAddressLine1: (param.companyId ==null || param.companyId ==0)? this.masterData.company[0].addressLine1:param.companyAddressLine1,
                    companyAddressLine2: (param.companyId ==null || param.companyId ==0)? this.masterData.company[0].addressLine2:param.companyAddressLine2,
                    companyAddressLine3: (param.companyId ==null || param.companyId ==0)? this.masterData.company[0].addressLine3:param.companyAddressLine3,
                    companyEmailAddress: (param.companyId ==null || param.companyId ==0)? this.masterData.company[0].emailAddress:param.companyEmailAddress,
                    companyPhoneNumber: (param.companyId ==null || param.companyId ==0)? this.masterData.company[0].phoneNumber:param.companyPhoneNumber,
                    customerId: (param.customerId ==null || param.customerId ==0)? this.masterData.customer[0].id:param.customerId,
                    customerName: (param.customerId ==null || param.customerId ==0)? this.masterData.customer[0].customerName:param.customerName,
                    customerAddressLine1: (param.customerId ==null || param.customerId ==0)? this.masterData.customer[0].addressLine1:param.customerAddressLine1,
                    customerAddressLine2: (param.customerId ==null || param.customerId ==0)? this.masterData.customer[0].addressLine2:param.customerAddressLine2,
                    customerAddressLine3: (param.customerId ==null || param.customerId ==0)? this.masterData.customer[0].addressLine3:param.customerAddressLine3,
                    status: param.status,
                    total: param.total,
                    products: param.products
                 });
            });
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    }

    calculateTotal(i:number){
        let subTotal = 0
        this.products.valueChanges.subscribe(value => {
            let t = value.quantity??0*value.rate??0
            this.products.get('total')?.setValue(t)
            subTotal += t
         })
        this.invoiceForm.get('total')?.setValue(subTotal);

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
