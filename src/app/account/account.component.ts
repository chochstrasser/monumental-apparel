import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  loginForm;
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => (this.isLoggedIn = !!user));
    window.scroll(0, 0);
  }

  onLogOut() {
    this.authService.logout();
  }

  async onSubmit(userData: any) {
    try {
      await this.authService.login(userData.email, userData.password);
      this.errorMessage = '';
      this.loginForm.reset();
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
}
