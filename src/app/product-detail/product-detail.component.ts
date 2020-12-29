import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../modals/product';
import { CartService } from '../services/cart.service';
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
  checked: boolean = false;
  clickedAdd: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productService.getProducts.subscribe((p) => {
        this.product =
          p.find((product) => product.path === params.get('product')) || {};
        this.initializeButtons();
      });
    });
  }

  initializeButtons(): void {
    const products = this.cartService.getProducts();
    const found = products.some(
      (product) => product.productID === this.product.productID
    );
    if (found) {
      this.clickedAdd = true;
    }
  }

  addToBag() {
    const payload = {
      ...this.product,
      size: this.selectedSize,
      color: this.selectedColor,
    };

    // TODO: check if size and color available

    this.checked = true;
    this.cartService.addProductToCart(payload);
    setTimeout(() => {
      this.checked = false;
      this.clickedAdd = true;
    }, 1000);
  }
}
