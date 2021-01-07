import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { AngularFireFunctions } from '@angular/fire/functions';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-bag',
  templateUrl: './account-bag.component.html',
  styleUrls: ['./account-bag.component.scss'],
})
export class AccountBagComponent implements OnInit {
  private stripe: Stripe | null | undefined;
  products: Array<any> = [];
  confirmation: any;
  loading = false;
  email = '';

  constructor(
    private fns: AngularFireFunctions,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.stripe = await loadStripe(environment.stripeKey);
    this.email = this.authService.getLocalUserData.email;
  }

  async checkout(e: Event) {
    e.preventDefault();
    this.loading = true;
    this.products = this.cartService.getProducts();
    const userInfo = this.authService.getLocalUserData;
    const data = {
      uid: userInfo.uid,
      customer: userInfo.payments[0].customer,
      customer_email: userInfo.email,
      line_items: this.products.map((p) => {
        return {
          price: p.alt[p.size][p.color].string_price_id,
          quantity: p.quantity,
        };
      }),
    };
    const createCheckoutSession = this.fns.httpsCallable(
      'createCheckoutSession'
    );
    createCheckoutSession(data)
      .toPromise()
      .then(async (sessionId: string) =>
        this.stripe?.redirectToCheckout({ sessionId })
      )
      .catch((e) => console.log('Error Buying', e))
      .finally(() => (this.loading = false));
  }
}
