import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: any;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  public async sendEmailVerification() {
    await (await this.auth.currentUser)?.sendEmailVerification();
  }

  public async login(email: string, password: string) {
    const result = await this.auth.signInWithEmailAndPassword(email, password);
    await this.setUserData(result.user);
  }

  public async logout() {
    this.user$ = null;
    localStorage.removeItem('user');
    await this.auth.signOut();
  }

  public async register(email: string, password: string) {
    const result = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await this.sendEmailVerification();
    await this.updateUserData(result.user);
  }

  private async createCustomerDocument(
    cusRef: AngularFirestoreDocument<any>,
    authUser: any
  ) {
    const data = {
      uid: authUser.uid,
      email: authUser.email,
      photoURL: authUser.photoURL,
      emailVerified: authUser.emailVerified,
      roles: { shopper: true },
    };
    await cusRef.set(data, { merge: true });
  }

  public async setUserData(authUser: any) {
    const cusRef: AngularFirestoreDocument<any> = this.db
      .collection('customers')
      .doc(authUser.uid);
    const customer = await cusRef.get().toPromise();
    if (customer.exists) {
      const data = customer.data();
      localStorage.setItem('user', JSON.stringify(data));
      this.user$ = JSON.parse(localStorage.getItem('user') || '{}');
    }
  }

  public async forgotPassword(email: string) {
    await this.auth.sendPasswordResetEmail(email);
  }

  private async updateUserData(authUser: any) {
    const cusRef: AngularFirestoreDocument<any> = this.db
      .collection('customers')
      .doc(authUser.uid);
    await this.createCustomerDocument(cusRef, authUser);
    const customer = await cusRef.get().toPromise();
    if (customer.exists) {
      const data = customer.data();
      localStorage.setItem('user', JSON.stringify(data));
      this.user$ = JSON.parse(localStorage.getItem('user') || '{}');
    }
  }

  get getDBCurrentUserData(): any {
    return this.auth.authState;
  }

  get getLocalUserData(): any {
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

  get isAdmin(): boolean {
    this.user$ = JSON.parse(localStorage.getItem('user') || '{}');
    return this.user$.roles?.admin;
  }
}
