import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { LeaveType } from '../component/leave-type/leave-type';

@Injectable()
export class LeaveTypeService {

    constructor(private httpClient: HttpCommonService) { }

    getAllLeaveTypes() {
      return this.httpClient.get('LeaveType/GetLeaveTypes');
    }
    addLeaveType(leaveType: LeaveType) {
      return this.httpClient.post('LeaveType/InsertLeaveType', leaveType);
    }
    updateLeaveType(leaveType: LeaveType) {
      return this.httpClient.put('LeaveType/UpdateLeaveType', leaveType);
    }
    deleteLeaveType(id?: number) {
      return this.httpClient.delete('LeaveType/DeleteLeaveType/' + id);
    }
    deleteLeaveTypes(leaveTypes: LeaveType[]) {
      return this.httpClient.post('LeaveType/DeleteLeaveType',leaveTypes);
    }
}
