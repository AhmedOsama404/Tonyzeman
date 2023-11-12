import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/Models/data/product';
import { NotifyService } from 'src/app/Services/Common/notify.service';
import { ProductService } from 'src/app/Services/Product/product.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
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


export class ProductCreateComponent implements OnInit {


  categoryOptions: string[] = ['Mens', 'Womens', 'Baby', 'Sports'];


  product: Product = { productName: undefined, description: undefined, categoryName: undefined,  price: undefined, sellPrice: undefined, isAvailable: undefined };

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
  save() {
    if (this.productForm.invalid) return;
    Object.assign(this.product, this.productForm.value)
    //console.log(this.product);
    var _self = this;



    this.productService.insert(this.product)
      .subscribe({
        next: r => {
          _self.notifyService.message('Data saved', 'DISMISS');
          this.productForm.reset();
          var reader = new FileReader();

          reader.onload = function (e: any) {
            console.log(e);
            _self.productService.uploadImage(<number>r.productID, _self.file)
              .subscribe({
                next: r => {
                  console.log(r);
                  _self.notifyService.message('Picture uploaded', 'DISMISS');
                  _self.product.picture = r.pictureName;
                  console.log(_self.product)
                },
                error: err => {
                  _self.notifyService.message('Picture upload failed', 'DISMISS');
                }
              });
          }
          reader.readAsArrayBuffer(_self.file);
        },
        error: err => {
          _self.notifyService.message('Failed to save product', 'DISMISS')
        }
      });
  }


  handleFileInputChange(event: any): void {
    if (event.target.files.length) {
      this.file = event.target.files[0];
      this.productForm.controls['picture'].patchValue(this.file.name);
    }
    else {
      this.productForm.controls['picture'].patchValue("");
    }

  }


  
  
  



  constructor(
    private productService: ProductService,
    private notifyService: NotifyService
  ) { }


  // For Animation
  bubbles!: Array<{ top: string, left: string, size: string, color: string, delay: number }>;


  ngOnInit(): void {

    


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


