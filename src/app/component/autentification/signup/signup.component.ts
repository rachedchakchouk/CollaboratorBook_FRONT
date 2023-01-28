import { Company } from './../../../../models/company';
import { CompanyService } from './../../../services/Buissness/company.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  company! :Company;
  constructor( private  companyService: CompanyService,
    private router: Router) { }

  ngOnInit(): void {this.company= new Company();
  }
  register(){
    this.companyService.post(this.company).subscribe(()=>this.router.navigate(['']));
  }
  }


