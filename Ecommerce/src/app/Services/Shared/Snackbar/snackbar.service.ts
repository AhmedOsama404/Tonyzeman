import { Injectable } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor() { }

  getSnackBarConfig(): MatSnackBarConfig {
    const config = new MatSnackBarConfig();
    config.panelClass = 'custom-snackbar'; // add a custom CSS class to the snackbar panel
    config.horizontalPosition = 'center'; // position the snackbar to the center of the screen
    config.verticalPosition = 'top'; // position the snackbar to the top of the screen
    config.duration = 5000; // set duration to 5 seconds
    config.politeness = 'assertive'; // set politeness to assertive for screen readers
    config.data = { message: 'Hello, world!' }; // attach custom data to the snackbar
    return config;
  }
}
