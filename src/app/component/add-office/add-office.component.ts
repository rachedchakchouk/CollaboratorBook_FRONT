import { StepsComponent } from './../steps/steps.component';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { OfficeService } from "./../../services/Buissness/office.service";
import { Office } from "./../../../models/office";
import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { waitForAsync } from '@angular/core/testing';

@Component({
    selector: "app-add-office",
    templateUrl: "./add-office.component.html",
    styleUrls: ["./add-office.component.scss"],
    providers: [DialogService, DynamicDialogRef],
    standalone: false
})
export class AddOfficeComponent implements OnInit {
  office!: Office;
  officeForm!: UntypedFormGroup;
  cid!: number;
  constructor(
    private fb: UntypedFormBuilder,
    private officeService: OfficeService,
    public ref: DynamicDialogRef,
    
    public dialogService:DialogService
  ) {}

  ngOnInit(): void {
    this.cid = Number(localStorage.getItem("companyid"));
    this.officeForm = this.fb.group({
      name: new UntypedFormControl("", Validators.required),
      mobile: new UntypedFormControl("", Validators.required),
      phone: new UntypedFormControl("", Validators.required),
      fax: new UntypedFormControl(""),
      address: new UntypedFormControl("", Validators.required),
      email: new UntypedFormControl("", [Validators.email, Validators.required]),
    });
  }
  async addOffice() {
      this.officeService
      .newOffice(this.officeForm.value)
      .subscribe((res: any) => {
       this.officeService
          .addToCompany(res["id"], this.cid)
          .subscribe((data: any) => {});
       this.ref.close();
       
      });

  }
}
