import { Router } from "@angular/router";
import { ClauseService } from "./../../../../services/RH/clause.service";
import { Clause } from "./../../../../../models/clause";
import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-ajoutercloses",
  templateUrl: "./ajoutercloses.component.html",
  styleUrls: ["./ajoutercloses.component.scss"],
})
export class AjouterclosesComponent implements OnInit {
  clause: Clause = new Clause();
idWriter!:number
  constructor(
    private ClauseService: ClauseService,
    private router: Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    
  ) {}

  ngOnInit(): void {
    this.idWriter=Number(localStorage.getItem('idemployee'))
    console.log(this.idWriter)
  }
  addClause() {
    console.log("new clause", this.clause);
    this.ClauseService.post(this.clause).subscribe((res:any) => {
      this.ref.close();
      this.ClauseService.putaddToWriter(res['id'],this.idWriter).subscribe(res=>{
        console.log(res)
      })

    });
  }
}
