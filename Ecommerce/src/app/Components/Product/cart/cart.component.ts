import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl } from 'src/app/Models/Shared/app-constants';
import { Product } from 'src/app/Models/data/product';
import { CartService } from 'src/app/Services/Product/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, backgroundColor: 'rgba(0,0,0,0)' }),
        animate('1.50s ease-out', style({ opacity: 1, backgroundColor: 'rgba(255,255,255,0.8)' }))
      ]),
      transition(':leave', [
        animate('1.50s ease-out', style({ opacity: 0 }))
      ])
    ])
  ]

})
export class CartComponent implements OnInit {


   // For Animation
   bubbles!: Array<{ top: string, left: string, size: string, color: string, delay: number }>;

  picPath: string = `${baseUrl}/Pictures`

  displayedColumns: string[] = ['Sr.No', 'Product Name', 'Price', 'Quantity', 'Total', 'Action'];


  public products : any = [];
  public grandTotal !: number;

  constructor(
    private cartService : CartService,
    private router:Router
    ) { }



  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();

      
    });


    // For Animation
    this.bubbles = [
      { top: this.getRandomTop(), left: this.getRandomLeft(), size: '50px', color: '#8f8fff', delay: 0 },
      { top: this.getRandomTop(), left: this.getRandomLeft(), size: '70px', color: '#ff8f8f', delay: 2 },
      { top: this.getRandomTop(), left: this.getRandomLeft(), size: '100px', color: '#8fff8f', delay: 4 },
      { top: this.getRandomTop(), left: this.getRandomLeft(), size: '80px', color: '#ffff8f', delay: 6 },
      { top: this.getRandomTop(), left: this.getRandomLeft(), size: '60px', color: '#ff8fff', delay: 1 },
      { top: this.getRandomTop(), left: this.getRandomLeft(), size: '90px', color: '#8fffff', delay: 3 },
      { top: this.getRandomTop(), left: this.getRandomLeft(), size: '40px', color: '#ff8080', delay: 5 },
      { top: this.getRandomTop(), left: this.getRandomLeft(), size: '70px', color: '#80ff80', delay: 7 },
      { top: this.getRandomTop(), left: this.getRandomLeft(), size: '120px', color: '#8080ff', delay: 8 },
      { top: this.getRandomTop(), left: this.getRandomLeft(), size: '80px', color: '#ffdd80', delay: 9 }
    ];

  }

  getRandomTop(): string {
    return Math.floor(Math.random() * 70) + '%';
  }
  
  getRandomLeft(): string {
    return Math.floor(Math.random() * 90) + '%';
  }
  
  onAnimationEnd(bubble: any) {
    // update bubble position after animation ends
    bubble.top = this.getRandomTop();
    bubble.left = this.getRandomLeft();
  }



  removeItem(item: any){
    item.removing = true;
    this.cartService.removeCartItem(item);
  }

  
  emptycart(){
    this.cartService.removeAllCart();
  }



  increaseQuantity(item: any) {
    item.quantity++;
    item.total = item.sellPrice * item.quantity;
    this.grandTotal = this.cartService.getTotalPrice();
  }

  decreaseQuantity(item: any) {
    if (item.quantity <= 1) {
      return;
    }
    item.quantity--;
    item.total = item.sellPrice * item.quantity;
    this.grandTotal = this.cartService.getTotalPrice();
  }



  closeCart(){
    this.router.navigate(['/product-cart']);
  }


   checkout() {
    localStorage.setItem('cart_total', JSON.stringify(this.grandTotal));
    localStorage.setItem('products', JSON.stringify(this.products));

    this.router.navigate(['checkout']);
  }

}
