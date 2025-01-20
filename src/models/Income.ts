import {User} from "./user";
import {Tag} from "./Tag";

export class Income{

  id : string = "";
  amount : number = 0;
  user : User  = new User();
  tag : Tag = new Tag();
  date : string = ""
  order: number=0;

}
