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
        this.doLoginUser(user.email, response.token)
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

  isLoggedIn(){
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  isTokenExpired(){
    let jwtToken = localStorage.getItem(this.JWT_TOKEN)

    if(!jwtToken) return true;

    const decodedToken = jwtDecode(jwtToken)

    if(!decodedToken.exp) return true;

    const expirationDate = decodedToken.exp * 1000
    const now = new Date().getTime()

    return expirationDate < now;
  }

  refreshJwtToken(){
    return localStorage.getItem(this.JWT_TOKEN);
  }

}
