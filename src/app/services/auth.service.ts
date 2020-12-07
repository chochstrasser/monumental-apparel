import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user$ = this.auth.authState;
  }

  async login(email: string, password: string) {
    const result = await this.auth.signInWithEmailAndPassword(email, password);
    this.updateUserData(result);
  }

  logout() {
    this.auth.signOut();
    console.log('user is now signed out');
  }

  updateUserData(user: any) {
    this.user$ = user;
    console.log('updated user data:', this.user$);
  }
}
