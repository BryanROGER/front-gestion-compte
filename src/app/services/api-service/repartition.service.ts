import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Household} from "../../../models/household";

@Injectable({
  providedIn: 'root'
})
export class RepartitionService {

  http = inject(HttpClient)

  apiURL = environment.apiURL

  getRepartitions(household : Household){
    const body = JSON.stringify(household)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiURL+`api/v1/repartitions/all`,body, { headers: headers })
  }
}
