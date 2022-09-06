import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// const stripePromise = loadStripe('pk_test_51LXJQGSGGPs6zlpy6pqKYZPlw5Sltf7ua2QsYGXVYwygfd3ui6UoAt7UmHAXN8A16CsspHUHeak1kN0MTEcBZoRn009UJlG8Rb');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      'color': 'black',
      'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
      'fontSmoothing': 'antialiased',
      'fontSize': '16px',
      'width':'600px',
      '::placeholder': {
        color: '#aab7c4',
        
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

export default function CardInput() {
  return (
    // <Elements stripe={stripePromise}>
    <CardElement options={CARD_ELEMENT_OPTIONS} />
    // </Elements>
  );
}