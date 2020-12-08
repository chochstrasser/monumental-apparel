import { Injectable } from '@angular/core';
import { Product } from '../modals/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  getProducts() {
    let products: Product[];

    products = [
      new Product(
        1,
        'Uintah-Long-Sleeve-Shirt',
        'Uintah - Long Sleeve Shirt',
        24.95,
        'https://d2j6dbq0eux0bg.cloudfront.net/images/40749019/1812651321.jpg',
        'The design of this shirt is simple, cool, and sure to inspire. Inspired by the night sky, put this shirt on and go experience all the wonder of looking at the stars. Printed on 6.2oz 100% cotton, this shirt is renowned for its comfort and breathability. The fabric is versatile, you can wear it on your next camping expedition or style it for a night on the town. Either way, this shirt is sure to #makeitmonumental wherever you take it!',
        [
          {
            path:
              'https://d2j6dbq0eux0bg.cloudfront.net/images/40749019/1812651320.jpg',
            name: 'Uintah model back',
          },
          {
            path:
              'https://d2j6dbq0eux0bg.cloudfront.net/images/40749019/1812658212.jpg',
            name: 'Uintah model front',
          },
          {
            path:
              'https://d2j6dbq0eux0bg.cloudfront.net/images/40749019/1802034409.jpg',
            name: 'Uintah navy back',
          },
          {
            path:
              'https://d2j6dbq0eux0bg.cloudfront.net/images/40749019/1802042415.jpg',
            name: 'Uintah navy front',
          },
          {
            path:
              'https://d2j6dbq0eux0bg.cloudfront.net/images/40749019/1801995742.jpg',
            name: 'Uintah seafoam back',
          },
          {
            path:
              'https://d2j6dbq0eux0bg.cloudfront.net/images/40749019/1802042445.jpg',
            name: 'Uintah seafoam front',
          },
        ]
      ),
      new Product(
        2,
        'Sonora-Long-Sleeve-Shirt',
        'Sonora - Long Sleeve Shirt',
        24.95,
        'https://d2j6dbq0eux0bg.cloudfront.net/images/40749019/1812605572.jpg',
        'The design of this shirt is simple, cool, and sure to inspire. Inspired by the desert landscape, put this shirt on and go wander the beautiful southwest deserts. Printed on 6.2oz 100% cotton, this shirt is renowned for its comfort and breathability. The fabric is versatile, you can wear it on your next camping expedition or style it for a night on the town. Either way, this shirt is sure to #makeitmonumental where ever you take it!',
        [
          {
            path:
              'https://d2j6dbq0eux0bg.cloudfront.net/images/40749019/1812605571.jpg',
            name: 'Sonora model back',
          },
        ]
      ),
    ];

    return products;
  }

  getProduct(path: string): Product {
    let products: Product[] = this.getProducts();
    return products.find((product) => product.path === path) || {};
  }
}
