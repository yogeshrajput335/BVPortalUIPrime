import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { Service} from '../component/service/service';

@Injectable()
export class ServiceService {

    constructor(private httpClient: HttpCommonService) { }
    getAllServices() {
      return this.httpClient.get('Service/GetService');
    }
    addService(service: Service) {
      return this.httpClient.post('Service/InsertService', service);
    }
    updateService(service: Service) {
      return this.httpClient.put('Service/UpdateService', service);
    }
    deleteService(id?: number) {
      return this.httpClient.delete('Service/DeleteService/' + id);
    }
    deleteServices(services: Service[]) {
      return this.httpClient.post('Service/DeleteService',services);
    }
}
