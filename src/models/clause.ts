import { Employee } from './employee';
export class Clause{
    id! : number;
    title! : String;
    description! : String;
    creationDate!: Date;
    archived! : boolean;
    writer!:Employee;
    
  }