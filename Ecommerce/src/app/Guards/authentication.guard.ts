import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/User/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../Services/Shared/Snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private auth: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService
    ){}

  canActivate():boolean{
    if(this.auth.isLogedIn()){
      return true;
    }
    else{
      const config = this.snackbarService.
      getSnackBarConfig();
        const message = 'Please Login First';
        this.snackBar.open(message, 'Close', config);
      this.router.navigate(['login'])
      return false;
    }
  }
}
