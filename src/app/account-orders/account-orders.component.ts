import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss'],
})
export class AccountOrdersComponent implements OnInit {
  public isAdmin: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.getDBCurrentUserData.subscribe(async (auth: any) => {
      if (auth) {
        await this.authService.setUserData(auth);
        this.isAdmin = this.authService.isAdmin;
      }
    });
  }

  ngOnInit(): void {}
}
