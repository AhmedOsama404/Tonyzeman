import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ecommerce';


  constructor() {}

  ngOnInit() {
   
  }
}



// import { Component } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   showNavBar: boolean = true;

//   constructor(private router: Router) {
//     router.events.subscribe((val) => {
//       if (val instanceof NavigationEnd) {
//         const routePath = this.router.url;
//         if (routePath === '/signup' || routePath === '/login') {
//           this.showNavBar = false;
//         } else {
//           this.showNavBar = true;
//         }
//       }
//     });
//   }
// }
