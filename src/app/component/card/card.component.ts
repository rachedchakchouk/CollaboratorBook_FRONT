import { ButtonsComponent } from './../buttons/buttons.component';
import { Employee } from './../../../models/employee';

import { Router } from '@angular/router';
import { ContractService } from './../../services/RH/contract.service';
import { JobService } from './../../services/Buissness/job.service';
import { DepartementService } from './../../services/Buissness/departement.service';
import { DocumentService } from './../../services/RH/document.service';
import { EmployeeService } from './../../services/RH/employee.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  providers: [DialogService],

})
export class CardsComponent implements OnInit{
employee!:Employee;
birthdate:Date=new Date();
@Input() id!:number;

  constructor(
    public dialogService: DialogService,
    private employeeService: EmployeeService,
    private documentService: DocumentService,
    private departementService: DepartementService,
    private jobService: JobService,
    private contractService: ContractService,
    private route:Router
  ) {}
  ngOnInit(){
    if(history.state.data!=null){
    this.employeeService.getEmployeebyId(history.state.data).subscribe((res)=>{
      this.employee=res;
      if(this.employee.birthDate==null){
        this.birthdate=new Date();
      }
      else{this.birthdate=this.employee.birthDate;
      console.log(this.birthdate);
      }
      this.documentService.getaciveProfileimgByEmployee(this.employee.id).subscribe(
        (data)=>{

          if (data[0] == null) {
            this.employee.url = "../assets/images/users/user.jpg";
          } else {
            this.employee.url = data[0].downloadUrl;
          }
        })
        }
      
      )
  
    }
    else {
      this.route.navigate(["/component/employees"] )  }
  }
  cancel(){
    this.route.navigate(["/component/employees"] )
  }
}
