import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-account-bag',
  templateUrl: './account-bag.component.html',
  styleUrls: ['./account-bag.component.scss'],
})
export class AccountBagComponent implements OnInit {
  confirmation: any;
  loading = false;

  constructor() {}

  ngOnInit(): void {}

  // open the checkout handler
  async checkout(e: Event) {
    this.loading = true;
    e.preventDefault();

    const stripe = await loadStripe(environment.stripeKey);
    const result = await stripe?.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1I3mU8Dk4ooX2aqOJKHnTTez',
          quantity: 2,
        },
        {
          price: 'price_1I3meKDk4ooX2aqO0XL0h5Z3',
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `${window.location.href}`,
      cancelUrl: `${window.location.href}`,
    });

    if (result?.error) {
      console.log('error: ', result?.error);
      this.confirmation = result.error;
    } else {
      this.handleResult(result);
      this.confirmation = result;
    }
    this.loading = false;
  }

  handleResult(result: any) {
    console.log('handleResult()', result);
  }
}
