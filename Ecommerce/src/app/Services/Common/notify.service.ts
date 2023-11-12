import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  message(message: string, actions: string) {
    let config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: [],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    }
    this.snackBar.open(message, actions, config);
  }
  

  // message(message: string, actions: string) {
  //   let config: MatSnackBarConfig = {
  //     duration: 3000,
  //     panelClass: []   
  //   }
  //   this.snackBar.open(message, actions, config);
  // }
}
