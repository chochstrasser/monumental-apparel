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
    this.productService.getProducts.subscribe((p) => {
      this.products = p.sort((a, b) =>
        this.productService.compare(b.name, a.name)
      );
    });
  }
}
