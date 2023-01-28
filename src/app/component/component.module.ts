import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HammerModule } from "@angular/platform-browser";
import { IgxCalendarModule } from "igniteui-angular";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ComponentsRoutes } from "./component.routing";
import { NgbdpaginationBasicComponent } from "./pagination/pagination.component";
import { NgbdAlertBasicComponent } from "./alert/alert.component";
import { NgbdDropdownBasicComponent } from "./dropdown-collapse/dropdown-collapse.component";
import { NgbdnavBasicComponent } from "./nav/nav.component";
import { ButtonsComponent } from "./buttons/buttons.component";
import { CardsComponent } from "./card/card.component";
import { TableComponent } from "./table/table.component";
import { HomeComponent } from "./home/home.component";
import { BadgeComponent } from "./badge/badge.component";
import { TableModule } from "primeng/table";
import { SelectButtonModule } from "primeng/selectbutton";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { FileUploadModule } from "primeng/fileupload";
import { DialogModule } from "primeng/dialog";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { CalendarModule } from "primeng/calendar";
import { StepsModule } from "primeng/steps";
import { DropdownModule } from "primeng/dropdown";
import { CheckboxModule } from "primeng/checkbox";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputNumberModule } from "primeng/inputnumber";
import { CardModule } from "primeng/card";
import { DividerModule } from "primeng/divider";
import { AccordionModule } from "primeng/accordion";
import { InputTextModule } from "primeng/inputtext";
import { StepsComponent } from "./steps/steps.component";
import {
  IgxDatePickerModule,
  IgxStepperModule,
  IgxButtonGroupModule,
  IgxRadioModule,
  IgxDropDownModule,
  IgxToggleModule,
  IgxAvatarModule,
  IgxBadgeModule,
  IgxButtonModule,
  IgxSnackbarModule,
  IgxGridModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxSwitchModule,
} from "igniteui-angular";
import { AddOfficeComponent } from './add-office/add-office.component';
import { OfficesComponent } from './offices/offices.component';
import { DepartementComponent } from './departement/departement.component';
import { JobComponent } from './job/job.component';
import { CompanyComponent } from './company/company.component';
import {TabViewModule} from 'primeng/tabview';
import { DocumentComponent } from './document/document.component';
import {DataViewModule} from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import {BadgeModule} from 'primeng/badge';
import {DockModule} from 'primeng/dock';
import {GalleriaModule} from 'primeng/galleria';
import {ImageModule} from 'primeng/image';
import {TimelineModule} from 'primeng/timeline';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
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
    InputTextModule,
    IgxStepperModule,
    IgxIconModule,
    IgxButtonGroupModule,
    IgxInputGroupModule,
    IgxRadioModule,
    IgxDatePickerModule,
    HammerModule,
    IgxCalendarModule,
    IgxDropDownModule,
    IgxToggleModule,
    IgxAvatarModule,
    IgxBadgeModule,
    IgxButtonModule,
    IgxSnackbarModule,
    IgxGridModule,
    IgxSwitchModule,
    DataViewModule,
    TagModule,
    TabViewModule,
    BadgeModule,
    DockModule,
    GalleriaModule,
    ImageModule,
    TimelineModule
  ],
  declarations: [
    NgbdpaginationBasicComponent,
    NgbdAlertBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    ButtonsComponent,
    CardsComponent,
    TableComponent,
    HomeComponent,
    BadgeComponent,
    StepsComponent,
    AddOfficeComponent,
    OfficesComponent,
    DepartementComponent,
    JobComponent,
    CompanyComponent,
    
    DocumentComponent,
  ],
})
export class ComponentsModule {}
