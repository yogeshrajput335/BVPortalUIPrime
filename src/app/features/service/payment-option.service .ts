import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { PaymentOption } from '../component/payment-option/payment-option';

@Injectable()
export class PaymentOptionService {

    constructor(private httpClient: HttpCommonService) { }
    getAllPaymentOptions() {
      return this.httpClient.get('PaymentOption/GetPaymentOption');
    }
    addPaymentOption(paymentOption: PaymentOption) {
      return this.httpClient.post('PaymentOption/InsertPaymentOption', paymentOption);
    }
    updatePaymentOption(paymentOption: PaymentOption) {
      return this.httpClient.put('PaymentOption/UpdatePaymentOption', paymentOption);
    }
    deletePaymentOption(id?: number) {
      return this.httpClient.delete('PaymentOption/DeletePaymentOption/' + id);
    }
    deletePaymentOptions(paymentOptions: PaymentOption[]) {
      return this.httpClient.post('PaymentOption/DeletePaymentOptions',paymentOptions);
    }
}
