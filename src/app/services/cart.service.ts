import { Injectable } from '@angular/core';
import { Product } from '../modals/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: any[] = [];

  addProductToCart(product: Product) {
    this.cart$ = JSON.parse(localStorage.getItem('cart') || '[]');
    const found = this.cart$.find((p) => p.productID === product.productID);
    if (found) {
      this.cart$ = this.cart$.map((p) => {
        if (p.productID === product.productID) {
          return { ...p, quantity: (p.quantity || 0) + 1 };
        } else return p;
      });
    } else {
      this.cart$.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(this.cart$));
  }

  removeProductFromCart(product: Product) {
    var idx = this.cart$
      .reverse()
      .findIndex((p) => p.productID === product.productID);
    var removed = this.cart$.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart$.reverse()));
    console.log('Product removed from cart.', removed);
  }

  getProducts() {
    this.cart$ = JSON.parse(localStorage.getItem('cart') || '[]');
    return this.cart$;
  }
}
