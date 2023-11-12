// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { apiUrl } from 'src/app/Models/Shared/app-constants';
// import { ImagePathResponse } from 'src/app/Models/Shared/image-path-response';
// import { Product } from 'src/app/Models/data/product';
// import { ProductInputModel } from 'src/app/Models/view-models/input/product-input-model';
// import { ProductViewModel } from 'src/app/Models/view-models/product-view-model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {

//   constructor(
//     private http:HttpClient
//   ) { }
//    get():Observable<Product[]>{
//     return this.http.get<Product[]>(`${apiUrl}/Products`);
//   } 
//   getVM():Observable<ProductViewModel[]>{
//     return this.http.get<ProductViewModel[]>(`${apiUrl}/Products/VM`);
//   } 
//   getById(id:number):Observable<Product>{
//     return this.http.get<Product>(`${apiUrl}/Products/${id}`);
//   } 
//   insert(data:ProductInputModel):Observable<Product>{
//     return this.http.post<Product>(`${apiUrl}/Products/VM`, data);
//   }
//   update(data:ProductInputModel):Observable<any>{
//     return this.http.put<any>(`${apiUrl}/Products/${data.productID}/VM`, data);
//   }
//   uploadImage(id: number, f: File): Observable<ImagePathResponse> {
//     const formData = new FormData();

//     formData.append('picture', f);
//     //console.log(f);
//     return this.http.post<ImagePathResponse>(`${apiUrl}/Products/Upload/${id}`, formData);
//   }
//   delete(data:ProductViewModel):Observable<any>{
//     return this.http.delete<any>(`${apiUrl}/Products/${data.productID}`);
//   }
// }





import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/Models/Shared/app-constants';
import { ImagePathResponse } from 'src/app/Models/Shared/image-path-response';
import { Product } from 'src/app/Models/data/product';
import { ProductInputModel } from 'src/app/Models/view-models/input/product-input-model';
import { ProductViewModel } from 'src/app/Models/view-models/product-view-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // ------------ Cart
  products: any[] = [];


  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiUrl}/Products`);
  }

  getVM(): Observable<ProductViewModel[]> {
    return this.http.get<ProductViewModel[]>(`${apiUrl}/Products/VM`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${apiUrl}/Products/${id}`);
  }

  insert(data: ProductInputModel): Observable<Product> {
    return this.http.post<Product>(`${apiUrl}/Products/VM`, data);
  }

  update(data: ProductInputModel): Observable<any> {
    return this.http.put<any>(`${apiUrl}/Products/${data.productID}/VM`, data);
  }

  uploadImage(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();

    formData.append('picture', f);

    return this.http.post<ImagePathResponse>(`${apiUrl}/Products/Upload/${id}`, formData);
  }

  delete(data: ProductViewModel): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/Products/${data.productID}`);
  }



  // ---------------------------------- Product Cart

  getAllProducts() {
    return this.http.get(`${apiUrl}/Products`);
  }

  getProduct() {
    return this.products;
  }


  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.products));
  }

  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveCart();
  }

  loadCart(): void {
    this.products = JSON.parse(localStorage.getItem('cart_items') as any) || [];
  }

  productInCart(product: any): boolean {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
  }

  clearProducts() {
    localStorage.clear();
  }

 

}





