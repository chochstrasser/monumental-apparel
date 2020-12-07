import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../modals/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product = {};
  selectedSize: string = 'S';
  sizes: string[] = ['S', 'M', 'L', 'XL'];
  selectedColor: string = 'Navy';
  colors: string[] = ['Navy', 'Seafoam'];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const product = params.get('product');
      this.product = this.productService.getProduct(`${product}`);
    });
  }
}
