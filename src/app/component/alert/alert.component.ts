import { forEach } from 'jszip';
import { CommentService } from './../../services/RH/comment.service';
import { PostService } from './../../services/RH/post.service';
import { ProjectService } from './../../services/RH/project.service';
import { Project } from './../../../models/project';
import { CardsComponent } from "./../card/card.component";
import { Router } from "@angular/router";
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
import { timeStamp } from "console";
import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-ngbd-alert",
  templateUrl: "alert.component.html",
  styleUrls: ["./alert.scss"],
  providers: [DialogService, CardsComponent],
})
export class NgbdAlertBasicComponent implements OnInit {
  url!: String;
  employees!: Employee[];
  aEmployees!: Employee[];
  public employee!: Employee;
  phot!: Document;
  detailDialogue: boolean = false;
  dep!: Department;
  job!: Job;
  office!: Office;
  contract!: Contract;
  archivedContract!: Contract[];
  archviedListe: boolean = false;
  idUpdate: number = 0;
  deletefList: boolean = true;
  employeesByjob!: Employee[];
  employeesByDepartement: Employee[] = [];
  employeesByOffice: Employee[] = [];
  emps!: Employee[];
  jobtitle!:String;
  depTitle!:String;
  officeTitle!:String;
  projectsListe!:Project[];

  constructor(
    public dialogService: DialogService,
    private employeeService: EmployeeService,
    private documentService: DocumentService,
    private departementService: DepartementService,
    private jobService: JobService,
    private contractService: ContractService,
    private projectService:ProjectService,
    private route: Router,
    private cardsComponent: CardsComponent,
    private postService:PostService,
    private primengConfig: PrimeNGConfig,
    private commentService:CommentService
  ) {}

  ngOnInit() {
    this.emps = [];
    
    this.employeeService
      .getEmployeebyId(Number(localStorage.getItem("idemployee")))
      .subscribe((emp) => {
        this.projectService.getActiveByEmployee(emp.id).subscribe((prj)=>{
          this.projectsListe=prj
          
          this.projectsListe.forEach((p)=>{
            this.employeeService.findActiveByProject(p.id).subscribe((le)=>{

              p.employeeList=le
              p.employeeList.forEach((element) => {
                this
                this.documentService
                  .getaciveProfileimgByEmployee(element.id)
                  .subscribe((res) => {
                    if (res[0] == null) {
                      element.url = "../assets/images/users/user.jpg";
                    } else {
                      element.url = res[0].downloadUrl;
                    }
                  });
              });
            })
          })
        })
        this.employeeService
          .getActiveEmployeesByjob(emp.jobId)
          .subscribe((resul) => {
            this.employeesByjob = resul;
            this.employeesByjob.forEach((e)=>{
              this.postService.showActivePostByEmployee(e.id).subscribe((p)=>{
                e.posts=p
             e.posts.forEach((p)=>{
              this.commentService.getbyPost(p.id).subscribe((c)=>{
                p.comments=c
                p.comments.forEach((cnt)=>{
                  this.commentService.getWriter(cnt.id).subscribe((w)=>{
                    cnt.writer=w.firstName+" "+w.lastName
                    this.documentService.getaciveProfileimgByEmployee(w.id).subscribe((pt)=>{
                      cnt.writerUrl=pt[0].downloadUrl
                    })
                  }
                  )
                })
              })
              
             })
              })
            });
            this.employeesByjob.forEach((element) => {
              this.documentService
                .getaciveProfileimgByEmployee(element.id)
                .subscribe((res) => {
                  if (res[0] == null) {
                    element.url = "../assets/images/users/user.jpg";
                  } else {
                    element.url = res[0].downloadUrl;
                  }
                });
            });
          });
        this.jobService.getById(emp.jobId).subscribe((res) => {
          this.jobtitle=res.name
          this.depTitle=res.department.name
          this.officeTitle=res.department.office.name
          this.jobService
            .getActiveByDepartment(res.department.id)
            .subscribe((data) => {
              data.forEach((element) => {
                this.emps = [];

                this.employeeService
                  .getActiveEmployeesByjob(element.id)
                  .subscribe((acs) => {
                    this.emps = acs;

                    this.employeesByDepartement =
                      this.employeesByDepartement.concat(this.emps);
                      this.employeesByDepartement.forEach((e)=>{
                        this.postService.showActivePostByEmployee(e.id).subscribe((p)=>{
                          e.posts=p
                       e.posts.forEach((p)=>{
                        this.commentService.getbyPost(p.id).subscribe((c)=>{
                          p.comments=c
                          p.comments.forEach((cnt)=>{
                            this.commentService.getWriter(cnt.id).subscribe((w)=>{
                              cnt.writer=w.firstName+" "+w.lastName
                              this.documentService.getaciveProfileimgByEmployee(w.id).subscribe((pt)=>{
                                cnt.writerUrl=pt[0].downloadUrl
                              })
                            }
                            )
                          })
                        })
                        
                       })
                        })
                      });

                    this.employeesByDepartement.forEach((element) => {
                      this.documentService
                        .getaciveProfileimgByEmployee(element.id)
                        .subscribe((res) => {
                          if (res[0] == null) {
                            element.url = "../assets/images/users/user.jpg";
                          } else {
                            element.url = res[0].downloadUrl;
                          }
                        });
                    });
                  });
              });
            });
          this.departementService
            .getActiveByOffice(res.department.office.id)
            .subscribe((des) => {
              des.forEach((ele) => {
                this.jobService
                  .getActiveByDepartment(ele.id)
                  .subscribe((bes) => {
                    this.emps = [];
                    bes.forEach((jb) => {
                      this.employeeService
                        .getActiveEmployeesByjob(jb.id)
                        .subscribe((ent) => {
                          this.emps = ent;
                          this.employeesByOffice =
                            this.employeesByOffice.concat(this.emps);
                          this.employeesByOffice.forEach((element) => {
                            this.documentService
                              .getaciveProfileimgByEmployee(element.id)
                              .subscribe((res) => {
                                if (res[0] == null) {
                                  element.url =
                                    "../assets/images/users/user.jpg";
                                } else {
                                  element.url = res[0].downloadUrl;
                                }
                              });
                          });
                        });
                    });
                  });
              });
            });
        });
      });
    this.employeeService
      .findArchivedByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((data) => {
        if (data.length == 0) {
          this.deletefList = true;
        } else {
          this.deletefList = false;
        }
      });

    this.employeeService
      .findActiveByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((res) => {
        this.employees = res;
        this.employees.forEach((e)=>{
          this.postService.showActivePostByEmployee(e.id).subscribe((p)=>{
            e.posts=p
            console.log(e.firstName+"=> "+e.posts.length);
            
         e.posts.forEach((p)=>{
          this.commentService.getbyPost(p.id).subscribe((c)=>{
            p.comments=c
            p.comments.forEach((cnt)=>{
              this.commentService.getWriter(cnt.id).subscribe((w)=>{
                cnt.writer=w.firstName+" "+w.lastName
                this.documentService.getaciveProfileimgByEmployee(w.id).subscribe((pt)=>{
                  cnt.writerUrl=pt[0].downloadUrl
                })
              }
              )
            })
          })
          
         })
          })
        });
        this.employees.forEach((element) => {
          this.documentService
            .getaciveProfileimgByEmployee(element.id)
            .subscribe((res) => {
              if (res[0] == null) {
                element.url = "../assets/images/users/user.jpg";
              } else {
                element.url = res[0].downloadUrl;
              }
            });
        });
      });
      
      
      this.employeesByOffice.forEach((e)=>{
        this.postService.showActivePostByEmployee(e.id).subscribe((p)=>{
          e.posts=p
       e.posts.forEach((p)=>{
        this.commentService.getbyPost(p.id).subscribe((c)=>{
          p.comments=c
          p.comments.forEach((cnt)=>{
            this.commentService.getWriter(cnt.id).subscribe((w)=>{
              cnt.writer=w.firstName+" "+w.lastName
              this.documentService.getaciveProfileimgByEmployee(w.id).subscribe((pt)=>{
                cnt.writerUrl=pt[0].downloadUrl
              })
            }
            )
          })
        })
        
       })
        })
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
      this.contractService
        .getActivecontractsByEmployee(this.employee.id)
        .subscribe((contracts) => {
          this.contract = contracts[0];
        });
      this.contractService
        .getArchivedcontractsByEmployee(this.employee.id)
        .subscribe((aContracts) => {
          this.archivedContract = aContracts;
        });
    });
  }
 

}
