import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AuthenticationGuard } from './Guards/authentication.guard';
import { DashboardComponent } from './Components/dashboard/dashboard.component';


import { CustomerCreateComponent } from './Components/Customer/CustomerCreate/customer-create/customer-create.component';
import { CustomerEditComponent } from './Components/Customer/CustomerEdit/customer-edit/customer-edit.component';
import { CustomerViewComponent } from './Components/Customer/customer-view/customer-view.component';
import { ProductCreateComponent } from './Components/Product/product-create/product-create.component';
import { ProductViewComponent } from './Components/Product/product-view/product-view.component';
import { ProductEditComponent } from './Components/Product/product-edit/product-edit.component';

import { ProductCartComponent } from './Components/Product/product-cart/product-cart.component';
import { CartComponent } from './Components/Product/cart/cart.component';
import { ProductDetailsComponent } from './Components/Product/product-details/product-details.component';
import { CheckoutComponent } from './Components/Product/checkout/checkout.component';
import { AboutComponent } from './about/about.component';




const routes: Routes = [
  { path: '', component:ProductCartComponent, pathMatch: 'full' },
  
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent,canActivate:[AuthenticationGuard]},


  // Customers
  {path:'customers',component:CustomerViewComponent},
  {path:'customer-create', component:CustomerCreateComponent},
  {path:'customer-edit/:id', component:CustomerEditComponent},

  // Products
  {path:'products', component:ProductViewComponent},
  {path:'product-create', component:ProductCreateComponent},
  {path:'product-edit/:id', component:ProductEditComponent},
  {path:'product-details/:id', component:ProductDetailsComponent},

  // Product Cart
  {path:'product-cart', component:ProductCartComponent},
  {path:'cart', component:CartComponent},
  {path:'checkout', component:CheckoutComponent,canActivate:[AuthenticationGuard]},

  // About
  {path:'about', component:AboutComponent},


  { path:'**', component:LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
