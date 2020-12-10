import { Injectable } from '@angular/core';
import { CartProduct } from '../modals/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  getProducts() {
    let products: CartProduct[];

    products = [
      new CartProduct(
        1,
        'Uintah-Long-Sleeve-Shirt',
        'Uintah - Long Sleeve Shirt',
        24.95,
        'https://d2j6dbq0eux0bg.cloudfront.net/images/40749019/1812651321.jpg',
        'The design of this shirt is simple, cool, and sure to inspire. Inspired by the night sky, put this shirt on and go experience all the wonder of looking at the stars. Printed on 6.2oz 100% cotton, this shirt is renowned for its comfort and breathability. The fabric is versatile, you can wear it on your next camping expedition or style it for a night on the town. Either way, this shirt is sure to #makeitmonumental wherever you take it!',
        3
      ),
      new CartProduct(
        2,
        'Sonora-Long-Sleeve-Shirt',
        'Sonora - Long Sleeve Shirt',
        49.9,
        'https://d2j6dbq0eux0bg.cloudfront.net/images/40749019/1812605572.jpg',
        'The design of this shirt is simple, cool, and sure to inspire. Inspired by the desert landscape, put this shirt on and go wander the beautiful southwest deserts. Printed on 6.2oz 100% cotton, this shirt is renowned for its comfort and breathability. The fabric is versatile, you can wear it on your next camping expedition or style it for a night on the town. Either way, this shirt is sure to #makeitmonumental where ever you take it!',
        1
      ),
    ];

    return products;
  }
}