import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Spend} from "../../../models/Spend";
import {HouseholdService} from "./household.service";
import {switchMap} from "rxjs";
import {ResponseApi} from "../../../models/response-api";

@Injectable({
  providedIn: 'root'
})
export class SpendService {

  apiURL = environment.apiURL

  http = inject(HttpClient)
  householdService = inject(HouseholdService);

  // private spends = signal<Spend[]>([]);
  //
  // getSpends() {
  //   return this.spends.asReadonly()();
  // }
  //
  // updateSpends(month : string, year : string){
  //   this.getSpendsByMonth(month, year)
  // }


  saveSpend(spend: Spend, id: string) {
    const body = JSON.stringify(spend)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.apiURL + `api/v1/spends/${id}`, body, {headers: headers})
  }

  createSpend(spend: Spend) {
    const body = JSON.stringify(spend)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiURL + `api/v1/spends`, body, {headers: headers})
  }

  deleteSpend(id: string) {
    return this.http.delete(this.apiURL + `api/v1/spends/${id}`)
  }

  getSpendsByMonth(month: string, year: string) {
    let household
    this.householdService.getHousehold().subscribe(house => {
      household = house
    })
    const body = {month: `${month}`, year: `${year}`, householdID: `${household!.id}`};

    return this.http.post<ResponseApi>(this.apiURL + "api/v1/spends/all-in-a-month", body);
  }


}


