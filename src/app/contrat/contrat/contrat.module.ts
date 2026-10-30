import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DatePickerModule } from "primeng/datepicker";
import {StepsModule} from 'primeng/steps';
import { SelectModule } from "primeng/select";
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import { ToggleSwitchModule } from "primeng/toggleswitch";
@NgModule({ declarations: [
        AjouterContratComponent,
        ClosesComponent,
        AjouterclosesComponent,
        ContractComponent
    ], imports: [CommonModule,
        ContratRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        SelectButtonModule,
        ButtonModule,
        ToastModule,
        ToolbarModule,
        FileUploadModule,
        DialogModule,
        DatePickerModule,
        ConfirmDialogModule,
        StepsModule,
        SelectModule,
        CheckboxModule,
        RadioButtonModule,
        InputNumberModule,
        CardModule,
        DividerModule,
        AccordionModule,
        ToggleSwitchModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class ContratModule { }
