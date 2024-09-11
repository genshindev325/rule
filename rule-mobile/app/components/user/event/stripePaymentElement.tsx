// components/event/StripePaymentElement.tsx

import React, { useState, useEffect } from 'react';
import RegisteredCard from './registeredCard';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import Notification from '@/app/components/utils/notification';
import Stripe from 'stripe';
import DeleteConfirmationModal from '@/app/components/utils/deleteConfirmModal';
import { STRIPE_SECRET_KEY } from '@/app/config';
import { STRIPE_PUBLISHABLE_KEY } from '@/app/config';
import { SERVER_URL } from '@/app/config';

interface RegisterCardInterface {
  _id: string;
  paymentMethodId: string;
  cardholderName: string;
}

const stripeGet = new Stripe(STRIPE_SECRET_KEY);
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const americanExpressSVG = "/svg/american_express.svg";
const jcbSVG = "/svg/jcb.svg";
const masterCardSVG = "/svg/mastercard.svg";
const visaSVG = "/svg/visa.svg";

const FormInput: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { profile } = useSelector((state: RootState) => state.auth);
  const [userId, setUserId] = useState('');
  const [last4, setLast4] = useState('');
  const [exDate, setExDate] = useState('');
  const [registeredCard, setRegisteredCard] = useState<RegisterCardInterface | null>(null);
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleCancel = () => {
    setDeleteConfirmModalVisible(false);
  };

  // Fetch registered card details
  const fetchRegisteredCard = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/payments/credit-cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          holderRole: "user",
          holderId: userId
        }),
      });
      
      if (response.status === 200) {
        const result = await response.json();
        setRegisteredCard(result.data);
        const paymentMethod = await stripeGet.paymentMethods.retrieve(result.data.paymentMethodId as string);
        const last4 = paymentMethod.card?.last4;
        const exDate = `${paymentMethod.card?.exp_month}/${paymentMethod.card?.exp_year}`;
        last4 && setLast4(last4);
        setExDate(exDate);
      } else {
        console.error(`Error fetching card details: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching card details:', error);
    }
  };

  useEffect(() => {
    if (profile) {
      setUserId(profile._id);
    }
  }, [profile]);

  useEffect(() => {
    fetchRegisteredCard();
  }, [userId]);
  
  if (!stripe || !elements) return;

  const handleDeleteCard = async () => {
    setDeleteConfirmModalVisible(false);
    try {
      const response = await fetch(`${SERVER_URL}/api/payments/credit-cards`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          holderRole: "user",
          holderId: userId
        }),
      });

      if (response.status === 200) {
        setRegisteredCard(null);
        setTimeout(() => {
          setNotification({ message: 'カードは正常に削除されました。', type: 'success' });
        }, 2000);
      } else {
        console.error(`Error deleting card: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };
  
  const handleRegister = async () => {
    setIsProcessing(true);

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
      billing_details: {
        name: cardholderName,
      },
    });

    if (error) console.error('Error creating payment method:', error);
    // Ensure paymentMethod is defined before proceeding
    if (!paymentMethod) {
      console.error('Payment method is undefined.');
      return;
    }

    const response = await fetch(`${SERVER_URL}/api/payments/register-credit-card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        cardholderName,
        holderRole: "user",
        holderId: userId
      }),
    });

    const result = await response.json();
    if (result.success) {
      setIsProcessing(false);
      setRegisteredCard(result.data);
      fetchRegisteredCard();
      setTimeout(() => {
        setNotification({ message: '支払い方法が正常に登録されました', type: 'success' });
      }, 2000);
    } else {
      console.error('Error saving payment method:', result.error);
    }
  };

  return (
    <div className='bg-gray-100 pb-4 px-4 sm:px-6 md:px-8'>
      {registeredCard && <RegisteredCard last4={last4} exDate={exDate} setDeleteConfirmModalVisible={() => setDeleteConfirmModalVisible(true)} />}
      <div className="flex justify-center py-4">
        <button
          type="button"
          onClick={handleRegister}
          className="bg-[#808080] text-white flex items-center px-8 md:px-12 lg:px-16 py-2 md:py-4 lg:py-6"
        >
          <div className="rounded-full bg-white text-[#808080] text-2xl h-6 md:h-8 lg:h-10 w-6 md:w-8 lg:w-10 mr-4 md:mr-6 lg:mr-8 flex justify-center items-center">
            +
          </div>
          新しいカードを登録する
        </button>
      </div>
      <label className="block font-bold text-gray-800 pt-2">カード登録</label>
      <div className="mt-4 bg-white rounded-md">
        <h4 className="text-md text-center font-semibold py-2">対応ブランド</h4>
        <div className="flex justify-around pb-4">
          <img src={`${visaSVG}`} alt="Visa" className="h-12" />
          <img src={`${masterCardSVG}`} alt="MasterCard" className="h-12" />
          <img src={`${jcbSVG}`} alt="JCB" className="h-12" />
          <img src={`${americanExpressSVG}`} alt="American Express" className="h-12" />
        </div>
      </div>
      <div className="mt-4">
        <label className="block font-bold text-gray-600">カード番号</label>
        <CardNumberElement id="card-number" className='w-full p-3 border bg-white rounded-md' options={{showIcon: true}} />
      </div>
      <div className="mt-4">
        <label className="block font-bold text-gray-800">カード名義</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
          placeholder="カード名義"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="block font-bold text-gray-600">有効期限</label>
        <CardExpiryElement id="card-expiry" className='w-full p-3 border bg-white rounded-md' />
      </div>
      <div className="mt-4">
        <label className="block font-bold text-gray-600">セキュリティコード</label>
        <CardCvcElement id="card-cvc" className='w-full p-3 border bg-white rounded-md' />
      </div>
      {notification && (<Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />)}
      <DeleteConfirmationModal isVisible={isDeleteConfirmModalVisible} onConfirm={handleDeleteCard} onCancel={handleCancel} />
    </div>
  );
};

const StripePaymentElement: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/payments/create-payment-intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });

        if (response.status === 200) {
          const result = await response.json();
          setClientSecret(result.clientSecret);
        } else {
          console.error(`Error fetching client secret: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    getClientSecret();
  }, []);

  const appearance = {
    theme: "stripe" as "stripe",
  };

  const options: StripeElementsOptions | undefined = clientSecret
    ? {
        clientSecret,
        appearance,
        locale: "ja",
      }
    : undefined;

  return options ? (
    <Elements stripe={stripePromise} options={options}>
      <FormInput />
    </Elements>
  ) : (
    <div>読み込み中...</div>
  );
};

export default StripePaymentElement;