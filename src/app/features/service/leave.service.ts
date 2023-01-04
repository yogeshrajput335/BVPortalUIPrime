import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { Leave } from '../component/leave/leave';

@Injectable()
export class LeaveService {

    constructor(private httpClient: HttpCommonService) { }

    getAllLeaves() {
        return this.httpClient.get('Leave/GetLeave');
    }
    getAllLeaveTypes() {
      return this.httpClient.get('LeaveType/GetLeaveTypes');
    }
    getAllEmployees() {
      return this.httpClient.get('Employee/GetEmployee');
    }
    addLeave(leave: Leave) {
      return this.httpClient.post('Leave/InsertLeave', leave);
    }
    updateLeave(leave: Leave) {
      return this.httpClient.put('Leave/UpdateLeave', leave);
    }
    deleteLeave(id?: number) {
      return this.httpClient.delete('Leave/DeleteLeave/' + id);
    }
    deleteLeaves(leaves: Leave[]) {
      return this.httpClient.post('Leave/DeleteLeaves',leaves);
    }
}
