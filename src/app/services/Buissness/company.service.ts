import { Company } from './../../../models/company';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  accesurl=environment.gatewayUrl+'/BUSINESS-SERVICE/business/Companies';
  posturl=this.accesurl+'/newCompany';
  geturl=this.accesurl+'/getCompanyById/';
  getbyemployeeidUrl=this.accesurl+'/getCompanyByEmployeeId/';
  getTotalEmployeesUrl=this.accesurl+'/totalofemployeesbyCompany/';
  getTotalOfficessUrl=this.accesurl+'/totalofofficessbyCompany/';
  getTotalDepartementsUrl=this.accesurl+'/totalofDepartmentsbyCompany/';
  updateCompanyUrl=this.accesurl+'/update/';
  archiveCompanyurl=this.accesurl+'/archive/';
  // {idManager}/{idCompany}
  addmanagerUrl=this.accesurl+'/addManager/';
  deleteCompanyUrl=this.accesurl+'/delete/';
  constructor(private http:HttpClient) { }
  getall(){
    return this.http.get<Company[]>(this.accesurl)
  };
  post(c:Company){
    return this.http.post<Company>(this.posturl,c)
  };
  get(id:number){
    return this.http.get<Company>(this.geturl+id)
  };
  getbyemployeeid(id:number){
    return this.http.get<Company>(this.getbyemployeeidUrl+id)
  };
  getTotalEmployees(id:number){
    return this.http.get<number>(this.getTotalEmployeesUrl+id)
  };
  getTotalOfficess(id:number){
    return this.http.get<number>(this.getTotalOfficessUrl+id)
  };
  getTotalDepartements(id:number){
    return this.http.get<number>(this.getTotalDepartementsUrl+id)
  };
  updateCompany(id:number,c:Company){
    return this.http.put<Company>(this.updateCompanyUrl+id,c)
  };
  archiveCompany(id:number){
    return this.http.put(this.archiveCompanyurl+id,null)
  };
  addmanager(idManager:number,idCompany:number){
    return this.http.put(this.addmanagerUrl+idManager+'/'+idCompany,null)
  };
  deleteCompany(id:number){
    return this.http.delete(this.deleteCompanyUrl+id)
  };
}
