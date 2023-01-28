import { Office } from "./../../../models/office";
import { OfficeService } from "./../../services/Buissness/office.service";
import { DepartementService } from "./../../services/Buissness/departement.service";
import { Department } from "./../../../models/department";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-departement",
  templateUrl: "./departement.component.html",
  styleUrls: ["./departement.component.scss"],
})
export class DepartementComponent implements OnInit {
  department!: Department;
  departments!: Department[];
  selectedDepartments!: Department[];
  offices!: Office[];

  constructor(
    public departementService: DepartementService,
    public officeService: OfficeService
  ) {}

  ngOnInit(): void {
    this.officeService
      .getActiveByCompany(Number(localStorage.getItem("companyid")))
      .subscribe((res) => {
        this.offices = res;
        this.offices.forEach(element => {
          this.departementService.getActiveByOffice(element.id).subscribe((data)=>{(this.departments=data)});
          
        });
      });
  }
}
