import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratRoutingModule } from './contrat-routing.module';
import { AjouterContratComponent } from './ajouter-contrat/ajouter-contrat.component';
import { ClosesComponent } from './closes/closes.component';
import { AjouterclosesComponent } from './closes/ajoutercloses/ajoutercloses.component';
import { ContractComponent } from './contract/contract.component';

import {TableModule} from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CalendarModule} from 'primeng/calendar';
import {StepsModule} from 'primeng/steps';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {InputSwitchModule} from 'primeng/inputswitch';
@NgModule({
  declarations: [
    AjouterContratComponent,
    ClosesComponent,
    AjouterclosesComponent,
    ContractComponent
  ],
  imports: [
    CommonModule,
    ContratRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    SelectButtonModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    DynamicDialogModule,
    CalendarModule,
    ConfirmDialogModule,
    StepsModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    InputNumberModule,
    CardModule,
    DividerModule,
    AccordionModule,
    InputSwitchModule
  ]
  
})
export class ContratModule { }
