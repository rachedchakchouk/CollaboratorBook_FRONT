import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  //accessUrl=environment.gatewayUrl+'/RH-SERVICE/RH/notifications'
  accessUrl='http://localhost:8081/RH/holidays'
  findbyidUrl=this.accessUrl+'/getbyId/'
  findByEmployeeUrl=this.accessUrl+'/byemployee/'
  findActiveByEmployeeUrl=this.accessUrl+'/active/byemployee/'
  findArchivedByEmployeeUrl=this.accessUrl+'/archived/byemployee/'

  newNotificationUrl=this.accessUrl+'/newNotification'
  //{idNotification}/{idEmployee}
  addToEmployeeUrl=this.accessUrl+'/addtoemployee/'
  deleteUrl=this.accessUrl+'/delete/'
  constructor(private http:HttpClient) { }
  getall(){
    return this.http.get<Notification[]>(this.accessUrl)
  };
  findbyid(id:number){
    return this.http.get<Notification>(this.findbyidUrl+id)
  };
  findByEmployee(id:number){
    return this.http.get<Notification[]>(this.findByEmployeeUrl+id)
  };
  findActiveByEmployee(id:number){
    return this.http.get<Notification[]>(this.findActiveByEmployeeUrl+id)
  };
  findArchivedByEmployee(id:number){
    return this.http.get<Notification[]>(this.findArchivedByEmployeeUrl+id)
  };
  newNotification(n:Notification){
    return this.http.post<Notification>(this.newNotificationUrl,n)
  };
  addToEmployee(idNotification:number,idEmployee:number){
    return this.http.put(this.addToEmployeeUrl+idNotification+'/'+idEmployee,null)
  };
  delete(id:number){
    return this.http.delete(this.deleteUrl+id)
  };
}
