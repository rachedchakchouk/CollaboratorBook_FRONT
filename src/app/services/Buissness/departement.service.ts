import { Department } from './../../../models/department';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  accesurl=environment.gatewayUrl+'/BUSINESS-SERVICE/business/Departments';
  posturl=this.accesurl+'/newDepartment';
  getByOfficeurl=this.accesurl+'/byOffice/';
  getActiveByOfficeUrl=this.accesurl+'/active/byOffice/';
  getArchivedByOfficeurl=this.accesurl+'/archived/byOffice/';
  getbyIdurl=this.accesurl+'/';
  updateDepartementurl=this.accesurl+'/update/';
  // {departmentId}/{officeId}
  addToOfficeurl=this.accesurl+'/addToOffice/';
  archivedepartmenturl=this.accesurl+'/archive/';
  deleteurl=this.accesurl+'/delete/';
  constructor(private http:HttpClient) { }
  getall(){
    return this.http.get<Department[]>(this.accesurl)
  }
  post(d:Department){
    return this.http.post<Department>(this.posturl,d)
  };
  getActiveByOffice(id:number){
    return this.http.get<Department[]>(this.getActiveByOfficeUrl+id)
  };
  getArchivedByOffice(id:number){
    return this.http.get<Department[]>(this.getArchivedByOfficeurl+id)
  };
  getByOffice(id:number){
    return this.http.get<Department[]>(this.getByOfficeurl+id)
  };
  
  getbyId(id:number){
    return this.http.get<Department>(this.getbyIdurl+id)  
  };
  updateDepartement(id:number,d:Department){
    return this.http.put<Department>(this.updateDepartementurl+id,d)
  };
  // {departmentId}/{officeId}
  addToOffice(departmentId:number,officeId:number){
    return this.http.put(this.addToOfficeurl+departmentId+'/'+officeId,null)
  };
  archivedepartment(id:number){
    return this.http.put(this.archivedepartmenturl+id,null)
  };
  delete(id:number){
    return this.http.delete(this.deleteurl+id)
  };
}
