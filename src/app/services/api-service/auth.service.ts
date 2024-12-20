import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import { HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = "JWT_TOKEN";
  private loggedUser?: string
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private apiURL = environment.apiURL
  private http = inject(HttpClient)

  constructor() { }

  login(user:{
    email: string,
    password: string,
  }): Observable<any> {
    return this.http.post(this.apiURL+"api/v1/auth/login",user).pipe(
      tap((response:any)=> {
        console.log("in login")
        console.log(response)
        this.doLoginUser(user.email, response.accessToken)
      })
    )
  }


  private doLoginUser(email: string, token: any){
    this.loggedUser = email
    this.storeJwtToken(token)
    this.isAuthenticatedSubject.next(true)
  }

  private storeJwtToken(jwt: any) {
    localStorage.setItem(this.JWT_TOKEN, jwt)
    console.log("in set item")
  }

  getDecodedToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  // Récupérer le 'sub' du token
  getSubjectFromToken(token: string): string | null {
    const decodedToken = this.getDecodedToken(token);
    return decodedToken ? decodedToken.sub : null;
  }

  logout(){
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
  }
}
