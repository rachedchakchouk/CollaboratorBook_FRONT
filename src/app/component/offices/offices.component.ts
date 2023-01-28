import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Department } from "./../../../models/department";
import { element } from "protractor";
import { DepartementService } from "./../../services/Buissness/departement.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { AddOfficeComponent } from "./../add-office/add-office.component";
import { DialogService } from "primeng/dynamicdialog";
import { Office } from "./../../../models/office";
import { OfficeService } from "./../../services/Buissness/office.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-offices",
  templateUrl: "./offices.component.html",
  styleUrls: ["./offices.component.scss"],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class OfficesComponent implements OnInit {
  offices!: Office[];
  office!: Office;
  selectedoffices!: Office[];
  departments!: Department[];
  depSize!: number;
  detailDialogue!:boolean;
  submitted!: boolean;
  officeForm!:FormGroup;

  constructor(
    private departmentService: DepartementService,
    private fb: FormBuilder,
    private officeService: OfficeService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.officeService
      .getActiveByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((res) => {
        this.offices = res;
       this.detailDialogue=false
        
      });
      this.officeForm = this.fb.group({
        name: new FormControl("", Validators.required),
        mobile: new FormControl("", Validators.required),
        phone: new FormControl("", Validators.required),
        fax: new FormControl(""),
        address: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.email, Validators.required]),
      });
  }
Departmentsize(id:number){
  this.departmentService
  .getActiveByOffice(id)
  .subscribe((data) => {
    this.departments = data;
    console.log(this.departments);
    console.log(this.departments.length);
    this.depSize = this.departments.length;
  });
}
OfficeDetail(id:number){
  this.detailDialogue=true;
  this.officeService.getById(id).subscribe((res)=>{(this.office=res)})
}
  deleteSelectedcoffices() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected offices?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.selectedoffices.forEach((contract: Office) => {
          this.officeService.archive(contract.id).subscribe((res) => {
            console.log(res);
            this.officeService
              .getByCompany(Number(localStorage.getItem("companyid")))
              .subscribe((res: Office[]) => (this.offices = res));
          });
        });

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "offices Deleted",
          life: 3000,
        });
      },
    });
  }
  openDialogAddOffice() {
    const ref = this.dialogService.open(AddOfficeComponent, {
      header: "Add new Office",
      width: "70%",
      closable: true,
    });
  }
}
