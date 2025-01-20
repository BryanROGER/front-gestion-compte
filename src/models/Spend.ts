import {User} from "./user";
import {Tag} from "./Tag";

export class Spend{

  id : string = "";
  name: string =""
  amount: number=0;
  date : string="";
  payer : User = new User();
  recipients : User[] = [];
  tag : Tag = new Tag();
  order: number=0;
}
