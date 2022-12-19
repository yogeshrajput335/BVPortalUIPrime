interface EmployeeStatus {
  label: string;
  value: string;
}
export interface Employee {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: number;
    employeeType?: string;
    employeeTypeId?: number;
    status?: string;
  }
