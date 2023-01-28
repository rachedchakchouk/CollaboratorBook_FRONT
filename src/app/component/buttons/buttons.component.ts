import { CardsComponent } from './../card/card.component';
import { Router } from '@angular/router';
import { ContractService } from "./../../services/RH/contract.service";
import { Contract } from "./../../../models/contract";
import { OfficeService } from "./../../services/Buissness/office.service";
import { JobService } from "./../../services/Buissness/job.service";
import { Office } from "./../../../models/office";
import { Job } from "./../../../models/job";
import { DepartementService } from "./../../services/Buissness/departement.service";
import { Department } from "./../../../models/department";
import { DialogService } from "primeng/dynamicdialog";
import { salesChartOptions } from "./../../dashboard/dashboard-components/sales-ratio/sales-ratio.component";
import { Document } from "./../../../models/document";
import { DocumentService } from "./../../services/RH/document.service";
import { element } from "protractor";
import { Employee } from "./../../../models/employee";
import { EmployeeService } from "./../../services/RH/employee.service";
import { Component, OnInit } from "@angular/core";
import { timeStamp } from 'console';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-buttons',
  templateUrl: "buttons.component.html",
  styleUrls: ["./buttons.scss"],
  providers: [DialogService,CardsComponent],
})
export class ButtonsComponent implements OnInit {
  url!: String;
  employees!: Employee[];
  aEmployees!:Employee[];
   public employee!: Employee;
  phot!: Document;
  detailDialogue: boolean = false;
  dep!: Department;
  job!: Job;
  office!: Office;
  contract!: Contract;
  archivedContract!:Contract[] ;
  archviedListe: boolean =false;
  idUpdate:number=0;
  deletefList:boolean=true;
 
  constructor(
    public dialogService: DialogService,
    private employeeService: EmployeeService,
    private documentService: DocumentService,
    private departementService: DepartementService,
    private jobService: JobService,
    private contractService: ContractService,
    private route:Router,
    private cardsComponent : CardsComponent,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.employeeService.findArchivedByCompany(Number(localStorage.getItem("companyid"))).subscribe((data)=>{
      if(data.length==0){
        this.deletefList=true;
      }
      else{
        this.deletefList=false;
      }
    })
      
   
    
    this.employeeService
      .findActiveByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((res) => {
        this.employees = res;

        this.employees.forEach((element) =>{
       
          this.documentService
            .getaciveProfileimgByEmployee(element.id)
            .subscribe((res) => {
              if (res[0] == null) {
                element.url = "../assets/images/users/user.jpg";
              } else {
                element.url = res[0].downloadUrl;
              }
            })
          });
      });
  }
  getDetail(id: number) {
    
    this.detailDialogue = true;
    this.employeeService.getEmployeebyId(id).subscribe((data) => {
      this.employee = data;
     
      
      

      this.jobService.getById(this.employee.jobId).subscribe((data1) => {
        this.job = data1;
        this.jobService.getDep(this.job.id).subscribe((data2) => {
          this.dep = data2;
          this.departementService.getOffice(this.dep.id).subscribe((data3) => {
            this.office = data3;
          });
        });
      });
      this.documentService
        .getaciveProfileimgByEmployee(this.employee.id)
        .subscribe((res) => {
          if (res[0] == null) {
            this.employee.url = "../assets/images/users/user.jpg";
          } else {
            this.employee.url = res[0].downloadUrl;
          }
        });
        this.contractService.getActivecontractsByEmployee(this.employee.id).subscribe((contracts)=>{
          this.contract=contracts[0];
        })
        this.contractService.getArchivedcontractsByEmployee(this.employee.id).subscribe((aContracts)=>{
          this.archivedContract=aContracts;
        })
    });
  }
  Delete(id:number){
    this.employeeService.archiveEmployee(id).subscribe((res)=>{
      this.employeeService
      .findActiveByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((res) => {
        this.employees = res;

        this.employees.forEach((element) =>
          this.documentService
            .getaciveProfileimgByEmployee(element.id)
            .subscribe((res) => {
              if (res[0] == null) {
                element.url = "../assets/images/users/user.jpg";
              } else {
                element.url = res[0].downloadUrl;
              }
            })
        );
      });
    });
    this.detailDialogue=false;
    
    window.location.reload();

    
  }
  deletedListe(){
    this.archviedListe= true
    this.employeeService
      .findArchivedByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((res) => {
        this.aEmployees
         = res;

        this.aEmployees.forEach((element) =>
          this.documentService
            .getaciveProfileimgByEmployee(element.id)
            .subscribe((res) => {
              if (res[0] == null) {
                element.url = "../assets/images/users/user.jpg";
              } else {
                element.url = res[0].downloadUrl;
              }
            })
        );
      });

  }
  reactivate(id:number){
    this.employeeService.reactivateEmployee(id).subscribe((res)=>{
      this.employeeService
      .findArchivedByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((res) => {
        this.aEmployees
         = res;
         if (this.aEmployees.length==0){
         this.archviedListe=false;
         this.deletefList=true;
         }
         else{
        this.aEmployees.forEach((element) =>
          this.documentService
            .getaciveProfileimgByEmployee(element.id)
            .subscribe((res) => {
              if (res[0] == null) {
                element.url = "../assets/images/users/user.jpg";
              } else {
                element.url = res[0].downloadUrl;
              }
            })
        );}
      });
      this.employeeService
      .findActiveByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((res) => {
        this.employees = res;

        this.employees.forEach((element) =>
          this.documentService
            .getaciveProfileimgByEmployee(element.id)
            .subscribe((res) => {
              if (res[0] == null) {
                element.url = "../assets/images/users/user.jpg";
              } else {
                element.url = res[0].downloadUrl;
              }
            })
        );
      });
     
   
    })
  }
  updateEmployee(id:number){
    this.idUpdate=id
  this.route.navigate(["/component/badges"],{state:{data:this.idUpdate}})
   
    
  }

}
