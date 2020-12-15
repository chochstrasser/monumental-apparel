import { Component, OnInit } from '@angular/core';
import { Product } from '../modals/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((p) => {
      this.products = p;
      this.sort();
    });
  }

  sort() {
    this.products = this.products.sort((a, b) => this.compare(b.name, a.name));
  }

  compare(a: string | undefined, b: string | undefined) {
    const aCase = `${a}`.toUpperCase();
    const bCase = `${b}`.toUpperCase();
    if (aCase < bCase) return -1;
    if (aCase > bCase) return 1;
    return 0;
  }

  getImage(product: any, index: number) {
    return (product.images || [])[index].path;
  }
}
