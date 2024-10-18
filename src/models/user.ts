import {Wallet} from "./Wallet";
import {Household} from "./household";

export class User {
  email : string = "";
  lastname: string="";
  firstname: string="";
  backgroundColor: string="";
  letterColor: string="";
  wallet: Wallet | null = null; // Ou vous pouvez spécifier un type spécifique pour wallet
  households: Household[] = [];
}
