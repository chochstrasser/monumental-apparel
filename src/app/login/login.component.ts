import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  async onSubmit(userData: any) {
    try {
      await this.authService.login(userData.email, userData.password);
      this.loginForm.reset();
      window.location.reload();
    } catch (error) {
      this.openSnackBar(error.message, 'close', 3000);
    }
  }

  openSnackBar(message: string, action: string, duration?: number) {
    this._snackBar.open(message, action, { duration });
  }

  async forgotPassword() {
    try {
      await this.authService.forgotPassword(this.loginForm.get('email')?.value);
      this.openSnackBar(
        'Password reset email sent, check your inbox.',
        'close'
      );
    } catch (error) {
      this.openSnackBar(error.message, 'close', 3000);
    }
  }
}
