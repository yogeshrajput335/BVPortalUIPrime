import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { Company} from '../component/company/company';

@Injectable()
export class CompanyService {

    constructor(private httpClient: HttpCommonService) { }
    getAllCompanies() {
      return this.httpClient.get('Company/GetCompany');
    }
    addCompany(company: Company) {
      return this.httpClient.post('Company/InsertCompany', company);
    }
    updateCompany(company: any) {
      return this.httpClient.put('Company/UpdateCompany', company);
    }
    deleteCompany(id?: number) {
      return this.httpClient.delete('Company/DeleteCompany/' + id);
    }
    deleteCompanies(companies: Company[]) {
      return this.httpClient.post('Company/DeleteCompany',companies);
    }
}
