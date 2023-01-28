import { Employee } from './employee';
export class Project{
  id! : number;
  name! :String;
  description! : String;
  startDate! : Date;
  deadLine! : Date;
  finalDate! : Date;
  client!: String ;
  idCompany!:number;
  archived!: boolean ;
  employeeList! : Employee[];

}
