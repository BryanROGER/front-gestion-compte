import {inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Income} from "../../../models/Income";
import {HouseholdService} from "./household.service";
import {ResponseApi} from "../../../models/response-api";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  http = inject(HttpClient)
  householdService = inject(HouseholdService)

  apiURL = environment.apiURL


  saveIncome(income: Income, id :string){
    const body = JSON.stringify(income)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.apiURL+`api/v1/incomes/${id}`,body, { headers: headers })
  }

  createIncome(income: Income){
    const body = JSON.stringify(income)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiURL+`api/v1/incomes`,body, { headers: headers })
  }


  deleteSpend(id: string){
    return this.http.delete(this.apiURL+`api/v1/incomes/${id}`)
  }

  getIncomesByMonth(month: string, year: string) {
    let household
    this.householdService.getHousehold().subscribe(house => {
      household = house
    })
    const body = {month: `${month}`, year: `${year}`, householdID: `${household!.id}`};

    return this.http.post<ResponseApi>(this.apiURL+"api/v1/incomes/all-in-a-month", body)
  }
}
