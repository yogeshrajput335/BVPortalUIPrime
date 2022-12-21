import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { User } from '../component/users/user';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpCommonService) { }

    getAllUser() {
      return this.httpClient.get('User/GetUsers');
    }
    getAllEmployeeForDropdown() {
        return this.httpClient.get('Employee/GetEmployeeForDropdown');
    }
    addUser(user: User) {
      return this.httpClient.post('User/InsertUser', user);
    }
    updateUser(user: User) {
      return this.httpClient.put('User/UpdateUser', user);
    }
    deleteUser(id?: number) {
      return this.httpClient.delete('User/DeleteUser/' + id);
    }
    deleteUsers(users: User[]) {
      return this.httpClient.post('User/DeleteUsers',users);
    }
}
