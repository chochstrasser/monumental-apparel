import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: any;

  constructor(private auth: AngularFireAuth) {}

  async sendEmailVerification() {
    await (await this.auth.currentUser)?.sendEmailVerification();
  }

  async login(email: string, password: string) {
    const result = await this.auth.signInWithEmailAndPassword(email, password);
    this.updateUserData(result);
  }

  async logout() {
    this.user$ = null;
    localStorage.removeItem('user');
    await this.auth.signOut();
  }

  updateUserData(authUser: any) {
    this.user$ = {
      uid: authUser.user.uid,
      email: authUser.user.email,
      displayName: authUser.user.displayName,
      photoURL: authUser.user.photoURL,
      phoneNumber: authUser.user.phoneNumber,
      emailVerified: authUser.user.emailVerified,
    };
    localStorage.setItem('user', JSON.stringify(this.user$));
  }

  getCurrentUser() {
    // this.user$ = JSON.parse(localStorage.getItem('user') || '{}');
    return this.isAuthenticated() ? this.user$ : null;
  }

  isEmailVerified() {
    return this.isAuthenticated() ? this.user$.emailVerified : false;
  }

  isAuthenticated(): any {
    this.user$ = JSON.parse(localStorage.getItem('user') || '{}');
    return !!this.user$.uid;
  }
}
