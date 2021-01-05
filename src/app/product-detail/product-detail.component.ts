import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
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
  selectedSize: string = '';
  selectedColor: string = '';
  sizes: string[] | undefined;
  colors: string[] | undefined;
  checked: boolean = false;
  clickedAdd: boolean = false;
  outOfStock: boolean = true;

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
        this.sizes = this.product.sizes;
        this.colors = this.product.colors;
        this.selectedSize = (this.sizes || [])[0];
        this.selectedColor = (this.colors || [])[0];
        this.outOfStock =
          this.product.alt[this.selectedSize][this.selectedColor].quantity < 1;
      });
    });
  }

  sizeChange($event: MatRadioChange): void {
    this.outOfStock =
      this.product.alt[$event.value][this.selectedColor].quantity < 1;
  }

  colorChange($event: MatRadioChange): void {
    this.outOfStock =
      this.product.alt[this.selectedSize][$event.value].quantity < 1;
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

    this.checked = true;
    this.cartService.addProductToCart(payload);
    setTimeout(() => {
      this.checked = false;
      this.clickedAdd = true;
    }, 1000);
  }
}
