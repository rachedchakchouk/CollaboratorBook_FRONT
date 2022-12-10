import { Reclamation } from './../../../models/reclamation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  accessUrl=environment.gatewayUrl+'/RH-SERVICE/RH/Reclamations'
  findbyidUrl=this.accessUrl+'/getbyId/'
  getBySourceUrl=this.accessUrl+'/getbysource/'
  getActiveBySourceUrl=this.accessUrl+'/active/getbysource/'
  getArchivedBySourceUrl=this.accessUrl+'/archived/getbysource/'
  getByDestinationUrl=this.accessUrl+'/getbyDestination/'
  getActiveByDestinationUrl=this.accessUrl+'/active/getbyDestination/'
  getArchivedByDestinationUrl=this.accessUrl+'/archived/getbyDestination/'
  newReclamationUrl=this.accessUrl+'/newReclamation'
  updateReclamationUrl=this.accessUrl+'/update/'
  archiveReclamationUrl=this.accessUrl+'/archive/'
  //{reclamationId}/{senderId}
  reclamationToSenderUrl=this.accessUrl+'/reclamationToSender/'
  //{reclamationId}/{receiverId}
  reclamationToReceiverUrl=this.accessUrl+'/reclamationToReceiver/'
  deleteReclamationUrl=this.accessUrl+'/delete/'
  constructor(private http:HttpClient) { }
  getall(){
    return this.http.get<Reclamation[]>(this.accessUrl)
  };
  findbyid(id:number){
    return this.http.get<Reclamation>(this.findbyidUrl+id)
  };
  getBySource(id:number){
    return this.http.get<Reclamation[]>(this.getBySourceUrl+id)
  };
  getActiveBySource(id:number){
    return this.http.get<Reclamation[]>(this.getActiveBySourceUrl+id)
  };
  getArchivedBySource(id:number){
    return this.http.get<Reclamation[]>(this.getArchivedBySourceUrl+id)
  };
  getByDestination(id:number){
    return this.http.get<Reclamation[]>(this.getByDestinationUrl+id) };
    getActiveByDestination(id:number){
      return this.http.get<Reclamation[]>(this.getActiveByDestinationUrl+id)
    };
    getArchivedByDestination(id:number){
      return this.http.get<Reclamation[]>(this.getArchivedByDestinationUrl+id)
    };
  newReclamation(r:Reclamation){
    return this.http.post<Reclamation>(this.newReclamationUrl,r)
  };
  updateReclamation(id:number,r:Reclamation){
    return this.http.put<Reclamation>(this.updateReclamationUrl+id,r)
  };
  archiveReclamation(id:number){
    return this.http.put(this.archiveReclamationUrl+id,null)
  };
  reclamationToSender(reclamationId:number,senderId:number){
    return this.http.put(this.reclamationToSenderUrl+reclamationId+'/'+senderId,null)
  };
  reclamationToReceiver(reclamationId:number,receiverId:number){
    return this.http.put(this.reclamationToReceiverUrl+reclamationId+'/'+receiverId,null)
  };
  deleteReclamation(id:number){
    return this.http.delete(this.deleteReclamationUrl)
  };
}
