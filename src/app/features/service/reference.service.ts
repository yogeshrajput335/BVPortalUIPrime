import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { Reference} from '../component/reference/reference';

@Injectable()
export class ReferenceService {

    constructor(private httpClient: HttpCommonService) { }
    getAllReferences() {
      return this.httpClient.get('ReferList/GetReferList');
    }
    addReference(reference: Reference) {
      return this.httpClient.post('ReferList/InsertReferList', reference);
    }
    updateReference(reference: any) {
      return this.httpClient.put('ReferList/UpdateReferList', reference);
    }
    deleteReference(id?: number) {
      return this.httpClient.delete('ReferList/DeleteReferList/' + id);
    }
    deleteReferences(references: Reference[]) {
      return this.httpClient.post('ReferList/DeleteReferLists',references);
    }
}
