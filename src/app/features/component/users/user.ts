interface UserStatus {
  label: string;
  value: string;
}
export interface User {
    id?: number;
    username?: string;
    password?: string;
    userType?: string;
    email?: string;
    status?: string;
    employeeId?: number;
    employee?: string;
    userTypeId?:number;
  }
