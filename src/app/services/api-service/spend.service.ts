import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Spend} from "../../../models/Spend";
import {HouseholdService} from "./household.service";

@Injectable({
  providedIn: 'root'
})
export class SpendService {

  apiURL = environment.apiURL

  constructor(private http: HttpClient, private householdService: HouseholdService) { }

  saveSpend(spend: Spend, id : string){
    const body = JSON.stringify(spend)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.apiURL+`api/v1/spends/${id}`,body, { headers: headers })
  }

  createSpend(spend: Spend){
    const body = JSON.stringify(spend)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiURL+`api/v1/spends`,body, { headers: headers })
  }

  deleteSpend(id: string){
    return this.http.delete(this.apiURL+`api/v1/spends/${id}`)
  }

  getSpendInMonth(month: string, year: string){
    let household
      this.householdService.getHousehold().subscribe(house => {
        household = house
      })
    const body = { month: `${month}`, year:`${year}`, householdID: `${household!.id}` };
    return this.http.post(this.apiURL+"api/v1/spends/all-in-a-month", body);
  }
}
