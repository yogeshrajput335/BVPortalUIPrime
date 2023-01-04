import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { Job} from '../component/job/job';

@Injectable()
export class JobService {

    constructor(private httpClient: HttpCommonService) { }
    getAllJobs() {
      return this.httpClient.get('OpenJobs/GetOpenJobs');
    }
    addJob(job: Job) {
      return this.httpClient.post('OpenJobs/InsertOpenJobs', job);
    }
    updateJob(job: any) {
      return this.httpClient.put('OpenJobs/UpdateOpenJobs', job);
    }
    deleteJob(id?: number) {
      return this.httpClient.delete('OpenJobs/DeleteOpenJobs/' + id);
    }
    deleteJobs(jobs: Job[]) {
      return this.httpClient.post('OpenJobs/DeleteOpenJobs',jobs);
    }
}
