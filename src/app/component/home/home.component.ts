import { Comment } from "./../../../models/comment";
import { CommentService } from "./../../services/RH/comment.service";
import { Employee } from "./../../../models/employee";
import { element } from "protractor";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Post } from "./../../../models/post";
import { Document } from "./../../../models/document";
import { DocumentService } from "./../../services/RH/document.service";
import { PostService } from "./../../services/RH/post.service";
import { EmployeeService } from "./../../services/RH/employee.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class HomeComponent implements OnInit {
  uploadedImg!: File;
  postForm!: FormGroup;
  commentForm!: FormGroup;
  docForm!: FormGroup;
  urlprofileimg!: String;
  profilimg!: Document;
  posts!: Post[];
  writer!: Employee;
  imgswirter!: Document[];
  imgwirter!: Document;
  user!: Employee;
  comments!: Comment[];
  docDialog!: Boolean;
  idDoc!: number;
//  dockBasicItems = [
//     {
//         label: 'Finder',
//         icon: "assets/showcase/images/dock/finder.svg"
//     },
//     {
//         label: 'App Store',
//         icon: "assets/showcase/images/dock/appstore.svg"
//     },
//     {
//         label: 'Photos',
//         icon: "assets/showcase/images/dock/photos.svg"
//     },
//     {
//         label: 'Trash',
//         icon: "assets/showcase/images/dock/trash.png"
//     }
// ];
  constructor(
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private employeeService: EmployeeService,
    private postService: PostService,
    private documentService: DocumentService,
    private fb: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.docDialog = false;

    this.employeeService
      .getEmployeebyId(Number(localStorage.getItem("idemployee")))
      .subscribe((dater) => {
        console.log(dater);
        this.user = dater;
      });
    this.documentService
      .getaciveProfileimgByEmployee(Number(localStorage.getItem("idemployee")))
      .subscribe((dat) => {
        this.profilimg = dat[0];
        this.urlprofileimg = this.profilimg?.downloadUrl;
      });
    this.postService
      .showActivePost(Number(localStorage.getItem("companyid")))
      .subscribe((data) => {
        this.posts = data;
        console.log(data);
        this.posts.forEach((element) => {
          this.commentService.showActiveComments(element.id).subscribe((cmt) => {
            element.comments = cmt;
            element.comments.forEach((cmnt) =>
              this.commentService.getWriter(cmnt.id).subscribe((des) => {
                cmnt.writer = des.firstName + " " + des.lastName;
                this.documentService
                  .getaciveProfileimgByEmployee(des.id)
                  .subscribe(
                    (data255) => (cmnt.writerUrl = data255[0]?.downloadUrl)
                  );
              })
            );
          });
          this.postService.getEmployee(element.id).subscribe((data) => {
            this.writer = data;
            this.documentService
              .getaciveProfileimgByEmployee(this.writer.id)
              .subscribe((img) => {
                element.employeeUrl = img[0]?.downloadUrl;
              });
            element.employeeFullName =
              this.writer.firstName + " " + this.writer.lastName;
          });
        });
      });
    this.postForm = this.fb.group({
      text: new FormControl("", Validators.required),
      photo: new FormControl("", Validators.required),
    });
    this.commentForm = this.fb.group({
      text: new FormControl("", Validators.required),
    });
    this.docForm = this.fb.group({
      id: new FormControl("", Validators.required),
      docType: new FormControl("POST_IMG", Validators.required),
    });
  }
  addnewPost() {
    this.confirmationService.confirm({
      message: "Are you sure you want to add this post?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.postService.addPost(this.postForm.value).subscribe((res: any) => {
          console.log(res);
          this.postService
            .addToEmployee(
              res["id"],
              Number(localStorage.getItem("idemployee"))
            )
            .subscribe((data) => {
              window.location.reload();
            });
        });

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "post added with success ",
          life: 3000,
        });
      },
    });
  }
  addnewComment(id: number) {
    this.commentService.post(this.commentForm.value).subscribe((res: any) => {
      console.log(res);
      this.commentService
        .addToEmployee(res["id"], Number(localStorage.getItem("idemployee")))
        .subscribe((data) => {
          this.commentService.addToPost(res["id"], id).subscribe((fd) => {
            window.location.reload();
          });
        });
    });
  }
  addDocument() {
    this.docDialog = true;
  }
  imageToUpload!: any;
  imageUrl!: any;
  uploadNew(file: FileList) {
    this.imageToUpload = file.item(0);

    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      //console.log(this.imageUrl);
    };
    reader.readAsDataURL(this.imageToUpload);
  }
  addpostwithimg() {
    this.documentService.addDocuments(this.docForm.value).subscribe((res) => {
      this.uploadedImg = this.imageToUpload;
      const imageFormData = new FormData();
      imageFormData.append("file", this.uploadedImg, this.uploadedImg.name);
      this.documentService
        .upload(res["id"], imageFormData)
        .subscribe((response) => {
          this.idDoc = res["id"];          
          console.log(this.idDoc);
         
        });
        this.documentService
        .addToEmployee(res["id"],Number(localStorage.getItem("idemployee")))
        .subscribe((data) => {
          this.postForm.value.photo="http://localhost:8081/RH/documents/download/"+res["id"];
          console.log(this.postForm.value.photo);
          this.postService.addPost(this.postForm.value).subscribe((src)=>{console.log(src);
            this.postService.addToEmployee(src["id"],Number(localStorage.getItem("idemployee"))).subscribe((des)=>{
              this.docDialog=false;
              window.location.reload();
            })
          })
          

        });
    });
  }
  archive(id:number){
    this.postService.archivePost(id).subscribe((data)=>{
      this.postService.showActivePost(Number(localStorage.getItem("companyid"))).subscribe((res)=>{
        console.log(res);
        window.location.reload()
      })
    });
  }
  archiveComment(id:number){
    this.commentService.archive(id).subscribe((res)=>{
      window.location.reload();
    })
  }
}
