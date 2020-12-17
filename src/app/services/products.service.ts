import { Injectable } from '@angular/core';
import { Product } from '../modals/product';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Observable<any[]>;
  product: Product;

  constructor(private db: AngularFirestore) {
    this.products = this.db.collection('/products').valueChanges();
    this.product = {};
  }

  get getProducts() {
    return this.products;
  }

  public compare(a: string | undefined, b: string | undefined) {
    const aCase = `${a}`.toUpperCase();
    const bCase = `${b}`.toUpperCase();
    if (aCase < bCase) return -1;
    if (aCase > bCase) return 1;
    return 0;
  }
}
