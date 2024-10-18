import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = environment.apiURL

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get(this.apiURL + "api/v1/users");
  }

  getUserHouses(){
    return this.http.get(this.apiURL + "api/v1/users/houses");
  }

  getUserByEmail(email: string){
    return this.http.get(this.apiURL+`api/v1/users/${email}`)
  }



}
