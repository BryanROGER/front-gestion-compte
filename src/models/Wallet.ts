import {Budget} from "./Budget";
import {DatePicker} from "./date-picker";

export class Wallet{

  id : string = "";
  bugdets : Budget[] = [];
  startDate : DatePicker = new DatePicker();
  endDate : DatePicker = new DatePicker();
  isActive : boolean = false;

}
