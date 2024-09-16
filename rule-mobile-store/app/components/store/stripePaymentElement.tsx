// app/pages/settings/creditCardSetting.tsx

'use client';

import React, { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from "@stripe/react-stripe-js";
import { IonRouterLink, useIonRouter } from '@ionic/react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import Stripe from 'stripe';
import DeleteConfirmationModal from '@/app/utils/deleteConfirmModal';
import { SERVER_URL } from '@/app/config';
import Notification from '@/app/utils/notification';
import { STRIPE_SECRET_KEY } from '@/app/config';
import { STRIPE_PUBLISHABLE_KEY } from '@/app/config';

interface RegisterCardInterface {
  _id: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvc: number;
}

const visaSVG = "/svg/visa.svg";
const masterCardSVG = "/svg/mastercard.svg";
const americanExpressSVG = "/svg/american_express.svg";
const jcbSVG = "/svg/jcb.svg";
const stripeGet = new Stripe(STRIPE_SECRET_KEY);
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const textXs = 'text-xs sm:text-sm md:text-md';
const textSm = 'text-sm sm:text-md md:text-lg';

const FormInput = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useIonRouter();
  const [cardholderName, setCardholderName] = useState('');
  const { profile } = useSelector((state: RootState) => state.auth);
  const [storeID, setStoreID] = useState('');
  const [last4, setLast4] = useState('');
  const [exDate, setExDate] = useState('');
  const [cardSVG, setCardSVG] = useState('');
  const [registeredCard, setRegisteredCard] = useState<RegisterCardInterface | null>(null);
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  useEffect(() => {
    if (profile) {
      setStoreID(profile._id);
    }
  }, [profile]);

  // Fetch registered card details
  const fetchRegisteredCard = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/payments/credit-cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          holderRole: "store",
          holderId: storeID
        }),
      });
      
      if (response.status === 200) {
        const result = await response.json();
        setRegisteredCard(result.data);
        const paymentMethod = await stripeGet.paymentMethods.retrieve(result.data.creditCard as string);
        const last4 = paymentMethod.card?.last4;
        const brand = paymentMethod.card?.brand;
        const exDate = `${paymentMethod.card?.exp_month}/${paymentMethod.card?.exp_year}`;
        last4 && setLast4(last4); 
        switch (brand) {
          case "visa":
              setCardSVG(visaSVG);
            break;
          case "mastercard":
              setCardSVG(masterCardSVG);
            break;
          case "amex":
              setCardSVG(americanExpressSVG);
            break;
          case "jcb":
              setCardSVG(jcbSVG);
            break;        
          default:
              setCardSVG('');
            break;
        }
        setExDate(exDate);
      } else {
        console.error(`Error fetching card details: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching card details:', error);
    }
  };

  useEffect(() => {
    fetchRegisteredCard();
  }, [storeID]);

  if (!stripe || !elements) return;

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleCancel = () => {
    setDeleteConfirmModalVisible(false);
  };
  
  const handleDeleteCard = async () => {
    setDeleteConfirmModalVisible(false);
    try {
      const response = await fetch(`${SERVER_URL}/api/payments/credit-cards`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          holderRole: "store",
          holderId: storeID
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
        creditCard: paymentMethod.id,
        holderRole: "store",
        holderId: storeID
      }),
    });

    const result = await response.json();
    if (result.success) {
      setRegisteredCard(result.data);
      fetchRegisteredCard();
      setNotification({ message: '支払い方法が正常に登録されました', type: 'success' });
      setTimeout(() => {
        router.push('/settings');
      }, 2000);
    } else {
      console.error('Error saving payment method:', result.error);
    }
  };

  return (
    <div className='bg-white w-full p-4'>
      <form onSubmit={handleSubmit}>
        <h3 className={`${textSm} font-semibold pb-2`}>登録済みカード</h3>
        { registeredCard &&
          <div className="mb-4 w-full p-2 bg-gray-100 rounded-md flex flex-col">
            <div className='flex flex-col'>
              <h3 className={`text-black ${textSm} pb-1`}>{`****_****_****_${last4}`}</h3>
              {cardSVG && <img src={`${cardSVG}`} alt="Visa" className="h-10 sm:h-12 mr-auto" />}
              <h4 className={`${textSm} text-left font-semibold`}>{exDate}</h4>
            </div>
            <div className='flex flex-row-reverse'>
              <button
                type="button" 
                onClick={() => setDeleteConfirmModalVisible(true)}
                className={`${textSm} w-20 px-4 bg-red-300 text-white rounded-full hover:bg-red-500 duration-300`}
              >
                削除
              </button>
            </div>
          </div>
        }
        {/* Card registration */}
        <h3 className={`${textSm} font-semibold py-2`}>カード登録</h3>
        <h3 className={`${textSm} font-semibold py-2`}>カード番号</h3>
        <div className="mb-4">
          <CardNumberElement id="card-number" className={`${textXs} w-full p-3 bg-gray-100 rounded-md`} options={{showIcon: true}} />
        </div>
        <h3 className={`${textSm} font-semibold py-2`}>カード名義</h3>
        <div className="mb-4">
          <input
            type="text"
            id='cardholder-name'
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className={`${textXs} w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
            placeholder="カード名義"
            required
          />
        </div>
        <h3 className={`${textSm} font-semibold py-2`}>有効期限</h3>
        <div className="mb-4">
          <CardExpiryElement id="card-expiry" className={`${textXs} w-full p-3 bg-gray-100 rounded-md`} />
        </div>
        <h3 className={`${textSm} font-semibold py-2`}>セキュリティコード</h3>
        <div className="mb-4">
          <CardCvcElement id="card-cvc" className={`${textXs} w-full p-3 bg-gray-100 rounded-md`} />
        </div>
        {/* buttons */}
        <div className='flex flex-col pt-2 space-y-4'>
          <button type="submit" className={`${textSm} w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300`}>
            新しくカードを登録
          </button>
          <button type="button" className={`${textSm} w-full py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 duration-300`}>
            <IonRouterLink routerLink='/settings' className='text-gray-800'>キャンセル</IonRouterLink>
          </button>
        </div>
      </form>
    {notification && (<Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />)}
    <DeleteConfirmationModal isVisible={isDeleteConfirmModalVisible} onConfirm={handleDeleteCard} onCancel={handleCancel} />
    </div>
  );
}

const StripePaymentElement: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <FormInput />
    </Elements>
  );
};

export default StripePaymentElement;