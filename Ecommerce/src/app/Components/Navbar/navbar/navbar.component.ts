import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from 'src/app/Services/User/user.service';
import { UserstoreService } from 'src/app/Services/UserStore/userstore.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, backgroundColor: 'rgba(0,0,0,0)' }),
        animate('0.30s ease-out', style({ opacity: 1, backgroundColor: 'rgba(255,255,255,0.8)' }))
      ]),
      transition(':leave', [
        animate('0.30s ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {

  public fullName$ = this.userstore.getFullNameFromStore().pipe(map(val => val || this.auth.getFullNameFromToken()));


  public role!:string;

  constructor(
    private auth : UserService, 
    private userstore :UserstoreService,
    ){}

  ngOnInit(): void {

    this.userstore.getRoleFromStore().subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

  
  logout(){
    this.auth.signOut();
  }


  
}
