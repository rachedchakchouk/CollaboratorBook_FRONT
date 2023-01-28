import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from '../../../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  //accessUrl=environment.gatewayUrl+'/RH-SERVICE/RH/documents'
  accessUrl='http://localhost:8081/RH/documents'
  findbyIdUrl=this.accessUrl+'/documentbyid/'
  getDocumentsByEmployeeUrl=this.accessUrl+'/byemployee/'
  getaciveProfileimgByEmployeeUrl=this.accessUrl+'/activeproimg/byemployee/'
  getarchivedProfileimgByEmployeeUrl=this.accessUrl+'archivedproimg/byemployee/'
  getActiveDocumentsByEmployeeUrl=this.accessUrl+'/active/byemployee/'
  getArchivedDocumentsByEmployeeUrl=this.accessUrl+'/archived/byemployee/'
  newDocumentUrl=this.accessUrl+'/newDocument'
  addToEmployeeUrl=this.accessUrl+'/addToEmployee/'
  addToPostUrl=this.accessUrl+'/addTPost/'
  updateDocumentUrl=this.accessUrl+'/update/'
  archiveDocumentUrl=this.accessUrl+'/archive/'
  deleteDocumentUrl=this.accessUrl+'/delete/'
  uploadUrl=this.accessUrl+'/uploadDocument/'
  downloadUrl=this.accessUrl+'/download/'
  constructor(private http:HttpClient) { }
  getAllDocuments(){
    return this.http.get<Document[]>(this.accessUrl)
  };
  getDocumentById(id:number){
    return this.http.get<Document>(this.findbyIdUrl+id)
  };
  getDocumentsByEmployee(id:number){
    return this.http.get<Document[]>(this.getDocumentsByEmployeeUrl+id);
  };
  getaciveProfileimgByEmployee(id:number){
    return this.http.get<Document[]>(this.getaciveProfileimgByEmployeeUrl+id);
  };
  getarchivedProfileimgByEmployee(id:number){
    return this.http.get<Document>(this.getarchivedProfileimgByEmployeeUrl+id);
  };
  getActiveDocumentsByEmployee(id:number){
    return this.http.get<Document[]>(this.getActiveDocumentsByEmployeeUrl+id);
  };
  getArchivedDocumentsByEmployee(id:number){
    return this.http.get<Document[]>(this.getArchivedDocumentsByEmployeeUrl+id);
  };
  download(id:number){
    return this.http.get<any>(this.downloadUrl+id);
  };
  addDocuments(d:Document){
    return this.http.post<Document>(this.newDocumentUrl,d);
  };
  addToEmployee(idDocument : number,idEmployee:number)
  {return this.http.put(this.addToEmployeeUrl+idDocument+"/"+idEmployee,null);}
  update(id:number)
  {return this.http.put(this.updateDocumentUrl+id,Document)}
  archive(id:Number)
  {return this.http.put(this.archiveDocumentUrl+id,null)}
  upload(id:number,file:FormData)
  {return this.http.put<Document>(this.uploadUrl+id,file,{reportProgress:true,observe:'events'});}
addToPost(iddoc:number,idPost:number)
{return this.http.put(this.addToPostUrl+iddoc+'/'+idPost,null);}


}
