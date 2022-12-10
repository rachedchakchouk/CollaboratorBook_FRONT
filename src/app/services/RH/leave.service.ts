import { Holday } from './../../../models/holday';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  accessUrl=environment.gatewayUrl+'/RH-SERVICE/RH/holidays'
  getbyIdUrl=this.accessUrl+'/byId/'
  getByEmployeeUrl=this.accessUrl+'/byemployee/'
  getActiveByEmployeeUrl=this.accessUrl+'/active/byemployee/'
  getArchivedByEmployeeUrl=this.accessUrl+'/archived/byemployee/'
  newHoldayUrl=this.accessUrl+'/newHoliday'
  //{idHolday}/{idEmployee}
  addToEmployeeUrl=this.accessUrl+'/holidaytoemployee/'
  updateUrl=this.accessUrl+'/upadte/'
  archiveUrl=this.accessUrl+'/archive/'
prouveUrl=this.accessUrl+'/prouve/'

  refuseUrl=this.accessUrl+'/refuse/'

  deleteUrl=this.accessUrl+'/delete/'
  constructor(private http:HttpClient) { }
  getall(){
    return this.http.get<Holday[]>(this.accessUrl)
  };
  getbyId(id:number){
    return this.http.get<Holday>(this.getbyIdUrl+id)
  };
  getByEmployee(id:number){
    return this.http.get<Holday[]>(this.getByEmployeeUrl+id)
  };
  getActiveByEmployee(id:number){
    return this.http.get<Holday[]>(this.getActiveByEmployeeUrl+id)
  };
  getArchivedByEmployee(id:number){
    return this.http.get<Holday[]>(this.getArchivedByEmployeeUrl+id)
  };
  newHolday(h:Holday){
    return this.http.post<Holday>(this.newHoldayUrl,h)
  };
  addToEmployee(idHolday:number,idEmployee:number){
    return this.http.put(this.addToEmployeeUrl+idHolday+'/'+idEmployee,null)
  };
  update(id:number,h:Holday){
    return this.http.put<Holday>(this.updateUrl+id,h)
  };
  archive(id:number){
    return this.http.put(this.archiveUrl+id,null)
  };
  prouve(id:number){
    return this.http.put(this.prouveUrl+id,null)
  };
  refuse(id:number){
    return this.http.put(this.refuseUrl+id,null)
  };
  delete(id:number){
    return this.http.delete(this.deleteUrl+id)
  };

}
