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
    return this.http.get(this.apiURL + "user/all");
  }

  GetUserById(id: string | null){
    return this.http.get(this.apiURL+`user/${id}`)
  }



}
