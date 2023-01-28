import { Department } from './department';
export class Job{
  id! : number;
  name! : String;
  companyId! : number;
  description! : String;
  archived! : boolean;
  department!:Department;
}
