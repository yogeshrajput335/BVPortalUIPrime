import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { AssetType } from '../component/asset-type/asset-type';
import { InvoiceList } from '../component/invoice-list/invoice-list';

@Injectable()
export class InvoiceService {

    constructor(private httpClient: HttpCommonService) { }

    getAllInvoices() {
      return this.httpClient.get('Invoice/GetInvoice');
    }
    addInvoice(invoice: InvoiceList) {
      return this.httpClient.post('Invoice/InsertInvoice', invoice);
    }
    updateInvoice(invoice: InvoiceList) {
      return this.httpClient.put('Invoice/UpdateInvoice', invoice);
    }
    deleteInvoice(id?: number) {
      return this.httpClient.delete('Invoice/DeleteInvoice/' + id);
    }
    deleteInvoices(invoices: InvoiceList[]) {
      return this.httpClient.post('Invoice/DeleteInvoices',invoices);
    }
    getNextInvoiceNumber(){
        return this.httpClient.get('Invoice/GetNextInvoiceNumber');
    }
}
