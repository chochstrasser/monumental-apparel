import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../modals/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss'],
})
export class ProductGalleryComponent implements OnInit {
  product: Product = {};
  activeImageName = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productService.getProducts.subscribe((p) => {
        this.product =
          p.find((product) => product.path === params.get('product')) || {};
      });
    });
  }
}
