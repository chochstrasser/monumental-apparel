import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Stripe } from 'stripe';

admin.initializeApp();

const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: '2020-08-27',
});

export const createCheckoutSession = functions.https.onCall(
  async (data, context) => {
    if (!data) return;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: data,
      mode: 'payment',
      success_url: 'http://localhost:4200',
      cancel_url: 'http://localhost:4200',
    });
    return session.id;
  }
);

export const events = functions.https.onRequest((request, response) => {
  response.send('Endpoint for Stripe Webhooks!');
});
