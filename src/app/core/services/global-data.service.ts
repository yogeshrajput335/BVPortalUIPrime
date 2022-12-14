import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn : 'root'
  })
export class GlobalDataService {

    private pageName = new BehaviorSubject<any>(undefined);

    getPageName(): BehaviorSubject<any> {
        return this.pageName;
    }

    setPageName(param: any): void {
        this.pageName.next(param);
    }
}
