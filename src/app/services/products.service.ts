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
    this.products = db.collection('/products').valueChanges();
    this.product = {};
  }

  getProducts() {
    return this.products;
  }
}
