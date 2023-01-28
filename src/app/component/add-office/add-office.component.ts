import { StepsComponent } from './../steps/steps.component';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { OfficeService } from "./../../services/Buissness/office.service";
import { Office } from "./../../../models/office";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: "app-add-office",
  templateUrl: "./add-office.component.html",
  styleUrls: ["./add-office.component.scss"],
  providers: [DialogService,DynamicDialogRef]
})
export class AddOfficeComponent implements OnInit {
  office!: Office;
  officeForm!: FormGroup;
  cid!: number;
  constructor(
    private fb: FormBuilder,
    private officeService: OfficeService,
    public ref: DynamicDialogRef,
    
    public dialogService:DialogService
  ) {}

  ngOnInit(): void {
    this.cid = Number(localStorage.getItem("companyid"));
    this.officeForm = this.fb.group({
      name: new FormControl("", Validators.required),
      mobile: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      fax: new FormControl(""),
      address: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.email, Validators.required]),
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
