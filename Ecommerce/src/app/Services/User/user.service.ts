import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  private userPayload: any;

  constructor(private http:HttpClient, private router:Router) {
    this.userPayload = this.decodedToken();
   }

   


  signup(user:any){
    return this.http.post<any>(`http://localhost:49490/api/User/Register`,user);
  }

  login(data:any){
    return this.http.post<any>(`http://localhost:49490/api/User/AuthenticateUser`,data);
  }


  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLogedIn():boolean{
    return !!localStorage.getItem('token')
  }

  getCurrentUser(){
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }



  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }
  
}
