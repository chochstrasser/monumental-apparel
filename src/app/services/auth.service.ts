import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: any;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  async sendEmailVerification() {
    await (await this.auth.currentUser)?.sendEmailVerification();
  }

  async login(email: string, password: string) {
    const result = await this.auth.signInWithEmailAndPassword(email, password);
    await this.updateUserData(result);
  }

  async logout() {
    this.user$ = null;
    localStorage.removeItem('user');
    await this.auth.signOut();
  }

  async register(email: string, password: string) {
    const result = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await this.createCustomerDocument(result);
    await this.sendEmailVerification();
    await this.updateUserData(result);
  }

  async createCustomerDocument(authUser: any) {
    const customerRef = this.db.collection('customers').doc(authUser.user.uid);
    await customerRef.set({
      name: 'Testing Name',
    });
  }

  async forgotPassword(email: string) {
    await this.auth.sendPasswordResetEmail(email);
  }

  async updateUserData(authUser: any) {
    const customer = await this.db
      .collection('customers')
      .doc(authUser.user.uid)
      .get()
      .toPromise();

    if (customer.exists) {
      const user = Object.assign(customer.data(), {
        uid: authUser.user.uid,
        photoURL: authUser.user.photoURL,
        emailVerified: authUser.user.emailVerified,
      });
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.log('No such document!');
    }
  }

  get getCurrentUser(): any {
    return this.isAuthenticated
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : null;
  }

  get isEmailVerified(): boolean {
    return this.isAuthenticated ? this.user$.emailVerified : false;
  }

  get isLoggedIn(): boolean {
    this.user$ = JSON.parse(localStorage.getItem('user') || '{}');
    return this.user$ !== null && this.user$.emailVerified !== false
      ? true
      : false;
  }

  get isAuthenticated(): boolean {
    this.user$ = JSON.parse(localStorage.getItem('user') || '{}');
    return !!this.user$.uid;
  }
}
