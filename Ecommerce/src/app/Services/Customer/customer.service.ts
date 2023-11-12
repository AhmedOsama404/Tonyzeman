import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/Models/Shared/app-constants';
import { Customer } from 'src/app/Models/data/customer';
import { CustomerViewModel } from 'src/app/Models/view-models/customer-view-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http:HttpClient
  ) { }
   get():Observable<Customer[]>{
    return this.http.get<Customer[]>(`${apiUrl}/Customers`);
  } 
  getVM():Observable<CustomerViewModel[]>{
    return this.http.get<CustomerViewModel[]>(`${apiUrl}/Customers/VM`);
  } 
  getById(id:number):Observable<Customer>{
    return this.http.get<Customer>(`${apiUrl}/Customers/${id}`);
  } 
  insert(data:Customer):Observable<Customer>{
    return this.http.post<Customer>(`${apiUrl}/Customers`, data);
  } 
  update(data:Customer):Observable<any>{
    return this.http.put<any>(`${apiUrl}/Customers/${data.customerID}`, data);
  } 
  delete(data:Customer):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/Customers/${data.customerID}`);
  }
}
