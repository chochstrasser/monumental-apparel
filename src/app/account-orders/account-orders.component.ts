import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss'],
})
export class AccountOrdersComponent implements OnInit {
  public isAdmin: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser().subscribe(async (auth) => {
      if (auth) {
        await this.authService.updateUserData(auth);
        this.isAdmin = this.authService.user$.roles.admin;
      }
    });
  }

  ngOnInit(): void {}
}
