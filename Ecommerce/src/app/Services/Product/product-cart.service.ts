import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {

  constructor(private http : HttpClient) { }
  
  getProduct(){
    return this.http.get<any>("http://localhost:49490/api/Products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
