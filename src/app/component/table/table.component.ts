import { DocumentService } from './../../services/RH/document.service';
import { Job } from './../../../models/job';
import { JobService } from './../../services/Buissness/job.service';
import { DepartementService } from './../../services/Buissness/departement.service';
import { OfficeService } from './../../services/Buissness/office.service';
import { Employee } from './../../../models/employee';
import { Department } from './../../../models/department';
import { Office } from './../../../models/office';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { EmployeeService } from './../../services/RH/employee.service';
import { ProjectService } from './../../services/RH/project.service';
import { Project } from './../../../models/project';
import { DialogService } from 'primeng/dynamicdialog';
import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-table',
    templateUrl: 'table.component.html',
    providers: [DatePipe, DialogService, MessageService, ConfirmationService],

})
export class TableComponent implements OnInit {
projects!:Project[];
activeprojects!:Project[];
archivedprojects!:Project[];
currentDate=formatDate(new Date(),'yyyy-MM-dd','en_US');
addDialogue:Boolean=false;
editDialogue:Boolean=false;
projectForm!:FormGroup;
offices!:Office[];
selectedOffice!:Office;
departments!:Department[];
selectedDepartment!:Department;
jobs!:Job[];
selectedJob!:Job;
employees!:Employee[];
selectedEmployees!:Employee[];
filtredEmployees!:Employee[];

  constructor(
    private projectService:ProjectService,
    private employeeService:EmployeeService,
     public dialogService:DialogService,
    public messageService:MessageService,
    private fb: FormBuilder,
     public confirmationService:ConfirmationService,
     private officeService:OfficeService,
     private departementService:DepartementService,
     private jobService:JobService,
     private documentService:DocumentService,
     
  ) {}
  ngOnInit(): void {
    
    
    
    this.projectService.getActiveByCompany(Number(localStorage.getItem("companyid"))).subscribe((data)=>{
      this.projects=data
      this.projects.forEach((p)=>{
        this.employeeService.findByProject(p.id).subscribe((res)=>{
          p.employeeList=res;
      
          
          
        })
      })
    })
  }
  openAdd(){
    this.addDialogue=true;
    this.projectForm= this.fb.group({
      name : new FormControl("",Validators.required),
      description : new FormControl("",Validators.required),
      startDate : new FormControl("",Validators.required),
      deadLine : new FormControl("",Validators.required),
      client : new FormControl("",Validators.required),
      idCompany: new FormControl((Number(localStorage.getItem("companyid"))),Validators.required)
    })
    this.employeeService.findActiveByCompany(Number(localStorage.getItem("companyid"))).subscribe((data)=>{
      this.employees=data;
      this.employees.forEach((e)=>{
        this.documentService.getaciveProfileimgByEmployee(e.id).subscribe((dater)=>{
          e.url=dater[0]?.downloadUrl
        });
        this.jobService.getById(e.jobId).subscribe((jb)=>{
          e.department=jb.department?.name 
          e.office=jb.department?.office?.name
          e.job=jb.name
            })
            this.projectService.getActiveByEmployee(e.id).subscribe((da)=>{
              console.log(da.length);
              
              e.projects=da
              
              
            })
      })
      
    })
    this.officeService.getActiveByCompany(Number(localStorage.getItem("companyid"))).subscribe((res)=>{
      this.offices=res;
    })
    if(this.selectedOffice!=null){
    this.departementService.getActiveByOffice(this.selectedOffice.id).subscribe((data)=>{
      this.departments=data
    })
    this.jobService.findByDepartmen(this.selectedDepartment.id).subscribe((ress)=>{
    this.jobs=ress
    })
    this.employeeService.getActiveEmployeesByjob(this.selectedJob.id).subscribe((resss)=>{
      this.filtredEmployees=resss
    })
  }}
 addproject(){
  this.projectService.newProject(this.projectForm.value).subscribe((prj)=>{
    this.selectedEmployees.forEach((empl)=>{
      this.employeeService.setProjectToEmployee(empl.id,prj.id).subscribe((vis)=>{})
    })
  })
 }
  cancelAdd(){
    this.addDialogue=false;
  }
}

