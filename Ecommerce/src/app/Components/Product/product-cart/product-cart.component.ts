import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl } from 'src/app/Models/Shared/app-constants';
import { CartService } from 'src/app/Services/Product/cart.service';
import { ProductCartService } from 'src/app/Services/Product/product-cart.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/Services/Product/product.service';
import { UserService } from 'src/app/Services/User/user.service';
import { UserstoreService } from 'src/app/Services/UserStore/userstore.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
  
})


export class ProductCartComponent implements OnInit {

  // Picture
  picPath: string = `${baseUrl}/Pictures`


  // For Animation
  bubbles!: Array<{ top: string, left: string, size: string, color: string, delay: number }>;
  
  // -------------- Search
  public totalItem : number = 0;
  public searchTerm !: string;

  // ----------------
  searchKey:string ="";
  public productList : any ;
  public filterCategory : any;

  public role!:string;


  products: any[] = [];

  constructor(
    private api : ProductCartService,
    private cartService : CartService,
    private matDialog: MatDialog,
    private router:Router,
    private product_service: ProductService,
    private auth : UserService, 
    private userstore :UserstoreService,) { }

  ngOnInit(): void {


    this.userstore.getRoleFromStore().subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })

    // number of order
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })

    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;

      this.filterCategory = res;

      this.productList.forEach((a:any) => {
        // if(a.categoryName ==="Mens" || a.categoryName ==="Womens"){
        //   a.categoryName ="Baby"
        // }
        Object.assign(a,{quantity:1,total:a.sellPrice});
      });
      console.log(this.productList)
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })



   




    this.products = this.product_service.getProduct();



  }





  addtocart(item: any){
      this.cartService.addtoCart(item);  
  }

  
  filter(categoryName:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.categoryName == categoryName || categoryName==''){
        return a;
      }
    })
  }


  gotoCart(){
    this.router.navigate(['/cart']); 
  }



  search(event: any) {
    if (event && event.target) {
      this.searchTerm = (event.target as HTMLInputElement).value;
      console.log(this.searchTerm);
      this.cartService.search.next(this.searchTerm);
    }
  }




  openProductDeatailsDialog(id: number) {
    this.matDialog.open(ProductDetailsComponent, {
      width: '450px',
      minWidth: '70vw',
      maxHeight:'75vh',
      data: { id: id }
    });
  }




  // ------------------------
   //Add product to Cart
   addToCart(product: any) {
    if (!this.product_service.productInCart(product)) {
      product.quantity = 1;
      this.product_service.addToCart(product);
      // this.products = [...this.product_service.getProduct()];
      // this.subTotal = product.price;
    }
  }


  gotoLogin(){
    this.router.navigate(['login']);
  }

}




