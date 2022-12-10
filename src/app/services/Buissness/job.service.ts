import { Company } from './../../../models/company';
import { Job } from './../../../models/job';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  accesurl=environment.gatewayUrl+'/BUSINESS-SERVICE/business/jobs'
  getByIdUrl=this.accesurl+'/';
  GetByCompanyUrl=this.accesurl+'/jobsbycompany/';
  findByDepartmentUrl=this.accesurl+'/jobsbydepartment/'
  getActiveByDepartmentUrl=this.accesurl+'/active/jobsbydepartment/'
  getArchivedByDepartmentUrl=this.accesurl+'/archived/jobsbydepartment/'
  getCIDByJobUrl=this.accesurl+'/cidbyjob/';
  findCompanyByJobUrl=this.accesurl+'/companybyjob/';
  getJobByEmployeeIdUrl=this.accesurl+'/jobByEmployeeId/';
  updateUrl=this.accesurl+'/update/';
  // {jobId}/{departmentId}
  addToDepartementUrl=this.accesurl+'/addToDepartement/';
  archiveUrl=this.accesurl+'/archive/';
  deleteUrl=this.accesurl+'/delete/';
  newJobUrl=this.accesurl+'/newjob';
  constructor(private http:HttpClient) { }
  getall(){
    return this.http.get<Job[]>(this.accesurl)
  };
  getById(id:number){
    return this.http.get<Job>(this.getByIdUrl+id)
  };
  GetByCompany(id:number){
    return this.http.get<Job[]>(this.GetByCompanyUrl+id)
  };
  findByDepartmen(id:number){
    return this.http.get<Job[]>(this.findByDepartmentUrl+id)
  };
  getActiveByDepartment(id:number){
    return this.http.get<Job[]>(this.getActiveByDepartmentUrl+id)
  };
  getArchivedByDepartment(id:number){
    return this.http.get<Job[]>(this.getArchivedByDepartmentUrl+id)
  };
  getCIDByJob(id:number){
    return this.http.get<number>(this.getCIDByJobUrl+id)
  };
  findCompanyByJob(id:number){
    return this.http.get<Company>(this.findCompanyByJobUrl+id)
  };
  getJobByEmployeeId(id:number){
    return this.http.get<Job>(this.getJobByEmployeeIdUrl+id)
  };
  update(id:number,j:Job){
    return this.http.put<Job>(this.updateUrl+id,j)
  };
  // {jobId}/{departmentId}
  addToDepartement(jobId:number,departmentId:number){
    return this.http.put(this.addToDepartementUrl+jobId+'/'+departmentId,null)
  };
  archive(id:number){
    return this.http.put(this.archiveUrl+id,null)
  };
  delete(id:number){
    return this.http.delete(this.deleteUrl+id)
  };
  newJob(j:Job){
    return this.http.post<Job>(this.newJobUrl,j)
  };
}
