interface LeaveStatus {
  label: string;
  value: string;
}
export interface Leave {
    id?: number;
    employeeId?:number;
    fullName?: string;
    leaveTypeId?: number;
    leaveType?: string;
    fromDate?: Date;
    toDate?: Date;
    reason?: string;
    status?: string;
  }
