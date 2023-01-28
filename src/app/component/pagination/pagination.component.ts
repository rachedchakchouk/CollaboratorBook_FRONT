import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { EmployeeService } from "./../../services/RH/employee.service";
import { LeaveService } from "./../../services/RH/leave.service";
import { Holday } from "./../../../models/holday";
import { Component, OnInit } from "@angular/core";
import { REFUSED } from "dns";

@Component({
  selector: "app-ngbd-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./paginator.scss"],
  providers: [MessageService, ConfirmationService],
})
export class NgbdpaginationBasicComponent implements OnInit {
  newLeaveDialg!: Boolean;
  leave!: Holday;
  leaves: Holday[] = [];
  selectedLeaves: Holday[] = [];
  submitted!: Boolean;
  leaveForm!: FormGroup;
  duration!: String[];
  constructor(
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.employeeService
      .findActiveByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((emps) =>
        emps.forEach((e) => {
          this.leaveService.getActiveByEmployee(e.id).subscribe((ls) => {
            this.leaves.concat(ls);
          });
        })
      );
  }
  openNew() {
    this.submitted = false;
    this.newLeaveDialg = true;
    this.duration = ["HALF_DAY", "ONE_DAY", "TWO_DAYS", "THREE_DAYS"];
    this.leaveForm = this.fb.group({
      startDate: new FormControl("", Validators.required),
      typeLeave: new FormControl("", Validators.required),
    });
  }
  onChangeLeaveDurattion(event: any) {
    this.leaveForm.value.typeLeave = event.value;
  }
  addLeave() {
    this.confirmationService.confirm({
      message: "Are you sure to sent this request?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.leaveService
          .newHolday(
            this.leaveForm.value,
            Number(localStorage.getItem("idemployee"))
          )
          .subscribe((res) => {
         if(res!=null&& res.status!="REFUSED"){
            this.messageService.add({
                severity: "success",
                summary: "Successful",
                detail: "Request sented",
                life: 3000,
              });
         }
else{ this.messageService.add({
    severity: "danger",
    summary: "Error",
    detail: "Error request bloqued",
    life: 3000,
  });}

          });
        
      },
    });
  }
  hideDialog(){
    this.newLeaveDialg = false;
  }
}
