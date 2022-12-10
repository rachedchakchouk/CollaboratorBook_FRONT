import { Project } from './../../../models/project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  accessUrl=environment.gatewayUrl+'/RH-SERVICE/RH/projects'
  getByIdUrl=this.accessUrl+'/'
  getByEmployeeUrl=this.accessUrl+'/byemployee/'
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
    return this.http.get<Project[]>(this.getArchivedByEmployeeUrl+id) 
   };
   getArchivedByEmployee(id:number){
    return this.http.get<Project[]>(this.getArchivedByEmployeeUrl+id) 
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
