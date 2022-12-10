import { Employee } from './../../../models/employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
//accessUrl=environment.gatewayUrl+'/RH-SERVICE/RH/employees'
accessUrl='http://localhost:8081/RH/employees';

getEmployeebyIdUrl=this.accessUrl+'/getemployeebyId/'
getEmployeesByjobUrl=this.accessUrl+'/getemployeesbyjob/'
getActiveEmployeesByjobUrl=this.accessUrl+'/active/getemployeesbyjob/'
getArchivedEmployeesByjobUrl=this.accessUrl+'/archived/getemployeesbyjob/'
findAllByCompanyUrl=this.accessUrl+'/getemloyeebycompany/'
findActiveByCompanyUrl=this.accessUrl+'/active/getemloyeebycompany/'
findArchivedByCompanyUrl=this.accessUrl+'/archived/getemloyeebycompany/'
updateEmployeeUrl=this.accessUrl+'/update/'
//{eId}/{jId}
setJobToEmployeeUrl=this.accessUrl+'/addJob/'
//{employeeId}/{projectId}
setProjectToEmployeeUrl=this.accessUrl+'/addproject/'
archiveEmployeeUrl=this.accessUrl+'/archive/'
newEmployeeUrl=this.accessUrl+'/newEmployee'
deleteEmployeeUrl=this.accessUrl+'/delete/'
  constructor(private http:HttpClient) { }
getall(){
  return this.http.get<Employee[]>(this.accessUrl)
};
getEmployeebyId(id:number){
  return this.http.get<Employee>(this.getEmployeebyIdUrl+id)
};
getEmployeesByjob(id:number){
  return this.http.get<Employee[]>(this.getEmployeesByjobUrl+id)
};
getActiveEmployeesByjob(id:number){
  return this.http.get<Employee[]>(this.getActiveEmployeesByjobUrl+id)
};
getArchivedEmployeesByjob(id:number){
  return this.http.get<Employee[]>(this.getArchivedEmployeesByjobUrl+id)
};
findAllByCompany(id:number){
  return this.http.get<Employee[]>(this.findAllByCompanyUrl+id)
};
findActiveByCompany(id:number){
  return this.http.get<Employee[]>(this.findActiveByCompanyUrl+id)
};
findArchivedByCompany(id:number){
  return this.http.get<Employee[]>(this.findArchivedByCompanyUrl+id)
};
updateEmployee(id:number,e:Employee){
  return this.http.put<Employee>(this.updateEmployeeUrl+id, e)
};
setJobToEmployee(employeeId:number,jobId:number){
  return this.http.put(this.setJobToEmployeeUrl+employeeId+'/'+jobId,null)
};
setProjectToEmployee(employeeId:number,projectId:number){
  return this.http.put(this.setProjectToEmployeeUrl+employeeId+'/'+projectId,null)
};
archiveEmployee(id:number){
  return this.http.put(this.archiveEmployeeUrl+id,null)
};
newEmployee(e:Employee){
  return this.http.post<Employee>(this.newEmployeeUrl,e)
};
deleteEmployee(id:number){
  return this.http.delete(this.deleteEmployeeUrl+id)
};
}
