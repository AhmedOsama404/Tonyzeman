import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { baseUrl } from 'src/app/Models/Shared/app-constants';
import { Product } from 'src/app/Models/data/product';
import { ProductInputModel } from 'src/app/Models/view-models/input/product-input-model';
import { NotifyService } from 'src/app/Services/Common/notify.service';
import { ProductService } from 'src/app/Services/Product/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
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
export class ProductEditComponent implements OnInit {


  categoryOptions: string[] = ['Mens', 'Womens', 'Baby', 'Sports'];

   // For Animation
   bubbles!: Array<{ top: string, left: string, size: string, color: string, delay: number }>;


  product: Product = null!;

  imgPath: string = baseUrl;

  // imgPath: string = baseUrl;

  productForm: FormGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    categoryName: new FormControl('', Validators.required),
    price: new FormControl(undefined, [Validators.required]),
    sellPrice: new FormControl('', Validators.required),
    isAvailable: new FormControl(undefined),
    picture: new FormControl(undefined, Validators.required)
  });



  file: File = null!;
  constructor(
    private productService: ProductService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }


  handleFileInputChange(event: any): void {
    if (event.target.files.length) {
      this.file = event.target.files[0];
      this.productForm.controls['picture'].patchValue(this.file.name);
    }
    else {
      this.productForm.controls['picture'].patchValue("");
    }

  }


  save() {
    if (this.productForm.invalid) return;
    let _self = this;
    Object.assign(this.product, this.productForm.value);
    console.log(this.product);
    let data: ProductInputModel = { productID: this.product.productID, productName: this.product.productName, description:this.product.description, categoryName:this.product.categoryName, price: this.product.price, sellPrice:this.product.sellPrice, isAvailable: this.product.isAvailable };
    this.productService.update(data)
      .subscribe({
        next: r => {
          this.notifyService.message("Product  updated", "DISMISS");
          if (this.file) {
            _self.updateImage();
          }
        }
      })
  }

  updateImage() {
    let _self = this;
    var reader = new FileReader();

    reader.onload = function (e: any) {
      _self.productService.uploadImage(<number>_self.product.productID, _self.file)
        .subscribe({
          next: r => {
            _self.notifyService.message("Picture updated", "DISMISS");
          },
          error: err => {
            _self.notifyService.message("Picture update failed", "DISMISS");
            throwError(() => err);
          }
        })
    }
    reader.readAsArrayBuffer(_self.file);
  }

  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id'];
    this.productService.getById(id)
      .subscribe({
        next: r => {
          this.product = r;
          this.productForm.patchValue(this.product)
          console.log(this.product)
        },
        error: err => {
          this.notifyService.message('Failed to load product data', 'DISMISS')
          throwError(() => err);
        }
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


  }


