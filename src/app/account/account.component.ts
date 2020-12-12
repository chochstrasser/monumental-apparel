import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  isAuthenticated: boolean = false;
  isEmailVerified: boolean = true;
  isLoggedIn: boolean = false;
  loading: boolean = true;
  userData: any;

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.isAuthenticated = this.authService.isAuthenticated;
    this.isLoggedIn = this.authService.isLoggedIn;

    if (this.isAuthenticated) {
      this.isEmailVerified = this.authService.isEmailVerified;
      this.userData = this.authService.getCurrentUser;
    }

    window.scroll(0, 0);
    this.loading = false;
  }

  async verifyEmail() {
    try {
      await this.authService.sendEmailVerification();
      window.location.reload();
    } catch (error) {
      this.openSnackBar(error.message, 'close');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
