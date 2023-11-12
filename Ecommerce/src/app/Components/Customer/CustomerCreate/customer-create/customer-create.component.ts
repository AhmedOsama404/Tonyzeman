import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { Customer } from 'src/app/Models/data/customer';
import { NotifyService } from 'src/app/Services/Common/notify.service';
import { CustomerService } from 'src/app/Services/Customer/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
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
export class CustomerCreateComponent implements OnInit {

  customer: Customer = { customerName: '', address: '', email: '' };
  customerForm: FormGroup = new FormGroup({
    customerName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)])
  });
  constructor(
    private customerService: CustomerService,
    private notifyService: NotifyService
  ) { }



   // For Animation
   bubbles!: Array<{ top: string, left: string, size: string, color: string, delay: number }>;


  save(): void {
    if (this.customerForm.invalid) return;
    Object.assign(this.customer, this.customerForm.value);
    //console.log(this.customer);
    this.customerService.insert(this.customer)
      .subscribe({
        next: r => {
          this.notifyService.message('Data saved', 'DISMISS');
          
          this.customer = { customerName: '', address: '', email: '' };
          this.customerForm.patchValue(this.customer);
          this.customerForm.markAsUntouched();
          this.customerForm.markAsPristine();

        },
        error: err => {
          this.notifyService.message('Failed to save data', 'DISMISS');
          throwError(() => err);
        }
      })
  }


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



