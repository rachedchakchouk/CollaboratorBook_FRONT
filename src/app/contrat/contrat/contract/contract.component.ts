import { Router } from "@angular/router";
import { ClauseService } from "./../../../services/RH/clause.service";

import { ContractService } from "./../../../services/RH/contract.service";
import { Contract } from "./../../../../models/contract";
import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MenuItem, MessageService } from "primeng/api";
import { Clause } from "./../../../../models/clause";

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class ContractComponent implements OnInit {
  contracts!: Contract[];
  selectedcontracts!: Contract[];
  productDialog!: boolean;
  submitted!: boolean;
  contract!: Contract;
  //employee: Employee;

  clauses!: Clause[];
  loading: boolean = true;
  items!: MenuItem[];
  contractmodel!: Contract;
  constructor(
    private clauseService: ClauseService,
    private contractService: ContractService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contractService
      .getall()
      .subscribe((res: Contract[]) => (this.contracts = res));
    this.loading = false;
  }
  archive(id: number) {
    this.contractService.archiveContract(id).subscribe((res) => {
      console.log(res);
      this.contractService.getall().subscribe((res) => {
        this.contracts = res;
      });
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  openNew() {
    this.router.navigate(["contract/ajoutercontract"]);
  }
  deleteSelectedcContract() {
    console.log(this.selectedcontracts);
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected contarct?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.selectedcontracts.forEach((contract: Contract) => {
          this.contractService.deleteContract(contract.id).subscribe((res) => {
            console.log(res);
            this.contractService
              .getall()
              .subscribe((res: Contract[]) => (this.contracts = res));
          });
        });

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Products Deleted",
          life: 3000,
        });
      },
    });
  }
}
