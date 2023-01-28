import { Project } from './../../../models/project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 // accessUrl=environment.gatewayUrl+'/RH-SERVICE/RH/projects'
  accessUrl='http://localhost:8081/RH/projects'
  getByIdUrl=this.accessUrl+'/'
  getByEmployeeUrl=this.accessUrl+'/byemployee/'
  getByCompanyUrl=this.accessUrl+'/ByCompany/'
  getActiveByCompanyUrl=this.accessUrl+'/active/ByCompany/'
  getArchivedByCompanyUrl=this.accessUrl+'/archived/ByCompany/'
  getActiveByEmployeeUrl=this.accessUrl+'/active/byemployee/'
  getArchivedByEmployeeUrl=this.accessUrl+'/archived/byemployee/'
  newProjectUrl=this.accessUrl+'/newProject'
  //{projectId}/{employeeId}
  projectToEmployeeUrl=this.accessUrl+'addtoemployee/'
  updateProjectUrl=this.accessUrl+'/update/'
  archiveProjectUrl=this.accessUrl+'/archive/'
  deleteProjectUrl=this.accessUrl+'/delete/'
  constructor(private http:HttpClient) { }
  getall(){
    return this.http.get<Project[]>(this.accessUrl)
  };
  getById(id:number){
    return this.http.get<Project>(this.getByIdUrl+id)
  };
  getByEmployee(id:number){
    return this.http.get<Project[]>(this.getByEmployeeUrl+id) 
   };
   getActiveByEmployee(id:number){
    return this.http.get<Project[]>(this.getActiveByEmployeeUrl+id) 
   };
   getArchivedByEmployee(id:number){
    return this.http.get<Project[]>(this.getArchivedByEmployeeUrl+id) 
   };
   getByCompany(id:number){
    return this.http.get<Project[]>(this.getByCompanyUrl+id) 
   };
   getActiveByCompany(id:number){
    return this.http.get<Project[]>(this.getActiveByCompanyUrl+id) 
   };
   getArchivedByCompany(id:number){
    return this.http.get<Project[]>(this.getArchivedByCompanyUrl+id) 
   };
   
  newProject(p:Project){
    return this.http.post<Project>(this.newProjectUrl,p)
  };
  projectToEmployee(projectId:number,employeeId:number){
  return this.http.put(this.projectToEmployeeUrl+projectId+'/'+employeeId,null)
  };
  updateProject(id:number,p:Project){
    return this.http.put<Project>(this.updateProjectUrl+id,p)
  };
  archiveProject(id:number){
    return this.http.put(this.archiveProjectUrl+id,null)
  };
  deleteProject(id:number){
    return this.http.delete(this.deleteProjectUrl+id)
  };
}
