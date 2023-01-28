import { Employee } from "./../../../../models/employee";
import { EmployeeService } from "./../../../services/RH/employee.service";
import { Company } from "./../../../../models/company";
import { CompanyService } from "./../../../services/Buissness/company.service";
import { AjouterclosesComponent } from "./../closes/ajoutercloses/ajoutercloses.component";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ContractService } from "./../../../services/RH/contract.service";
import { Contract } from "./../../../../models/contract";
import { Router } from "@angular/router";

import { Component, OnInit } from "@angular/core";
import { ClauseService } from "./../../../services/RH/clause.service";
import { Clause } from "./../../../../models/clause";
import { DatePipe } from "@angular/common";
import { DialogService } from "primeng/dynamicdialog";
import { MessageService, ConfirmationService } from "primeng/api";

@Component({
  selector: "app-ajouter-contrat",
  templateUrl: "./ajouter-contrat.component.html",
  styleUrls: ["./ajouter-contrat.component.scss"],
  providers: [DatePipe, DialogService, MessageService, ConfirmationService],
})
export class AjouterContratComponent implements OnInit {
  contract!: Contract;
  clauses!: Clause[];
  clause!: Clause;
  type!: String[];
  duration!: String[];
  selectedclauses: Clause[] = [];
  //startDate!:Date;
  contractForm!: FormGroup;
  company!: Company;
  idEmployer!: number;
  employees!: Employee[];
  gs!: number;
  f_duratin: boolean = false;

  constructor(
    private clauseService: ClauseService,
    private router: Router,
    private contractservice: ContractService,
    public datepipe: DatePipe,
    private fb: FormBuilder,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private companyService: CompanyService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
   
    this.clauseService
      .getActiveByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((data: Clause[]) => {
        this.clauses = data;
      });

    this.type = ["CDI", "CDD", "CIVP", "INTERSHIP"];
    this.duration = [
      "ONE_MONTH",
      "TWO_MONTHS",
      "THREE_MONTHS",
      "SIX_MONTHS",
      "ONE_YEAR",
      "UNLIMITED",
      "OTHER",
    ];
    this.contractForm = this.fb.group({
      startDate: new FormControl("", Validators.required),
      duration: new FormControl("UNLIMITED", Validators.required),
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
      contractType: new FormControl("CDI", Validators.required),
    });
  }
  openNew() {
    this.router.navigate(["contract/ajouterclose"]);
  }

  addContract() {
    if (this.selectedclauses.length == 0) {
      this.messageService.add({
        severity: "warn",
        summary: "Clauses are missed",
        detail: "Select at least one clause",
        life: 2000,
      });
    } else {
      this.confirmationService.confirm({
        message: "Are you sure you want to add the selected contarct?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.contractservice
            .newcontract(this.contractForm.value)
            .subscribe((res: any) => {
              console.log(res);
              this.contractservice
                .addToEmployer(res["id"], this.idEmployer)
                .subscribe((data) => {
                  console.log(data);
                });

              this.selectedclauses.forEach((element) => {
                this.clauseService
                  .putaddToContract(element.id, res["id"])
                  .subscribe((data: any) => {});
              });
              console.log(res);
            });

          this.messageService.add({
            severity: "success",
            summary: "Successful",
            detail: "Contract added with success ",
            life: 3000,
          });
        },
      });
    }
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
  openDialogAddClause() {
    const ref = this.dialogService.open(AjouterclosesComponent, {
      header: "Add new clause",
      width: "70%",
      closable: true,
    });
  }
  onSelectEmployee() {}
  cancel(){
    this.router.navigate(["contract"]);
  }
}
