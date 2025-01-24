import {User} from "./user";
import {Tag} from "./Tag";
import {Household} from "./household";

export class Spend{

  id : string = "";
  name: string =""
  amount: number=0;
  date : string="";
  payer : User = new User();
  recipients : User[] = [];
  tag : Tag = new Tag();
  order: number=0;
  household : Household = new Household();
}
