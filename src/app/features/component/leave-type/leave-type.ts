interface LeaveTypeStatus {
  label: string;
  value: string;
}
export interface LeaveType {
    id?: number;
    type?: string;
    description?: string;
    status?: string;
  }
