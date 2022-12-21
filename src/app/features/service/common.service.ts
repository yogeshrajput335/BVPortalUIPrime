import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { AssetType } from '../component/asset-type/asset-type';
import { InvoiceList } from '../component/invoice-list/invoice-list';

@Injectable()
export class CommonService {

    constructor(private httpClient: HttpCommonService) { }

    GetMasterDetails(masters: string[]) {
      return this.httpClient.post('Master/GetMasters', masters);
    }
}
