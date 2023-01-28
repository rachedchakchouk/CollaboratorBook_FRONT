import { Project } from './../../../models/project';
import { ProjectService } from './../../services/RH/project.service';
import { Company } from './../../../models/company';
import { CompanyService } from './../../services/Buissness/company.service';
import { ClauseService } from './../../services/RH/clause.service';
import { Contract } from './../../../models/contract';
import { Document } from './../../../models/document';
import { Post } from './../../../models/post';
import { CommentService } from './../../services/RH/comment.service';
import { PostService } from './../../services/RH/post.service';
import { DocumentService } from './../../services/RH/document.service';
import { EmployeeService } from './../../services/RH/employee.service';
import { Employee } from "./../../../models/employee";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { DatePipe, Location } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { Clause } from "../../../models/clause";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ContractService } from "../../services/RH/contract.service";
import { Galleria } from 'primeng/galleria';
@Component({
  selector: "app-contract",

  templateUrl: "badge.component.html",
  styleUrls: ["./badge.scss"],
  providers: [DatePipe, DialogService, MessageService, ConfirmationService],
})
export class BadgeComponent implements OnInit {
  employee!: Employee;
  statusF!: String[];
  //startDate!:Date;
  employeePersonalForm!: FormGroup;
  gs!: number;
  iduser:number=(Number(localStorage.getItem("idemployee")));
  posts!: Post[] ;
  allDocs!:Document[];
  allphoto!:Document[];
  allporphoto!:Document[];
  contract!:Contract;
  clauses!:Clause[];
  company!:Company;
  manager!:Employee;
projects!:Project[];
employeeId:number=history.state.data;

  showThumbnails!: boolean;

  fullscreen: boolean = false;

  activeIndex: number = 0;

  onFullScreenListener!: any;

  @ViewChild('galleria') galleria!: Galleria;
  constructor(
    private employeService:EmployeeService,
    private router: Router,
    private contractservice: ContractService,
    private clauseService: ClauseService,
    private docService:DocumentService,
    public datepipe: DatePipe,
    private companyService:CompanyService,
    private fb: FormBuilder,
    public dialogService: DialogService,
    private projectService:ProjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private postService:PostService,
    private commentService:CommentService,
    private cd: ChangeDetectorRef,
    private route:Router,
    private location: Location
  ) {}
  ngOnInit() {
    if(history.state.data!=null){

    this.companyService.get(Number(localStorage.getItem("companyid"))).subscribe((com)=>{this.company=com
    this.employeService.getEmployeebyId(this.company?.idManger).subscribe((m)=>{
      this.manager=m
    })
    })
    this.employeService.getEmployeebyId(this.employeeId).subscribe((res)=>{
      this.employee=res;
      this.docService.getaciveProfileimgByEmployee(this.employee.id).subscribe((data)=>{
        this.employee.url=data[0].downloadUrl;
      })
      this.docService.getActiveDocumentsByEmployee(this.employee.id).subscribe((d)=>{
        this.allDocs=d;
      })
      this.contractservice.getActivecontractsByEmployee(this.employee.id).subscribe((c)=>{
        this.contract=c[c.length-1];
        console.log(this.contract);
       
      })
    })
    this.postService.showActivePostByEmployee(this.employeeId).subscribe((pst)=>{
    this.posts=pst;
    this.posts.forEach((e)=>{
      this.commentService.getbyPost(e.id).subscribe((cmt)=>{
        e.comments=cmt;
        e.employeeUrl=this.employee?.url;
        cmt.forEach((c)=>this.commentService.getWriter(c.id).subscribe((w)=>{
          c.writer=w.firstName+" "+w.lastName;
          this.docService.getaciveProfileimgByEmployee(w.id).subscribe((dl)=>{
            c.writerUrl=dl[0].downloadUrl
          })
        }))
      })
    }) 
    })
    this.projectService.getActiveByEmployee(this.employeeId).subscribe((p)=>{
      this.projects=p
      console.log(p);
      
    })

  }
   else{this.route.navigate(["/component/employees"] )  }
}


close(){
  
  this.location.back();
}

  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
}



openPreviewFullScreen() {
    let elem = this.galleria.element.nativeElement.querySelector('.p-galleria');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem['mozRequestFullScreen']) {
        /* Firefox */
        elem['mozRequestFullScreen']();
    } else if (elem['webkitRequestFullscreen']) {
        /* Chrome, Safari & Opera */
        elem['webkitRequestFullscreen']();
    } else if (elem['msRequestFullscreen']) {
        /* IE/Edge */
        elem['msRequestFullscreen']();
    }
}

onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
    this.cd.detectChanges();
    this.cd.reattach();
}


responsiveOptions: any[] = [
  {
      breakpoint: '1024px',
      numVisible: 5
  },
  {
      breakpoint: '768px',
      numVisible: 3
  },
  {
      breakpoint: '560px',
      numVisible: 1
  }
];

bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener('fullscreenchange', this.onFullScreenListener);
    document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
    document.addEventListener('webkitfullscreenchange', this.onFullScreenListener);
    document.addEventListener('msfullscreenchange', this.onFullScreenListener);
}

unbindDocumentListeners() {
    document.removeEventListener('fullscreenchange', this.onFullScreenListener);
    document.removeEventListener('mozfullscreenchange', this.onFullScreenListener);
    document.removeEventListener('webkitfullscreenchange', this.onFullScreenListener);
    document.removeEventListener('msfullscreenchange', this.onFullScreenListener);
    this.onFullScreenListener = null;
}

ngOnDestroy() {
    this.unbindDocumentListeners();
}

galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
}

fullScreenIcon() {
    return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}`;
}
}
