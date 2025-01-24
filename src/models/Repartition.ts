import {User} from "./user";


export class Repartition{

  id : string = "";
  startDate :string = "";
  endDate :string = "";
  active :boolean = false;
  user1 :User = new User();
  user2 :User = new User();
  partUser1: number = -1;
  partUser2: number = -1;

}
