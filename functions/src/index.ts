import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Stripe } from 'stripe';

admin.initializeApp();
const config = functions.config();

const stripe = new Stripe(config.stripe.secret, {
  apiVersion: '2020-08-27',
});

export const createCheckoutSession = functions.https.onCall(
  async (data: any, context: any) => {
    if (!data) return;
    const session = await stripe.checkout.sessions.create({
      customer: data.customer,
      customer_email: data.customer_email,
      payment_method_types: ['card'],
      line_items: data.line_items,
      mode: 'payment',
      success_url: 'http://localhost:4200/success',
      cancel_url: 'http://localhost:4200/cancel',
      metadata: {
        uid: data.uid,
      },
    });
    return session.id;
  }
);

const fulfillOrder = async (session: any) => {
  await admin
    .firestore()
    .collection('customers')
    .doc(session.metadata.uid)
    .update({
      payments: admin.firestore.FieldValue.arrayUnion(session),
    });
};

export const events = functions.https.onRequest(
  async (request: functions.https.Request, response: any) => {
    const payload = request.rawBody.toString('utf8');
    const stripeSignature: string = request.headers[
      'stripe-signature'
    ] as string;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        stripeSignature,
        config.stripe.webhooks_signing
      );
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await fulfillOrder(session);
    }

    response.status(200).send('Finished!');
  }
);
