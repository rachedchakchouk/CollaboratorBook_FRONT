import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from './../../../services/RH/employee.service';
import { Document } from './../../../../models/document';
import { DocumentService } from './../../../services/RH/document.service';
import { Employee } from './../../../../models/employee';
import { element } from "protractor";
import { Company } from "./../../../../models/company";
import { CompanyService } from "./../../../services/Buissness/company.service";
import { Router } from "@angular/router";
import { ClauseService } from "./../../../services/RH/clause.service";

import { ContractService } from "./../../../services/RH/contract.service";
import { Contract } from "./../../../../models/contract";
import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MenuItem, MessageService } from "primeng/api";
import { Clause } from "./../../../../models/clause";
import { forEach } from "jszip";

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class ContractComponent implements OnInit {
  f_duratin!: boolean;
  contracts!: Contract[];
  selectedcontracts!: Contract[];
  selectedArchivedcontracts!: Contract[];
  selectedClause!: Clause[];
  clauses!: Clause[];
  clause!: Clause;
  updateDialog!: boolean;
  archiveDialog!: boolean;
  submitted!: boolean;
  contract!: Contract;
  archivedcontracts!: Contract[];
  employee!: Employee;
  employees!:Employee[];
  selectedEmployee!:Employee;
  idEmployer!: number;
  company!: Company;
  loading: boolean = true;
  items!: MenuItem[];
  image!:Document;
  contractmodel!: Contract;
  contractForm!: FormGroup;
  type: String[] = ["CDI", "CDD", "CIVP", "INTERSHIP"];
  duration: String[] = [
    "ONE_MONTH",
    "TWO_MONTHS",
    "THREE_MONTHS",
    "SIX_MONTHS",
    "ONE_YEAR",
    "UNLIMITED",
    "OTHER",
  ];
  constructor(
    private fb: FormBuilder,
    private clauseService: ClauseService,
    private contractService: ContractService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private companyService: CompanyService,
    private docService:DocumentService,
    private employeeService:EmployeeService
  ) {}

  ngOnInit(): void {
    this.companyService
      .get(Number(localStorage.getItem("companyid")))
      .subscribe((res) => {
        this.company = res;
        this.idEmployer = this.company.idManger;
        this.contractService
          .getActivecontractsByEmployer(this.idEmployer)
          .subscribe((res: Contract[]) => {
            this.contracts = res;
            this.contracts.forEach((element) =>
              this.contractService
                .getEmployeeFromContract(element.id)
                .subscribe((emp) => {this.employee=emp
                  element.eId=this.employee.id
                  element.empFullName= this.employee.firstName+" "+this.employee.lastName
                  this.docService.getaciveProfileimgByEmployee(this.employee.id).subscribe((data22)=>{
                    this.image=data22[0];
                    element.empURl=this.image.downloadUrl;
                  })

                })
                
            );
          });
        this.loading = false;
      });
    this.clauseService
      .getActiveByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((data) => {
        this.clauses = data;
      });
      this.employeeService.findActiveByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((data)=>{
        this.employees=data;
        this.employees.forEach((e)=>{
          this.docService.getaciveProfileimgByEmployee(e.id).subscribe((photos)=>{
e.url=photos[0].downloadUrl
          })
        })
      })
  }
  archive(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected contarct?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.contractService.archiveContract(id).subscribe((res) => {
          console.log(res);
          this.contractService
            .getActivecontractsByEmployer(this.idEmployer)
            .subscribe((res: Contract[]) => (this.contracts = res));
            window.location.reload();
        });

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "contract Deleted",
          life: 3000,
        });
      },
    });
  }
  openArchive() {
    this.archiveDialog = true;
    this.contractService
      .getArchivedcontractsByEmployer(this.idEmployer)
      .subscribe((res) => {
        this.archivedcontracts = res;
      });
  }
  hideArchive() {
    this.archiveDialog = false;
  }
  hideDialog() {
    this.updateDialog = false;
    this.submitted = false;
  }
  openDialog(id: number) {
    this.contractForm = this.fb.group({
      startDate: new FormControl("", Validators.required),
      duration: new FormControl("", Validators.required),
      grossSalary: new FormControl("", [
        Validators.required,
        Validators.min(0),
        Validators.max(5000),
      ]),
      netSalary: new FormControl("", [
        Validators.required,
        Validators.min(0),
        Validators.max(5000),
      ]),
      contractType: new FormControl("", Validators.required),
    });
    this.clauseService.getActiveByCompany(Number(localStorage.getItem("companyid"))).subscribe((res)=>{this.clauses=res})
    this.contractService.getById(id).subscribe((res) => {
      this.contract = res;
      this.clauseService.getByContract(this.contract.id).subscribe((data) => {
        this.selectedClause = data;
        console.log(data);
      });
    });
    this.updateDialog = true;
    this.submitted = false;
  }
  openNew() {
    this.router.navigate(["contract/ajoutercontract"]);
  }
  deleteSelectedcContract() {
    console.log(this.selectedcontracts);
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected contarct?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.selectedcontracts.forEach((contract: Contract) => {
          this.contractService.archiveContract(contract.id).subscribe((res) => {
            console.log(res);
            this.contractService
              .getActivecontractsByEmployer(this.idEmployer)
              .subscribe((res: Contract[]) => (this.contracts = res));
              window.location.reload();
          });
        });

        this.messageService.add({
          severity: "info",
          summary: "Successful",
          detail: "contracts Deleted",
          life: 3000,
        });
      },
    });
  }
  activateSelectedcContract() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected contarct?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.selectedArchivedcontracts.forEach((contract: Contract) => {
          this.contractService
            .noarchiveContract(contract.id)
            .subscribe((res) => {
              console.log(res);
              this.contractService
                .getActivecontractsByEmployer(this.idEmployer)
                .subscribe((res: Contract[]) => (this.contracts = res));
            });
        });

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "contract activated",
          life: 3000,
        });
      },
    });
  }
  onChangeContractType(event: any) {
    console.log(event.value);
    this.contractForm.value.contractType = event.value;
    if (this.contractForm.value.contractType == "CDI") {
      this.contractForm.value.duration = "UNLIMITED";
      this.contractForm.patchValue({
        duration: "UNLIMITED",
      });
      this.f_duratin = true;
    }
    if (this.contractForm.value.contractType == "CIVP") {
      this.contractForm.value.duration = "ONE_YEAR";
      this.contractForm.patchValue({
        duration: "ONE_YEAR",
      });
      this.f_duratin = true;
    }
    // else this.f_duratin = false;
  }
  onChangeDuration(event: any) {
    console.log(event.value);
    this.contractForm.value.duration = event.value;
  }
  onChangeEmployee(event: any) {
    console.log(event.value);
    this.selectedEmployee = event.value;
  }
  updateContract(id:number){
    console.log(this.selectedcontracts);
    this.confirmationService.confirm({
      message: "Are you sure you want to update the selected contarct?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
   this.contractService.updateContract(id,this.contractForm.value).subscribe((data)=>{
    this.selectedClause.forEach((c)=>(this.clauseService.putaddToContract(c.id,id).subscribe((res)=>{})));
    this.contractService.addToEmployee(this.selectedEmployee.id,id).subscribe((datta)=>{});
    this.companyService.get(Number(localStorage.getItem("companyid"))).subscribe((res)=>{
      this.contractService.addToEmployer(id,res.idManger).subscribe((data)=>{});
    });
    this.contractService.noarchiveContract(id).subscribe((r)=>{});
   
    this.updateDialog=false;
    window.location.reload();
   })

        this.messageService.add({
          severity: "info",
          summary: "Successful",
          detail: "contracts updated",
          life: 3000,
        });
      },
    });
  }
}
