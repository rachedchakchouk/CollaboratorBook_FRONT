import { Office } from './../../../models/office';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  accesurl=environment.gatewayUrl+'/BUSINESS-SERVICE/business/offices';
  getByCompanyUrl=this.accesurl+'/byCompany/';
  getActiveByCompanyUrl=this.accesurl+'/active/byCompany/';
  getArchivedByCompanyUrl=this.accesurl+'/active/byCompany/';
  getByIdUrl=this.accesurl+'/byid/';
  newOfficeUrl=this.accesurl+'/newOffice';
  updateUrl=this.accesurl+'/update/';
  // {idOffice}/{idCompany}
  addToCompanyUrl=this.accesurl+'/addToCompany/';

  archiveUrl=this.accesurl+'/archive/';
  deleteUrl=this.accesurl+'/delete/';

  constructor(private http:HttpClient) { }
  getall(){
    return this.http.get<Office[]>(this.accesurl)
  };
  getByCompany(id:number){
    return this.http.get<Office[]>(this.getByCompanyUrl+id)
  };
  getActiveByCompany(id:number){
    return this.http.get<Office[]>(this.getActiveByCompanyUrl+id)
  };
  getArchivedByCompany(id:number){
    return this.http.get<Office[]>(this.getArchivedByCompanyUrl+id)
  };
  getById(id:number){
    return this.http.get<Office>(this.getByIdUrl+id)
  };
  newOffice(o:Office){
    return this.http.post<Office>(this.newOfficeUrl,o)
  };
  update(id:number,o:Office){
    return this.http.put<Office>(this.updateUrl+id,o)
  };
  // {idOffice}/{idCompany}
  addToCompany(idOffice:number,idCompany:number){
    return this.http.put(this.addToCompanyUrl+idOffice+'/'+idCompany,null)
  };
  archive(id:number){
    return this.http.put(this.archiveUrl+id,null)
  };
  delete(id:number){
    return this.http.delete(this.deleteUrl+id)
  };
}
