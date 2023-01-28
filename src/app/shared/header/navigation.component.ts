import { Document } from './../../../models/document';
import { DocumentService } from './../../services/RH/document.service';
import { Router } from '@angular/router';
import { EmployeeService } from "./../../services/RH/employee.service";
import {
  Component,
  AfterViewInit,
  EventEmitter,
  Output,
  OnInit,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { Employee } from "../../../models/employee";

declare var $: any;

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
})
export class NavigationComponent implements OnInit {
  urlprofileimg!:String;
  profilimg!:Document;
  idUpdate!:Number;


  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;
  employe: Employee = new Employee();
  arch:boolean=true;
  constructor(
    private modalService: NgbModal,
    private documentService: DocumentService,
    private employeeService: EmployeeService,
    private route:Router
  ) {}
  ngOnInit() {
    this.employeeService.findArchivedByCompany(Number(localStorage.getItem("companyid"))).subscribe((rsl)=>{if(rsl.length!=0){this.arch=false}else{this.arch=true}})
    this.employeeService
      .getEmployeebyId(Number(localStorage.getItem("idemployee")))
      .subscribe((res) => {
        this.employe = res;
      });
      this.documentService.getaciveProfileimgByEmployee(Number(localStorage.getItem("idemployee"))).subscribe((dat)=>{
        
        
       
        
        this.profilimg =dat[0];
        this.urlprofileimg=this.profilimg.downloadUrl;
        
        
    
        });
  }

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: "btn-danger",
      icon: "ti-link",
      title: "Luanch Admin",
      subject: "Just see the my new admin!",
      time: "9:30 AM",
    },
    {
      btn: "btn-success",
      icon: "ti-calendar",
      title: "Event today",
      subject: "Just a reminder that you have event",
      time: "9:10 AM",
    },
    {
      btn: "btn-info",
      icon: "ti-settings",
      title: "Settings",
      subject: "You can customize this template as you want",
      time: "9:08 AM",
    },
    {
      btn: "btn-warning",
      icon: "ti-user",
      title: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:00 AM",
    },
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: "assets/images/users/user1.jpg",
      status: "online",
      from: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:30 AM",
    },
    {
      useravatar: "assets/images/users/user2.jpg",
      status: "busy",
      from: "Sonu Nigam",
      subject: "I have sung a song! See you at",
      time: "9:10 AM",
    },
    {
      useravatar: "assets/images/users/user2.jpg",
      status: "away",
      from: "Arijit Sinh",
      subject: "I am a singer!",
      time: "9:08 AM",
    },
    {
      useravatar: "assets/images/users/user4.jpg",
      status: "offline",
      from: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:00 AM",
    },
  ];

  public selectedLanguage: any = {
    language: "English",
    code: "en",
    type: "US",
    icon: "us",
  };

  public languages: any[] = [
    {
      language: "English",
      code: "en",
      type: "US",
      icon: "us",
    },
    {
      language: "Español",
      code: "es",
      icon: "es",
    },
    {
      language: "Français",
      code: "fr",
      icon: "fr",
    },
    {
      language: "German",
      code: "de",
      icon: "de",
    },
  ];
  updateEmployee(){
    this.idUpdate=(Number(localStorage.getItem("idemployee")));
    this.route.navigate(["/component/badges"],{state:{data:this.idUpdate}})}
  logout(){
    localStorage.clear()
    this.route.navigate(['/'])
    
  }
}
