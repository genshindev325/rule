// components/event/StripePaymentElement.tsx

import React, { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from "@stripe/react-stripe-js";
import { useIonRouter } from '@ionic/react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { toast } from 'react-toastify';
import Stripe from 'stripe';
import DeleteConfirmationModal from '@/app/components/utils/deleteConfirmModal';
import { STRIPE_SECRET_KEY } from '@/app/config';
import { STRIPE_PUBLISHABLE_KEY } from '@/app/config';
import { SERVER_URL } from '@/app/config';

interface RegisterCardInterface {
  _id: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvc: number;
}

const stripeGet = new Stripe(STRIPE_SECRET_KEY);
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const americanExpressSVG = "/svg/american_express.svg";
const jcbSVG = "/svg/jcb.svg";
const masterCardSVG = "/svg/mastercard.svg";
const visaSVG = "/svg/visa.svg";
const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
const container = 'w-[90vw] rounded-xl bg-white -mt-28 flex flex-col shadow-md text-gray-800';
const textMd = 'text-base sm:text-lg md:text-xl';
const textXs = 'text-xs sm:text-sm md:text-base';
const textSm = 'text-sm sm:text-base md:text-lg';

const FormInput: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useIonRouter();
  const [cardholderName, setCardholderName] = useState('');
  const { profile } = useSelector((state: RootState) => state.auth);
  const token = useSelector((state: RootState) => state.auth.token);
  const [userId, setUserId] = useState('');
  const [last4, setLast4] = useState('');
  const [exDate, setExDate] = useState('');
  const [cardSVG, setCardSVG] = useState('');
  const [registeredCard, setRegisteredCard] = useState<RegisterCardInterface | null>(null);
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);
  
  const handleCancel = () => {
    setDeleteConfirmModalVisible(false);
  };

  // Fetch registered card details
  const fetchRegisteredCard = async () => {
    try {
      if (!token) {
        router.push('/auth/login');
      } else {
        const response = await fetch(`${SERVER_URL}/api/payments/credit-cards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            holderRole: "user",
            holderId: userId
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
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          holderRole: "user",
          holderId: userId
        }),
      });

      if (response.status === 200) {
        setRegisteredCard(null);
        toast.success('カードは正常に削除されました。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
      } else {
        console.error(`Error deleting card: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };
  
  const handleRegister = async () => {
    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) return;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
      billing_details: {
        name: cardholderName,
      },
    });

    if (error) {
      console.log(error);
      return;
    }

    const response = await fetch(`${SERVER_URL}/api/payments/register-credit-card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        creditCard: paymentMethod.id,
        holderRole: "user",
        holderId: userId
      }),
    });

    const result = await response.json();
    if (result.success) {
      setRegisteredCard(result.data);
      fetchRegisteredCard();
      toast.success('支払い方法が正常に登録されました。', {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
    } else {
      console.error('Error saving payment method:', result.error);
    }
  };

  return (
    <>
      <div className={`${container}`}>
        <div className='flex flex-col items-center bg-white rounded-t-xl py-6'>
          <h2 className={`text-center text-neutral-800 font-bold ${textMd}`}>クレジット設定</h2>
        </div>
        <div className='bg-gray-100 pb-12 px-4 sm:px-5 md:px-6 text-gray-800'>
          {registeredCard &&
            <div className='bg-gray-100 pb-4'>
              <label className={`${textSm} block font-semibold text-gray-800 pt-2`}>登録済みカード</label>
              <div className="mt-4 bg-white rounded-md">
                <div className="flex flex-col p-2">
                  <h4 className={`${textSm} text-left font-semibold`}>{`****_****_****_${last4}`}</h4>
                  {cardSVG && <img src={`${cardSVG}`} alt="Visa" className="h-10 sm:h-12 mr-auto" />}
                  <h4 className={`${textSm}  text-left font-semibold`}>{exDate}</h4>
                  <div className='text-right'>
                    <button type='button' onClick={() => setDeleteConfirmModalVisible(true)}
                      className={`rounded-full bg-[#ff9c9c] ${textSm} font-semibold text-center px-6 sm:px-8`}
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
          <label className={`${textSm} block font-bold text-gray-800 pt-2`}>カード登録</label>
          <div className="mt-1 bg-white rounded-md">
            <h4 className={`${textSm} text-center font-semibold py-2`}>対応ブランド</h4>
            <div className="flex justify-around pb-4">
              <img src={`${visaSVG}`} alt="Visa" className="h-12" />
              <img src={`${masterCardSVG}`} alt="MasterCard" className="h-12" />
              <img src={`${jcbSVG}`} alt="JCB" className="h-12" />
              <img src={`${americanExpressSVG}`} alt="American Express" className="h-12" />
            </div>
          </div>
          <div className="mt-4">
            <label className={`${textSm} block font-bold text-gray-600`}>カード番号</label>
            <CardNumberElement id="card-number" className={`${textSm} w-full p-3 border bg-white rounded-md`} options={{showIcon: true}} />
          </div>
          <div className="mt-4">
            <label className={`${textSm} block font-bold text-gray-800`}>カード名義</label>
            <input
              type="text"
              className={`${textSm} w-full px-3 py-2 border rounded-md focus:outline-none`}
              placeholder="カード名義"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className={`${textSm} block font-bold text-gray-600`}>有効期限</label>
            <CardExpiryElement id="card-expiry" className={`${textSm} w-full p-3 border bg-white rounded-md`} />
          </div>
          <div className="mt-4">
            <label className={`${textSm} block font-bold text-gray-600`}>セキュリティコード</label>
            <CardCvcElement id="card-cvc" className={`${textXs} w-full p-3 border bg-white rounded-md`} />
          </div>
          <DeleteConfirmationModal isVisible={isDeleteConfirmModalVisible} onConfirm={handleDeleteCard} onCancel={handleCancel} />
        </div>
      </div>
      {/* buttons */}
      <div className='w-[90vw] flex flex-col space-y-4 py-6'>
        <button type='button' onClick={handleRegister} className={`${maleGradient} rounded-full py-2 text-white ${textSm} py-2 sm:py-4 md:py-6 font-bold`}>
          登録する
        </button>
        <button type='button' onClick={() => router.goBack()} className={`bg-gray-400 rounded-full py-2 text-white font-bold text-center ${textSm}`}>
          キャンセル
        </button>
      </div>
    </>
  );
};

const SetPayment: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <FormInput />
    </Elements>
  );
};

export default SetPayment;