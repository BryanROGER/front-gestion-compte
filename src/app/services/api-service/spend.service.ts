import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Spend} from "../../../models/Spend";

@Injectable({
  providedIn: 'root'
})
export class SpendService {

  apiURL = environment.apiURL

  constructor(private http: HttpClient) { }

  saveSpend(spend: Spend){
    const body = JSON.stringify(spend)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.apiURL+"spend/add",body, { headers: headers })
  }

  deleteSpend(id: string){
    return this.http.delete(this.apiURL+`spend/delete/${id}`)
  }

  getSpendInMonth(month: string, year: string){
    const body = { month: `${month}`, year:`${year}` }; // Créez un objet JSON avec les paramètres
    return this.http.post(this.apiURL+"spend/all-in-a-month", body); // Faites l'appel POST avec le corps JSON
  }
}
