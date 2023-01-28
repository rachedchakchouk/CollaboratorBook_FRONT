import { Comment } from './comment';
import { Employee } from './employee';
export class Post{
  id! : number;
  text! : String;
  photo! : String;
  date! : Date;
  archived! : boolean;
  employeeFullName!:String;
  employeeUrl!:String;
  comments!:Comment[];
}
