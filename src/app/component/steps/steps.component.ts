import { Company } from './../../../models/company';
import { CompanyService } from './../../services/Buissness/company.service';
import { Employee } from "./../../../models/employee";
import { EmployeeService } from "./../../services/RH/employee.service";
import { Document } from "./../../../models/document";
import { DocumentService } from "./../../services/RH/document.service";
import { AddOfficeComponent } from "./../add-office/add-office.component";
import { JobService } from "./../../services/Buissness/job.service";
import { Job } from "./../../../models/job";
import { Department } from "./../../../models/department";
import { DepartementService } from "./../../services/Buissness/departement.service";
import { Office } from "./../../../models/office";
import { OfficeService } from "./../../services/Buissness/office.service";
import { DatePipe } from "@angular/common";
import { ContractService } from "./../../services/RH/contract.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Contract } from "./../../../models/contract";
import { Clause } from "./../../../models/clause";
import { ClauseService } from "./../../services/RH/clause.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  ConnectedPositioningStrategy,
  IgxDropDownComponent,
  IgxInputGroupComponent,
  DefaultSortingStrategy,
  GridSelectionMode,
  IgxGridComponent,
  ISortingExpression,
  SortingDirection,
  IgxIconService,
  IgxSnackbarComponent,
  IRowSelectionEventArgs,
  ISelectionEventArgs,
} from "igniteui-angular";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { DialogService } from "primeng/dynamicdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { AjouterclosesComponent } from "../../contrat/contrat/closes/ajoutercloses/ajoutercloses.component";

@Component({
  selector: "app-steps",
  templateUrl: "./steps.component.html",
  styleUrls: ["./steps.component.scss"],
  providers: [DatePipe, DialogService, MessageService, ConfirmationService],
})
export class StepsComponent implements OnInit {

  @ViewChild("fileUploadLogo",{static:false}) fileUploadLogo!:ElementRef

  //New
  uploadedFiles: any[] = [];
  uploadedImg!: File;
  //New
  employee: Employee = new Employee();
  contract: Contract = new Contract();
  company!:Company;
  clause!: Clause;
  clauses!: Clause[];
  selectedclauses: Clause[] = [];
  offices!: Office[];
  departments!: Department[];
  jobs!: Job[];
  selctedOffice!: Office;
  selctedDepartement!: Department;
  selctedJob!: Job;
  profilImg!: File;

  type!: String[];
  duration!: String[];
  selectedType!: String;
  //ids List//
  contractId!: number;
  companyId!: number;
  docId!: number;
  officeID!: number;
  depId!: number;
  jobId!: number;

  f_duratin: boolean = true;
  contractForm!: FormGroup;
  employeeForm!: FormGroup;
  employeeForm1!: FormGroup;
  employeeForm0!: FormGroup;
  departementForm!: FormGroup;
  officeForm!: FormGroup;
  jobForm!: FormGroup;
  docForm!: FormGroup;
  officeDialogue!: boolean;
  depatementDialogue!: boolean;
  jobDialogue!: boolean;

  formData!: FormData;
  docid: any = null;
  addDEP: any = null;
  addJob: any = null;
  url!: String;

  constructor(
    private clauseService: ClauseService,
    private router: Router,
    private contractservice: ContractService,
    public datepipe: DatePipe,
    private fb: FormBuilder,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private officeService: OfficeService,
    private depService: DepartementService,
    private jobService: JobService,
    private documentService: DocumentService,
    private employeeService: EmployeeService,
    private companyService : CompanyService,
  ) {}

  ngOnInit(): void {
    this.companyId = +(localStorage.getItem("companyid") || 0);
    this.companyService.get(this.companyId).subscribe((res)=>this.company=res)
    this.clauseService
      .getActiveByCompany( this.companyId)
      .subscribe((data: Clause[]) => (this.clauses = data));
    this.officeService
      .getByCompany(this.companyId)
      .subscribe((resltat: Office[]) => {
        this.offices = resltat;
        console.log(this.offices);
      });
    this.employeeForm0 = this.fb.group({});
    this.employeeForm1 = this.fb.group({
      professionalPhone: new FormControl("", Validators.required),

      professionalMail: new FormControl("", Validators.required),
      folder: new FormControl("", Validators.required),
    });

    this.employeeForm = this.fb.group({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      cin: new FormControl("", Validators.required),
      deleveryDate: new FormControl("", Validators.required),
      adresse: new FormControl("", Validators.required),
      birthDate: new FormControl("", Validators.required),
      childNumber: new FormControl("", Validators.required),
      personalPhone: new FormControl("", Validators.required),
      personalMail: new FormControl("", Validators.required),
      statusF: new FormControl(""),
      jobId: new FormControl(""),
    });

    this.contractForm = this.fb.group({
      startDate: new FormControl("", Validators.required),
      duration: new FormControl("duration", Validators.required),
      grossSalary: new FormControl("", [
        Validators.required,
        Validators.min(0),
        Validators.max(5000),
      ]),
      netSalary: new FormControl("", [
        Validators.required,
        Validators.min(0),
        Validators.max(5000),
      ]),
      contractType: new FormControl("", Validators.required),
    });
    this.departementForm = this.fb.group({
      name: new FormControl("", Validators.required),
    });
    this.officeForm = this.fb.group({
      name: new FormControl("", Validators.required),
      mobile: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      fax: new FormControl(""),
      address: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.email, Validators.required]),
    });
    this.jobForm = this.fb.group({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      companyId: new FormControl(this.companyId, Validators.required),
    });
    this.docForm = this.fb.group({
      id: new FormControl("", Validators.required),
      name: new FormControl("firstImg", Validators.required),
      docType: new FormControl("PROFIL_IMG", Validators.required),
    });
  }

  @ViewChild(IgxDropDownComponent, { static: true })
  public igxDropDown!: IgxDropDownComponent;
  @ViewChild("inputGroup", { read: IgxInputGroupComponent, static: true })
  public inputGroup!: IgxInputGroupComponent;

  @ViewChild(IgxDropDownComponent, { static: true })
  public igxDropDown0!: IgxDropDownComponent;
  @ViewChild("inputGroup", { read: IgxInputGroupComponent, static: true })
  public inputGroup0!: IgxInputGroupComponent;

  @ViewChild(IgxDropDownComponent, { static: true })
  public igxDropDown01!: IgxDropDownComponent;
  @ViewChild("inputGroup", { read: IgxInputGroupComponent, static: true })
  public inputGroup01!: IgxInputGroupComponent;

  @ViewChild(IgxDropDownComponent, { static: true })
  public igxDropDown1!: IgxDropDownComponent;
  @ViewChild("inputGroup", { read: IgxInputGroupComponent, static: true })
  public inputGroup1!: IgxInputGroupComponent;

  @ViewChild(IgxDropDownComponent, { static: false })
  public igxDropDown2!: IgxDropDownComponent;
  @ViewChild("inputGroup2", { read: IgxInputGroupComponent, static: false })
  public inputGroup2!: IgxInputGroupComponent;

  @ViewChild(IgxDropDownComponent, { static: false })
  public igxDropDown3!: IgxDropDownComponent;
  @ViewChild("inputGroup3", { read: IgxInputGroupComponent, static: false })
  public inputGroup3!: IgxInputGroupComponent;

  public items: Array<{ field: string }> = [
    { field: "MARRIED" },
    { field: "SINGLE" },
    { field: "DIVORCED" },
    { field: "WIDOW" },
  ];
  public items0: Array<{ field: string }> = [
    { field: "MARRIED00" },
    { field: "SINGLE00" },
    { field: "DIVORCED00" },
    { field: "WIDOW00" },
  ];
  public items1: Array<{ field: string }> = [
    { field: "MARRIED11" },
    { field: "SINGLE11" },
    { field: "DIVORCED11" },
    { field: "WIDOW11" },
  ];
  public types: Array<{ type: string }> = [
    { type: "CDI" },
    { type: "CDD" },
    { type: "CIVP" },
    { type: "INTERSHIP" },
  ];
  public durations: Array<{ duration: string }> = [
    { duration: "ONE_MONTH" },
    { duration: "TWO_MONTHS" },
    { duration: "THREE_MONTHS" },
    { duration: "SIX_MONTHS" },
    { duration: "ONE_YEAR" },
    { duration: "UNLIMITED" },
    { duration: "OTHER" },
  ];
  public linear = true;
  public modes: any[] = [
    {
      label: "Linear",
      linear: true,
      selected: this.linear === true,
      togglable: true,
    },
  ];

  openNew() {
    this.router.navigate(["contract/ajouterclose"]);
  }
  addContract() {
    if (this.selectedclauses.length == 0) {
      this.messageService.add({
        severity: "warn",
        summary: "Clauses are missed",
        detail: "Select at least one clause",
        life: 2000,
      });
    } else {
      this.confirmationService.confirm({
        message: "Are you sure you want to add the selected contarct?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.contractservice
            .newcontract(this.contractForm.value)
            .subscribe((res: any) => {
              console.log(res);

              this.selectedclauses.forEach((element) => {
                this.clauseService
                  .putaddToContract(element.id, res["id"])
                  .subscribe((data: any) => {});
                this.companyId = res["id"];
              });
              console.log(res);
            });

          this.messageService.add({
            severity: "success",
            summary: "Successful",
            detail: "Contract added with success ",
            life: 3000,
          });
        },
      });
    }
  }
  onChangeContractType(event: any) {
    console.log(event.newSelection.value);
    this.contractForm.value.contractType = event.newSelection.value;
    if (this.contractForm.value.contractType == "CDI") {
      this.f_duratin = true;
      this.contractForm.value.duration = "UNLIMITED";
    }
    if (this.contractForm.value.contractType == "CIVP") {
      this.contractForm.value.duration = "ONE_YEAR";
      this.contractForm.patchValue({
        duration: "ONE_YEAR",
      });
      this.f_duratin = true;
    }
    console.log(this.contractForm.value.contractType);
    
  }
  onChangeDuration(event: any) {
    console.log(event.newSelection.value);
    this.contractForm.value.duration = event.newSelection.value;
  }
  openDialogAddClause() {
    const ref = this.dialogService.open(AjouterclosesComponent, {
      header: "Add new clause",
      width: "70%",
      closable: true,
    });
  }
  public openDropDown() {
    if (this.igxDropDown.collapsed) {
      this.igxDropDown.open({
        target: this.inputGroup.element.nativeElement,
        modal: false,
        positionStrategy: new ConnectedPositioningStrategy(),
      });
      console.log("test");
    }
  }
  public openDropDown01() {
    if (this.igxDropDown.collapsed) {
      this.igxDropDown.open({
        target: this.inputGroup.element.nativeElement,
        modal: false,
        positionStrategy: new ConnectedPositioningStrategy(),
      });
    }
    console.log(this.igxDropDown0.selectedItem.value);
  }
  public openDropDown2() {
    if (this.igxDropDown2.collapsed) {
      this.igxDropDown2.open({
        target: this.inputGroup2.element.nativeElement,
        modal: false,
        positionStrategy: new ConnectedPositioningStrategy(),
      });
    }
  }
  onChangeFamilysituation() {
    this.employeeForm.value.statusF = this.igxDropDown.selectedItem.value;
    console.log(this.employeeForm.value.statusF);
  }
  onSelection(event: any) {
    console.log(event.newSelection.value);
    this.selctedDepartement = new Department();
    this.addDEP = event.newSelection.value;
    this.depService
      .getActiveByOffice(event.newSelection.value)
      .subscribe((dep: Department[]) => {
        this.departments = dep;
      });
    this.officeService
      .getById(event.newSelection.value)
      .subscribe((res: Office) => (this.selctedOffice = res));
  }
  onSelectiondep(event: any) {
    console.log(event.newSelection.value);
    this.addJob = event.newSelection.value;
    this.jobService
      .findByDepartmen(event.newSelection.value)
      .subscribe((resultat: Job[]) => (this.jobs = resultat));
    this.depService
      .getbyId(event.newSelection.value)
      .subscribe((dep: Department) => (this.selctedDepartement = dep));
  }
  onSelectionjob(event: any) {
    console.log(event.newSelection.value);
    this.jobService
      .getById(event.newSelection.value)
      .subscribe((j) => (this.selctedJob = j));
    this.employeeForm.value.jobId = event.newSelection.value;
  }
  openDialogAddOffice() {
    this.officeDialogue = true;
  }
  openDialogAddDepartement() {
    this.depatementDialogue = true;
  }
  openDialogAddJob() {
    this.jobDialogue = true;
  }

  hideDialogAddOffice() {
    this.officeDialogue = false;
  }
  hideDialogAddDepartement() {
    this.depatementDialogue = false;
  }
  hideDialogAddJob() {
    this.jobDialogue = false;
  }
  addOffice() {
    this.confirmationService.confirm({
      message: "Are you sure you want to add office?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.officeService
          .newOffice(this.officeForm.value)
          .subscribe((res: any) => {
            this.selctedOffice = res;
            this.addDEP = res["id"];
            this.officeID = res["id"];
            this.officeService
              .addToCompany(res["id"], this.companyId)
              .subscribe(() => {
                this.officeService
                  .getActiveByCompany(this.companyId)
                  .subscribe((res) => {
                    this.offices = res;
                  });
              });

            this.officeDialogue = false;
          });

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "office added with success ",
          life: 3000,
        });
      },
    });
  }
  addDepartement() {
    this.confirmationService.confirm({
      message: "Are you sure you want to add departement?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.depService
          .post(this.departementForm.value)
          .subscribe((res: any) => {
            this.selctedDepartement = res;
            this.depId = res["id"];
            this.addJob = res["id"];
            this.depService
              .addToOffice(res["id"], this.addDEP)
              .subscribe(() => {
                this.depService
                  .getActiveByOffice(this.addDEP)
                  .subscribe((res) => {
                    this.departments = res;
                  });
              });

            this.depatementDialogue = false;
          });

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "department added with success ",
          life: 3000,
        });
      },
    });
  }
  newJob() {
    console.log(this.jobForm.value);
    this.confirmationService.confirm({
      message: "Are you sure you want to add job?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.jobService.newJob(this.jobForm.value).subscribe((res: any) => {
          this.selctedJob = res;
          console.log(res);
          this.jobId = res["id"];
          this.jobService
            .addToDepartement(res["id"], this.addJob)
            .subscribe(() => {
              this.jobService
                .getActiveByDepartment(this.addJob)
                .subscribe((res) => {
                  this.jobs = res;
                });
            });

          this.jobDialogue = false;
        });

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "job added with success ",
          life: 3000,
        });
      },
    });
  }

  newDoc() {
    this.documentService.addDocuments(this.docForm.value).subscribe((res) => {
      console.log(res);
      this.docid = res["id"];
      console.log(this.docid);
      this.uploadedImg = this.imageToUpload;
      const imageFormData = new FormData();
      imageFormData.append("file", this.uploadedImg, this.uploadedImg.name);

      this.documentService
        .upload(res["id"], imageFormData)
        .subscribe((response) => {
          console.log(response);
          
        });
    });
  }

  // uploadNew(event: any) {
  //   for (let file of event.target.files) {
  //     this.uploadedFiles.push(file);
  //   }
  // }

  imageToUpload!:any
  imageUrl!: any;
  uploadNew(file:FileList){
  this.imageToUpload = file.item(0);
  console.log(this.imageToUpload);
  
  let reader = new FileReader();
  reader.onload=(event:any)=>{
    this.imageUrl = event.target.result;
    console.log(this.imageUrl);
    
  }
  reader.readAsDataURL(this.imageToUpload);
  }
  mapFormsToEmployee() {
    this.employee.firstName = this.employeeForm.value.firstName;
    this.employee.lastName = this.employeeForm.value.lastName;
    this.employee.cin = this.employeeForm.value.cin;
    this.employee.deleveryDate = this.employeeForm.value.deleveryDate;
    this.employee.adresse = this.employeeForm.value.adresse;
    this.employee.birthDate = this.employeeForm.value.birthDate;
    this.employee.childNumber = this.employeeForm.value.childNumber;
    this.employee.personalPhone = this.employeeForm.value.personalPhone;
    this.employee.personalMail = this.employeeForm.value.personalMail;
    this.employee.statusF = this.employeeForm.value.statusF;
    this.employee.jobId = this.employeeForm.value.jobId;
    this.employee.companyId = this.companyId;
    this.employee.role="EMPLOYEE";
    this.employee.professionalMail = this.employeeForm1.value.professionalMail;
    this.employee.professionalPhone =
      this.employeeForm1.value.professionalPhone;
    this.employee.folder = this.employeeForm1.value.folder;
    console.log(this.employee);
    //this.documentService.getDocumentById(this.docId).subscribe((res)=>{this.url=res.downloadUrl})
    this.contract.startDate = this.contractForm.value.startDate;
    this.contract.grossSalary = this.contractForm.value.grossSalary;
    this.contract.netSalary = this.contractForm.value.netSalary;
    this.contract.contractType = this.contractForm.value.contractType;
    this.contract.duration = this.contractForm.value.duration;
    console.log(this.selectedclauses);
    console.log(this.selctedOffice.name);
    console.log(this.selctedDepartement.name);
    console.log(this.selctedJob.name);
    console.log(this.contract)
  }
  addEmployee() {
    this.confirmationService.confirm({
      message: "Are you sure you want to add this Employee?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.employeeService
          .newEmployee(this.employee)
          .subscribe((resEmpl: any) => {
          
           if (resEmpl==null){
            this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "Employee alraedy exist change professional email ",
                life: 3000,
              });
           }
           else{
            if(this.selectedclauses==null){
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "no clauses selected you need to select one or more clauses ",
                life: 3000,
              });

            }
            else{
            this.documentService.addDocuments(this.docForm.value).subscribe((res) => {
              this.uploadedImg = this.imageToUpload;
              const imageFormData = new FormData();
              imageFormData.append("file", this.uploadedImg, this.uploadedImg.name);
              this.documentService.upload(res["id"], imageFormData)
                .subscribe((response) => { this.documentService.addToEmployee(res["id"],resEmpl["id"]).subscribe((data)=>{})});
               
            });
            this.contractservice.newcontract(this.contractForm.value).subscribe((resContract)=>{
              this.contractservice.addToEmployee(resEmpl["id"],resContract["id"]).subscribe((data1)=>{ this.contractservice.addToEmployer(resContract["id"],this.company.idManger).subscribe((data2)=>{});});
             
              this.selectedclauses.forEach((element) => {
                this.clauseService.putaddToContract(element.id, resContract["id"])
                  .subscribe((data3) => {});
                
              })
            })

           }}
          });
      },
    });
  }
  valider() {}
}
// this.messageService.add({
//   severity: "success",
//   summary: "Successful",
//   detail: "Contract added with success ",
//   life: 3000,
// });
