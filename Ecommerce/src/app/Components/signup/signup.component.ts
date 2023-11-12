import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/Services/Shared/Snackbar/snackbar.service';
import { UserService } from 'src/app/Services/User/user.service';
// import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
export class SignupComponent implements OnInit {

  // For Validation
  signupForm!:FormGroup

  // For Animation
  bubbles!: Array<{ top: string, left: string, size: string, color: string, delay: number }>;


  constructor(
    private formbuilder:FormBuilder,
    private auth:UserService,
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    private router:Router,
    ) { }
  
  ngOnInit() {

    // For Validation
    this.signupForm = this.formbuilder.group({
      firstName: ['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      userName:['',Validators.required],
      password:['',Validators.required]
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



  // For Signup
  onSubmit(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value);

      // signup logic here

      this.auth.signup(this.signupForm.value).subscribe({
        next:(response=>{

          const config = this.snackbarService.getSnackBarConfig();
          const message = `Successfully registered as ${this.signupForm.value.userName}`;
          this.snackBar.open(message, 'Close', config);

          this.signupForm.reset();
          this.router.navigate(['dashboard']);
        }),
        error:(err=>{
          const config = this.snackbarService.getSnackBarConfig();
          const message = 'Something went wrong';
          this.snackBar.open(message, 'Close', config);
        })
      });
    }
    else{
      const config = this.snackbarService.getSnackBarConfig();
      const message = 'Invalid Form';
      this.snackBar.open(message, 'Close', config);
    }
  }

}
