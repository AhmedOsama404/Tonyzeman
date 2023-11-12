import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';


//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';

// Modules
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Custom Modules
import { FormModule } from './Modules/form/form.module';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

import { NavbarComponent } from './Components/Navbar/navbar/navbar.component';

import { NavBarComponent } from './Components/Common/Nav/nav-bar/nav-bar.component';
import { CustomerCreateComponent } from './Components/Customer/CustomerCreate/customer-create/customer-create.component';
import { CustomerEditComponent } from './Components/Customer/CustomerEdit/customer-edit/customer-edit.component';
import { ConfirmDialogComponent } from './Components/common/confirm-dialog/confirm-dialog.component';
import { CustomerViewComponent } from './Components/Customer/customer-view/customer-view.component';
import { ProductCreateComponent } from './Components/Product/product-create/product-create.component';
import { ProductViewComponent } from './Components/Product/product-view/product-view.component';
import { ProductEditComponent } from './Components/Product/product-edit/product-edit.component';
import { ProductCartComponent } from './Components/Product/product-cart/product-cart.component';
import { CartComponent } from './Components/Product/cart/cart.component';
import { FilterPipe } from './Components/Shared/filter.pipe';
import { ProductDetailsComponent } from './Components/Product/product-details/product-details.component';
import { CheckoutComponent } from './Components/Product/checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
 
    NavbarComponent,

    NavBarComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    ConfirmDialogComponent,
    CustomerViewComponent,
    ProductCreateComponent,
    ProductViewComponent,
    ProductEditComponent,

    ProductCartComponent,
    CartComponent,
    FilterPipe,
    ProductDetailsComponent,
    CheckoutComponent,
    FooterComponent,
    AboutComponent





 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule,
    CommonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppRoutingModule } from './app-routing.module';
// import { CommonModule } from '@angular/common'; // Import CommonModule here

// //Components
// import { AppComponent } from './app.component';
// import { LoginComponent } from './Components/login/login.component';
// import { SignupComponent } from './Components/signup/signup.component';

// // Modules
// import { HttpClientModule } from '@angular/common/http';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { RouterModule} from '@angular/router';
// import { RouterLink } from '@angular/router';

// // Custom Modules
// import { FormModule } from './Modules/form/form.module';

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     SignupComponent,

//  ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     FormModule,
//     HttpClientModule,
//     MatSnackBarModule,
//     RouterModule,
//     CommonModule,
//     RouterLink 
    
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
