import { Router } from '@angular/router';
import { ClauseService } from './../../../services/RH/clause.service';
import { Clause } from './../../../../models/clause';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-closes',
  templateUrl: './closes.component.html',
  styleUrls: ['./closes.component.scss']
})
export class ClosesComponent implements OnInit {
clauses!:Clause[];
clause!:Clause;
constructor(
  private clauseService : ClauseService,
  private router : Router
) { }

  ngOnInit(): void {
    this.clauseService.getall().subscribe((data:Clause[])=>this.clauses = data)
  }
archive(id:number)
{this.clauseService.putarchived(id).subscribe(res=>{
  
  console.log(res)
  this.clauseService.getall().subscribe(res=>{
   this.clauses= res
  })
})}
noarchive(id:number)
{this.clauseService.putnoarchived(id).subscribe(res=>{
  
  console.log(res)
  this.clauseService.getall().subscribe(res=>{
   this.clauses= res
  })
})}
}
