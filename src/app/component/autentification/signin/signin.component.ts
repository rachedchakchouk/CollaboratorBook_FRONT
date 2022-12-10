import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../models/user'
import { UserService } from '../../../services/Security/user.service';
import { Employee } from '../../../../models/employee';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
 employee!: Employee ;
cId!:number;
eId!:number;

  user: User = new User();
  public invalidLogin: boolean = false;
formLogin:FormGroup=new FormGroup({
  username:new FormControl('',Validators.required),
  password:new FormControl('',Validators.required)
})
  constructor(private router: Router, private http: HttpClient,public userService:UserService) { }

  ngOnInit(): void {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    localStorage.setItem("userName","");
    localStorage.setItem('idemployee','');
    localStorage.setItem('companyid','');
    
    
  }


  login(){
    const headers = { 'content-type': 'application/json'}

    const params = new HttpParams()
      .set('username',this.formLogin.value.username )
      .set('password', this.formLogin.value.password);


    this.http.post("http://localhost:8087/api/login",null,{'headers':headers, 'params': params}
    ).subscribe({
      next: (response) => {
        console.log(response)
        //this.notification.showSuccess("User login successful", "Success")
        const token = (<any>response).access_Token;
        const refreshToken = (<any>response).refresh_token;
        const username = (<any>response).username;
        console.log(token)
        console.log(username)
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userName",username);
        this.userService.getEmployee(username).subscribe((res:Employee)=>this.employee=res)
        this.cId=this.employee.companyId;
        localStorage.setItem("companyid",String(this.cId));
        this.eId=this.employee.id;
        localStorage.setItem('idemployee',String(this.eId));


        
        this.invalidLogin = false;
       

        this.router.navigate(["/component/home"]);
      },
      error: (err) => {
        //this.notification.showError("Invalid username or password.", "Error")
        console.error(err)
        this.invalidLogin = true;
      },
      complete: () => console.info('Login complete')
    }
  )}}
