import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { baseUrl } from 'src/app/Models/Shared/app-constants';
import { ProductViewModel } from 'src/app/Models/view-models/product-view-model';
import { NotifyService } from 'src/app/Services/Common/notify.service';
import { ProductService } from 'src/app/Services/Product/product.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { throwError } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
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
export class ProductViewComponent implements OnInit {

  public productService: ProductService;

  // For Animation
  bubbles!: Array<{ top: string, left: string, size: string, color: string, delay: number }>;


  picPath: string = `${baseUrl}/Pictures`

  products: ProductViewModel[] = [];
  dataSource: MatTableDataSource<ProductViewModel> = new MatTableDataSource(this.products)
  columns: string[] = ['picture', 'productName', 'category', 'price', 'sellPrice', 'isAvailable', 'actions'];
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    productService: ProductService,
    private notifyService: NotifyService,
    private matDialog: MatDialog
  ) {
    this.productService = productService;
   }

  confirmDelete(data: ProductViewModel) {
    //console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '50p0x',
    }).afterClosed()
      .subscribe(result => {
        //console.log(result);
        if (result) {
          this.productService.delete(data)
            .subscribe({
              next: r => {
                this.notifyService.message('Product removed', 'DISMISS');
                this.dataSource.data = this.dataSource.data.filter(c => c.productID != data.productID);
              },
              error: err => {
                this.notifyService.message('Failed to delete data', 'DISMISS');
                throwError(() => err);
              }
            })
        }
      })
  }

  ngOnInit(): void {
    this.productService.getVM()
      .subscribe({
        next: r => {
          this.products = r;
          this.dataSource.data = this.products;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
    })


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



  openProductDeatailsDialog(id: number) {
    this.matDialog.open(ProductDetailsComponent, {
      width: '450px',
      minWidth: '70vw',
      maxHeight:'75vh',
      data: { id: id }
    });
  }




  }


