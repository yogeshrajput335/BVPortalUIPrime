import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn : 'root'
  })
export class GlobalDataService {

    private pageName = new BehaviorSubject<any>(undefined);
    private invoice = new BehaviorSubject<any>(undefined);

    getPageName(): BehaviorSubject<any> {
        return this.pageName;
    }

    setPageName(param: any): void {
        this.pageName.next(param);
    }

    getInvoice(): BehaviorSubject<any> {
        return this.invoice;
    }

    setInvoice(param: any): void {
        this.invoice.next(param);
    }
}
