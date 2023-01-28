import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Clause } from './../../../models/clause';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClauseService {
  // accessUrl=environment.gatewayUrl+'/RH-SERVICE/RH/clauses';
  accessUrl='http://localhost:8081/RH/clauses';
   postUrl=this.accessUrl+'/addclause';
 //postUrl='http://localhost:8081/RH/clauses/addclause';
  getByidUrl=this.accessUrl+'/';
  getByCompanyurl=this.accessUrl+'/comapny/';
  getActiveByCompanyurl=this.accessUrl+'/active/comapny/';
  getArchivedByCompanyurl=this.accessUrl+'/archived/comapny/'
  getByContractUrl=this.accessUrl+'/contract/';
  getActiveByContractUrl=this.accessUrl+'/active/contract/';
  getArchivedByContractUrl=this.accessUrl+'/archived/contract/';
  getByWriterUrl=this.accessUrl+'/writer/';
  getActiveByWriterUrl=this.accessUrl+'/active/writer/';
  getArchivedByWriterUrl=this.accessUrl+'/archived/writer/';
  putUrl=this.accessUrl+'/update/';
  putarchivedUrl=this.accessUrl+'/archive/';
  putnoarchivedUrl=this.accessUrl+'/noarchive/';
  //{idClause}/{idContract}
  putaddToContractUrl=this.accessUrl+'/addtocontract/';
  //{idClause}/{idWriter}
  putaddToWriterUrl=this.accessUrl+'/addtowriter/';
  //{idClause}/{idContract}
  putRemoveFromContractUrl=this.accessUrl+'/removefromcontract/';
  deleteUrl=this.accessUrl+'/delete/';
///noarchive/{id}
  constructor(private http:HttpClient) { }


  getall():Observable<Clause[]>{
    return this.http.get<Clause[]>(this.accessUrl);
  };
  post(c:Clause){
    return this.http.post(this.postUrl, c);
  };
  getByid(id:number){
    return this.http.get<Clause>(this.getByidUrl+id);
  };
  getByCompany(id:number){
    return this.http.get<Clause[]>(this.getByCompanyurl+id)
  }
  getActiveByCompany(id:number){
    return this.http.get<Clause[]>(this.getActiveByCompanyurl+id)
  }
  getArchivedByCompany(id:number){
    return this.http.get<Clause[]>(this.getArchivedByCompanyurl+id)
  }

  getByContract(id:number){
    return this.http.get<Clause[]>(this.getByContractUrl+id)
  };
  getActiveByContract(id:number){
    return this.http.get<Clause[]>(this.getActiveByContractUrl+id)
  }
  getArchivedByContract(id:number){
    return this.http.get<Clause[]>(this.getArchivedByContractUrl+id)
  }
  getByWriter(id:number){
    return this.http.get<Clause[]>(this.getByWriterUrl+id)
  };
  getActiveByWriter(id:number){
    return this.http.get<Clause[]>(this.getActiveByWriterUrl+id)
  }
  getArchivedByWriter(id:number){
    return this.http.get<Clause[]>(this.getArchivedByWriterUrl+id)
  }
  put(id:number,c:Clause){
    return this.http.put<Clause>(this.putUrl+id,c)
  };
  putarchived(id:number){
    return this.http.delete(this.putarchivedUrl+id)
  };
  putnoarchived(id:number){
    return this.http.delete(this.putnoarchivedUrl+id)
  };
  putaddToContract(idClause:number,idContract:number){
    return this.http.put(this.putaddToContractUrl+idClause+'/'+idContract,null)
  };
  putaddToWriter(idClause:number,idWriter:number){
    return this.http.put(this.putaddToWriterUrl+idClause+'/'+idWriter,null)
  };
  putRemoveFromContrac(idClause:number,idContract:number){
    return this.http.put(this.putRemoveFromContractUrl+idClause+'/'+idContract,null)
  };
  delete(id:number){
    return this.http.delete(this.deleteUrl+id)
  };
}
