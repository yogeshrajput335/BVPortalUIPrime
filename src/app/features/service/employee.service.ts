import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { Employee } from '../component/employee/employee';

@Injectable()
export class EmployeeService {

    constructor(private httpClient: HttpCommonService) { }
    
    getAllEmployee() {
      return this.httpClient.get('Employee/GetEmployee');
    }
    addEmployee(employee: Employee) {
      return this.httpClient.post('Employee/InsertEmployee', employee);
    }
    updateEmployee(employee: Employee) {
      return this.httpClient.put('Employee/UpdateEmployee', employee);
    }
    deleteEmployee(id?: number) {
      return this.httpClient.delete('Employee/DeleteEmployee/' + id);
    }
    deleteEmployees(employees: Employee[]) {
      return this.httpClient.post('Employee/DeleteEmployees',employees);
    }
}
