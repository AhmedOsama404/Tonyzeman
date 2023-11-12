import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { baseUrl } from 'src/app/Models/Shared/app-constants';
import { UserService } from 'src/app/Services/User/user.service';
import { UserstoreService } from 'src/app/Services/UserStore/userstore.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Product } from 'src/app/Models/data/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  orderForm!: FormGroup;

  public fullName$ = this.userstore
    .getFullNameFromStore()
    .pipe(map((val) => val || this.auth.getFullNameFromToken()));

  picPath: string = `${baseUrl}/Pictures`;

  cartTotal!: any;
  public products: any = [];

  constructor(
    private auth: UserService,
    private userstore: UserstoreService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.cartTotal =
      JSON.parse(localStorage.getItem('cart_total') as any) || [];
    console.log(this.cartTotal);

    this.products = JSON.parse(localStorage.getItem('products') as any) || [];
    console.log(this.products);
  }

  shippingCost: number = 50;

  calculateShippingCost() {
    const shippingMethod = (<HTMLSelectElement>(
      document.getElementById('shipping-method')
    )).value;
    if (shippingMethod === 'expedited') {
      this.shippingCost = 70;
    } else {
      this.shippingCost = 50;
    }
  }

  getTotalCost() {
    return this.cartTotal + this.shippingCost;
  }

  placeOrder(): void {
    if (this.orderForm.valid) {
     const productsMessage = this.products
       .map((product: Product) => {
         return (
           `Product Name: ${product.productName}\n` +
           `Price: ${product.price}\n` +
           `Quantity: ${product.quantity}\n` +
           '--------------------------------\n'
         );
       })
       .join('\n');

     const emailMessage = `Order Details:\n\n${productsMessage}\nTotal Cost: $${this.getTotalCost()}`;

      emailjs.init('eYyZZxh_9-CyvaCuD');
      emailjs
        .send('service_4s28v58', 'template_v5dp36h', {
          name: this.orderForm.value.name,
          email: this.orderForm.value.email,
          address: this.orderForm.value.address,
          city: this.orderForm.value.city,
          phone: this.orderForm.value.phone,
          order: productsMessage,
          TotalCost: this.getTotalCost(),
        })
        .then((response: EmailJSResponseStatus) => {
          console.log('Email sent:', response);
          this.snackBar.open(
            'Order confirmed! We are delivering your product very soon.',
            'Close',
            { duration: 3000 }
          );
          this.router.navigate(['product-cart']).then(() => {
            window.location.reload();
          });
        });
    }
  }
}
