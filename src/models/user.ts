import {Wallet} from "./Wallet";

export class User {
  id : string = "";
  lastname: string="";
  firstname: string="";
  backgroundColor: string="";
  letterColor: string="";
  wallet: Wallet | null = null; // Ou vous pouvez spécifier un type spécifique pour wallet
}
