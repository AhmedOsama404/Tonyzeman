import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/Models/Shared/app-constants';
import { Order } from 'src/app/Models/data/order';
import { OrderAndOrderItemViewModel } from 'src/app/Models/view-models/order-and-order-item-view-model';
import { OrderViewModel } from 'src/app/Models/view-models/order-view-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http:HttpClient
  ) { }
  get():Observable<Order[]>{
    return this.http.get<Order[]>(`${apiUrl}/Orders`);
  }
  getVM():Observable<OrderViewModel[]>{
    return this.http.get<OrderViewModel[]>(`${apiUrl}/Orders/VM`);
  }
  getWithItems(id:number):Observable<OrderAndOrderItemViewModel>{
    return this.http.get<OrderAndOrderItemViewModel>(`${apiUrl}/Orders/${id}/OI`)
  }
  insert(data:Order):Observable<Order>{
    return this.http.post(`${apiUrl}/Orders`, data)
  }
  update(data:Order):Observable<any>{
    return this.http.put<any>(`${apiUrl}/OrdersContext/VM/${data.orderID}`, data)
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/Orders/${id}`)
  }
}
