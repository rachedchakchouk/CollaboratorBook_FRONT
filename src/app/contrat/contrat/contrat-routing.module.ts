import { ContractComponent } from './contract/contract.component';
import { AjouterclosesComponent } from './closes/ajoutercloses/ajoutercloses.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClosesComponent } from './closes/closes.component';
import { AjouterContratComponent } from './ajouter-contrat/ajouter-contrat.component';

const routes: Routes = [
  {path:"",
component: ContractComponent
  },
  {
    path: 'ajoutercontract',
    component: AjouterContratComponent
  },
  {
    path: 'ajouterclose',
    component: AjouterclosesComponent
  },
  {
    path: 'closes',
    component: ClosesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratRoutingModule { }
