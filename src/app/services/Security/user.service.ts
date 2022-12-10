import { Employee } from './../../../models/employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  accessUrl='http://localhost:8087/api/';
  getEmployeeUrl=this.accessUrl+'employee/';
  constructor(private http:HttpClient) { }
  getEmployee(username:string){
    return this.http.get<Employee>(this.getEmployeeUrl+username);
  }
}
