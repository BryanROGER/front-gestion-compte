import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  apiURL = environment.apiURL

  constructor(private http: HttpClient) { }

  getAllTags(){
    return this.http.get(this.apiURL + "tag/all");
  }


}
