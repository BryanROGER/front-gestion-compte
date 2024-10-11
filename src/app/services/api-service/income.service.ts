import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Income} from "../../../models/Income";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  apiURL = environment.apiURL


  saveIncome(income: Income){
    const body = JSON.stringify(income)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.apiURL+"api/v1/incomes/add",body, { headers: headers })
  }


  deleteSpend(id: string){
    return this.http.delete(this.apiURL+`api/v1/incomes/delete/${id}`)
  }

  getIncomeInMonth(month: string, year: string) {
    const body = { month: `${month}`, year:`${year}` };
    return this.http.post(this.apiURL+"api/v1/incomes/all-in-a-month", body);
  }
}
