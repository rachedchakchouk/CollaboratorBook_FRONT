import { CommentService } from './../../../services/RH/comment.service';
import { ClauseService } from './../../../services/RH/clause.service';
import { JobService } from './../../../services/Buissness/job.service';
import { DepartementService } from './../../../services/Buissness/departement.service';
import { OfficeService } from './../../../services/Buissness/office.service';
import { CompanyService } from './../../../services/Buissness/company.service';
import { Component, OnInit } from '@angular/core';
import {topcard,topcards} from './top-cards-data';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards:topcard[];

  constructor(
    private companyService:CompanyService,
    private officeService:OfficeService,
    private departmentService:DepartementService,
    private jobService:JobService,
    private clauseService:ClauseService,
    private commentService:CommentService


  ) { 

    this.topcards=topcards;
  }

  ngOnInit(): void {

  }

}
