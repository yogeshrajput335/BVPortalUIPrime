import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { Candidate } from '../component/candidate/candidate';

@Injectable()
export class CandidateService {

    constructor(private httpClient: HttpCommonService) { }
    getAllCandidates() {
      return this.httpClient.get('Candidate/GetCandidates');
    }
    addCandidate(candidate: Candidate) {
      return this.httpClient.post('Candidate/InsertCandidate', candidate);
    }
    updateCandidate(candidate: Candidate) {
      return this.httpClient.put('Candidate/UpdateCandidate', candidate);
    }
    deleteCandidate(id?: number) {
      return this.httpClient.delete('Candidate/DeleteCandidate/' + id);
    }
    deleteCandidates(candidates: Candidate[]) {
      return this.httpClient.post('Candidate/DeleteCandidate',candidates);
    }
}
