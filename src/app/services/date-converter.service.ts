import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateConverterService {

  constructor() { }

  getMonthInString(monthInNumber: number): string {
    switch (monthInNumber) {
      case 1:
        return "Janvier";
      case 2:
        return "Février";
      case 3:
        return "Mars";
      case 4:
        return "Avril";
      case 5:
        return "Mai";
      case 6:
        return "Juin";
      case 7:
        return "Juillet";
      case 8:
        return "Août";
      case 9:
        return "Septembre";
      case 10:
        return "Octobre";
      case 11:
        return "Novembre";
      case 12:
        return "Décembre";
      default:
        return "Mois invalide";
    }
  }


  getDateForSave(month: string, year: string){
    let numericMonth: string;

    switch (month.toLowerCase()) {
      case "janvier":
        numericMonth = "01";
        break;
      case "février":
        numericMonth = "02";
        break;
      case "mars":
        numericMonth = "03";
        break;
      case "avril":
        numericMonth = "04";
        break;
      case "mai":
        numericMonth = "05";
        break;
      case "juin":
        numericMonth = "06";
        break;
      case "juillet":
        numericMonth = "07";
        break;
      case "août":
        numericMonth = "08";
        break;
      case "septembre":
        numericMonth = "09";
        break;
      case "octobre":
        numericMonth = "10";
        break;
      case "novembre":
        numericMonth = "11";
        break;
      case "décembre":
        numericMonth = "12";
        break;
      default:
        throw new Error("Mois invalide : " + month);
    }

    return `${numericMonth}-${year}`;
  }
}
