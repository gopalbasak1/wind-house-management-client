import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import './CheckoutForm.css';
import { useLocation } from 'react-router-dom';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const paymentData = location.state?.paymentData;
  const [price, setPrice] = useState(paymentData?.rent);

  useEffect(() => {
    if (price > 0) {
      getClientSecret({ price: price });
    }
  }, [price]);

  const getClientSecret = async ({ price }) => {
    const { data } = await axiosSecure.post(`/create-payment-intent`, { price });
    console.log('client secret', data);
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: paymentData?.userEmail,
        },
      },
    });

    if (confirmError) {
      console.log('[confirmError]', confirmError);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment successful!');
      // Handle successful payment here
      await storePaymentData(paymentIntent);
    }
  };

  const storePaymentData = async (paymentIntent) => {
    const paymentDetails = {
      ...paymentData,
      paymentIntentId: paymentIntent.id,
      paymentStatus: paymentIntent.status,
      paymentDate: new Date(),
    };

    try {
      const { data } = await axiosSecure.post('/store-payment', paymentDetails);
      console.log('Payment data stored:', data);
      // Redirect to a success page or show a success message
    } catch (error) {
      console.error('Failed to store payment data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
