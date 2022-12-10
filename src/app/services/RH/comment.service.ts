import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  accessUrl=environment.gatewayUrl+'/RH-SERVICE/RH/comment';
  postUrl=this.accessUrl+'/newComment'
  getbyPostUrl=this.accessUrl+'/post/'
  showActiveCommentsUrl=this.accessUrl+'/active/post/'
  showArchivedCommentsUrl=this.accessUrl+'/archived/post/'
  getByIdUrl=this.accessUrl+'/'
  updateUrl=this.accessUrl+'/update/'
  archiveUrl=this.accessUrl+'/archive/'
  //{commentId}/{postId}
  addToPostUrl=this.accessUrl+'addtoPost/'
  //{commentId}/{employeeId}
  addToEmployeeUrl=this.accessUrl+'addtoemployee/'
  deleteUrl=this.accessUrl+'delete/'
  constructor(private http:HttpClient) { }
  getall(){
    return this.http.get<Comment[]>(this.accessUrl);

  };
  post(c:Comment){
    return this.http.post<Comment>(this.postUrl,c)
  };
  getbyPost(id:number){
    return this.http.get<Comment[]>(this.getbyPostUrl+id)
  };
  showActiveComments(id:number){
    return this.http.get<Comment[]>(this.showActiveCommentsUrl+id)
  };
  showArchivedComments(id:number){
    return this.http.get<Comment[]>(this.showArchivedCommentsUrl+id)
  };
  getById(id:number){
    return this.http.get<Comment[]>(this.getByIdUrl+id)};
  update(id:number,c:Comment){
    return this.http.put<Comment>(this.updateUrl+id,c)
  };
  archive(id:number){
    return this.http.put(this.archiveUrl+id,null)
  };
  addToPost(commentId:number,postId:number){
    return this.http.put(this.addToPostUrl+commentId+'/'+postId,null)
  };
  addToEmployee(commentId:number,employeeId:number){
    return this.http.put(this.addToEmployeeUrl+commentId+'/'+employeeId,null)
  };
  delete(id:number){
    return this.http.delete(this.deleteUrl+id)
  };
}
