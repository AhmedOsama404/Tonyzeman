import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { baseUrl } from 'src/app/Models/Shared/app-constants';
import { Product } from 'src/app/Models/data/product';
import { NotifyService } from 'src/app/Services/Common/notify.service';

import { ProductService } from 'src/app/Services/Product/product.service';
import { UserService } from 'src/app/Services/User/user.service';
import { UserstoreService } from 'src/app/Services/UserStore/userstore.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  product!: Product;
  imgPath: string = baseUrl;

  public role!:string;

  constructor(
    private productService: ProductService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    private userstore :UserstoreService,
    private auth : UserService, 
    
    ){}

  ngOnInit(): void {


    this.productService.getById(this.data.id).subscribe(
      product => this.product = product,
      error => this.notifyService.message('Failed to load data', 'DISMISS')
    );



    this.userstore.getRoleFromStore().subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })


  }


  goToList() {
    this.router.navigate(['/products']);
  }
  
  onInsert() {
    this.router.navigate(['/product-create']);
  }

  onClose(): void {
    this.dialogRef.close();
  }




}
