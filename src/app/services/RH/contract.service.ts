import { Contract } from './../../../models/contract';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  //accessUrl=environment.gatewayUrl+'/RH-SERVICE/RH/contracts'
  accessUrl='http://localhost:8081/RH/contracts';
  getByIdUrl=this.accessUrl+'/'
  getByEmployerUrl=this.accessUrl+'/byEmployer/'
  getActivecontractsByEmployerUrl=this.accessUrl+'/active/byEmployer/'
  getArchivedcontractsByEmployerUrl=this.accessUrl+'/archived/byEmployer/'
  getcontractsByEmployeeUrl=this.accessUrl+'/byEmplyee/'
  getActivecontractsByEmployeeUrl=this.accessUrl+'/active/byEmplyee/'
  getArchivedcontractsByEmployeeUrl=this.accessUrl+'/archived/byEmplyee/'
  newcontractUrl=this.accessUrl+'/newcontract'
  //{idContract}/{idEmployer}
  addToEmployerUrl=this.accessUrl+'/addtoEmployer/'
  //{idEmployee}/{idContract}
  addToEmployeeUrl=this.accessUrl+'/addtoEmployee/'
  updateContractUrl=this.accessUrl+'/update/'
  archiveContractUrl=this.accessUrl+'/archive/'
  deleteContractUrl=this.accessUrl+'/delete/'
  constructor(private http:HttpClient) { }
  getall(){
    return this.http.get<Contract[]>(this.accessUrl);
  };
  getById(id:number){
    return this.http.get<Contract>(this.getByIdUrl+id)
  };
  getByEmployer(id:number){
    return this.http.get<Contract[]>(this.getByEmployerUrl+id)
  };
  getActivecontractsByEmployer(id:number){
    return this.http.get<Contract[]>(this.getActivecontractsByEmployerUrl+id)
  };
  getArchivedcontractsByEmployer(id:number){
    return this.http.get<Contract[]>(this.getArchivedcontractsByEmployerUrl+id)
  };
  getcontractsByEmployee(id:number){
    return this.http.get<Contract[]>(this.getcontractsByEmployeeUrl+id)
  };
  getActivecontractsByEmployee(id:number){
    return this.http.get<Contract[]>(this.getActivecontractsByEmployeeUrl+id)
  };
  getArchivedcontractsByEmployee(id:number){
    return this.http.get<Contract[]>(this.getArchivedcontractsByEmployeeUrl+id)
  };
  newcontract(c:Contract){
    return this.http.post<Contract>(this.newcontractUrl,c)
  };
  addToEmployer(idContract:number,idEmployer:number){
    return this.http.put(this.addToEmployerUrl+idContract+'/'+idEmployer,null)
  };
  addToEmployee(idEmployee:number,idContract:number){
    return this.http.put(this.addToEmployeeUrl+idEmployee+'/'+idEmployee,null)
  };
  updateContract(id:number,c:Contract){
    return this.http.put<Contract>(this.updateContractUrl+id,c)
  };
  archiveContract(id:number){
    return this.http.put(this.archiveContractUrl+id,null)
  };
  deleteContract(id:number){
    return this.http.delete(this.deleteContractUrl+id)
  };
}
