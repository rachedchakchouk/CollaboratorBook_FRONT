import { Employee } from './../../../models/employee';
import { Post } from './../../../models/post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  //accessUrl=environment.gatewayUrl+'/RH-SERVICE/RH/post'
  accessUrl='http://localhost:8081/RH/post'
  showByCompanyPostUrl=this.accessUrl+'/'
  showActivePostUrl=this.accessUrl+'/active/'
  showArchivedPostUrl=this.accessUrl+'/archived/'
  showPostByEmployeeUrl=this.accessUrl+'/e/'
  showActivePostByEmployeeUrl=this.accessUrl+'/active/e/'
  showArchivedPostByEmployeeUrl=this.accessUrl+'/archived/e/'
  addPostUrl=this.accessUrl+'/newpost'
  //{idPost}/{idEmployee}
  addToEmployeeUrl=this.accessUrl+'/addToEmployee/'
  updatePostUrl=this.accessUrl+'/update/'
  archivePostUrl=this.accessUrl+'/archivepost/'
  removePostUrl=this.accessUrl+'/deletepost/'
  getEmployeeUrl=this.accessUrl+'/employeebypost/'
  constructor(private http:HttpClient) { }
  showByCompanyPost(id:number){
    return this.http.get<Post[]>(this.showByCompanyPostUrl+id)
  };
  showActivePost(id:number){
    return this.http.get<Post[]>(this.showActivePostUrl+id)
  };
  showArchivedPost(id:number){
    return this.http.get<Post[]>(this.showArchivedPostUrl+id)
  };
  showPostByEmployee(id:number){
    return this.http.get<Post[]>(this.showPostByEmployeeUrl+id)
  };
  showActivePostByEmployee(id:number){
    return this.http.get<Post[]>(this.showActivePostByEmployeeUrl+id)
  };
  showArchivedPostByEmployee(id:number){
    return this.http.get<Post[]>(this.showArchivedPostByEmployeeUrl+id)
  };
  addPost(p:Post){
    return this.http.post<Post>(this.addPostUrl,p)
  };
  addToEmployee(idPost:number,idEmployee:number){
    return this.http.put(this.addToEmployeeUrl+idPost+'/'+idEmployee,null)
  };
  updatePost(id:number,p:Post){
    return this.http.put<Post>(this.updatePostUrl+id,p)
  };
  archivePost(id:number){
    return this.http.delete(this.archivePostUrl+id)
  };
  removePost(id:number){
    return this.http.delete(this.removePostUrl+id)
  };
  getEmployee(id:number){
    return this.http.get<Employee>(this.getEmployeeUrl+id)
  }
}
