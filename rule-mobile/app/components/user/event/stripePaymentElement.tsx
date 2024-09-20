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
import { useIonRouter } from '@ionic/react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/app/store/store';
import Notification from '@/app/components/utils/notification';
import Stripe from 'stripe';
import DeleteConfirmationModal from '@/app/components/utils/deleteConfirmModal';
import { STRIPE_SECRET_KEY } from '@/app/config';
import { STRIPE_PUBLISHABLE_KEY } from '@/app/config';
import { SERVER_URL } from '@/app/config';
import PayConfirmationModal from '@/app/components/utils/payConfirmModal';

interface StripePaymentInterface {
  totalPrice: number;
  eventId: string;
  fee: number;
}

interface FormInputInterface {
  totalPrice: number;
  eventId: string;
  clientSecret: string;
  fee: number;
}

const stripeGet = new Stripe(STRIPE_SECRET_KEY);
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const americanExpressSVG = "/svg/american_express.svg";
const jcbSVG = "/svg/jcb.svg";
const masterCardSVG = "/svg/mastercard.svg";
const visaSVG = "/svg/visa.svg";
const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
const textMd = 'text-md sm:text-lg md:text-xl';
const textXs = 'text-xs sm:text-sm md:text-md';
const textSm = 'text-sm sm:text-md md:text-lg';

const FormInput: React.FC<FormInputInterface> = ({ totalPrice, eventId, fee, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useIonRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const { profile } = useSelector((state: RootState) => state.auth);
  const [userId, setUserId] = useState('');
  const [last4, setLast4] = useState('');
  const [exDate, setExDate] = useState('');
  const [cardSVG, setCardSVG] = useState('');
  const [registeredCard, setRegisteredCard] = useState('');
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isPayConfirmModalVisible, setPayConfirmModalVisible] = useState(false);

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
        setRegisteredCard(result.data.creditCard);
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
        setRegisteredCard('');
        setNotification({ message: 'カードは正常に削除されました。', type: 'success' });
      } else {
        console.error(`Error deleting card: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleCancelPay = () => {
    setPayConfirmModalVisible(false);
  };

  const handleConfirmPay = async () => {
    // check whether user already participate into the event...
    const response = await fetch(`${SERVER_URL}/api/events/participate/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, eventId }),
    });

    if (response.status === 200) {
      if (registeredCard) {
        try {
          // try to pay
          const paymentMethod = await stripeGet.paymentMethods.retrieve(registeredCard as string);

          const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: registeredCard
          });

          if (result.error) {
            setNotification({message: 'カード番号に誤りがあります。', type: 'error'});
            console.log(result.error.message);
          } else if (result.paymentIntent?.status === 'succeeded') {
            try {
              const response = await fetch(`${SERVER_URL}/api/events/participate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, eventId, totalPrice, fee }),
              });
        
              if (response.status === 201) {
                setNotification({ message: '参加成功!', type: 'success' });
                router.push('/participate');
              } else {
                setNotification({ message: `イベントへの参加中にエラーが発生しました。もう一度お試しください。ステータス: ${response.status}`, type: 'error' });
              }
            } catch (error) {
              setNotification({ message: `イベントへの参加中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, type: 'error' });
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else if (elements.getElement(CardNumberElement)) {
        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) return;
  
        try {
          // Confirm the payment
          const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: cardNumberElement,
              billing_details: {
                name: cardholderName,
              },
            },
          });
    
          if (result.error) {
            setNotification({message: 'カード番号に誤りがあります。', type: 'error'});
            console.log("error related to participate and pay for event: " + result.error.message);
          } else if (result.paymentIntent?.status === 'succeeded') {
            try {
              const response = await fetch(`${SERVER_URL}/api/events/participate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, eventId, totalPrice, fee }),
              });
        
              if (response.status === 201) {
                setNotification({ message: '参加成功!', type: 'success' });
                router.push('/participate');
              } else {
                const result = await response.json();
                if (result.message === "Already participated") {
                  setNotification({ message: `このイベントはすでに予約済みです。`, type: 'success' });
                } else {
                  setNotification({ message: `イベントへの参加中にエラーが発生しました。もう一度お試しください。ステータス: ${response.status}`, type: 'error' });
                }
              }
            } catch (error) {
              setNotification({ message: `イベントへの参加中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, type: 'error' });
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setNotification({ message: 'カードを登録するか、以下のカード詳細を入力してください。', type: 'error' });      
      }
    } else {          
      setNotification({ message: `あなたはすでにこのイベントに参加しています。`, type: 'error' });
    }
    setPayConfirmModalVisible(false);
  }

  return (
    <div>
      <div className='bg-gray-100 pb-4 px-4 sm:px-6 md:px-8'>
        {registeredCard ?
          <RegisteredCard cardSVG={cardSVG} last4={last4} exDate={exDate} setDeleteConfirmModalVisible={() => setDeleteConfirmModalVisible(true)} />
          :
          <>
            <label className={`${textSm} block font-semibold text-gray-800 pt-2`}>カード登録</label>
            <div className="mt-4 bg-white rounded-md">
              <h4 className={`${textSm} text-center font-semibold py-2`}>対応ブランド</h4>
              <div className="flex justify-around pb-4">
                <img src={`${visaSVG}`} alt="Visa" className="h-12" />
                <img src={`${masterCardSVG}`} alt="MasterCard" className="h-12" />
                <img src={`${jcbSVG}`} alt="JCB" className="h-12" />
                <img src={`${americanExpressSVG}`} alt="American Express" className="h-12" />
              </div>
            </div>
            <div className="mt-4">
              <label className={`${textSm} block font-semibold text-gray-600`}>カード番号</label>
              <CardNumberElement id="card-number" className='w-full p-3 border bg-white rounded-md' options={{showIcon: true}} />
            </div>
            <div className="mt-4">
              <label className={`${textSm} block font-semibold text-gray-800`}>カード名義</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                placeholder="カード名義"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className={`${textSm} block font-semibold text-gray-600`}>有効期限</label>
              <CardExpiryElement id="card-expiry" className='w-full p-3 border bg-white rounded-md' />
            </div>
            <div className="mt-4">
              <label className={`${textSm} block font-semibold text-gray-600`}>セキュリティコード</label>
              <CardCvcElement id="card-cvc" className='w-full p-3 border bg-white rounded-md' />
            </div>
          </>
        }
        {notification && (<Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />)}
        <DeleteConfirmationModal isVisible={isDeleteConfirmModalVisible} onConfirm={handleDeleteCard} onCancel={handleCancel} />
      </div>
      <h2 className={`${textXs} text-center pt-6 px-4`}>%お支払い前の注意事項%お支払い前の注意事項%お支払い前の注意事項%お支払い前の注意事項%お支払い前の注意事項%お支払い前の注意事項%お支払い前の注意事項%お支払い前の注意事項</h2>
      <div className="mt-4 flex items-center justify-center">
        <input type="checkbox" className="form-checkbox" />
        <span className={`${textSm} ml-2 text-gray-600`}>
          <a href="" className={`text-blue-400 font-semibold`}>利用規約</a>に同意する
        </span>
      </div>
      <div className="mt-6 justify-center flex">
        <button type="button" onClick={() => setPayConfirmModalVisible(true)} className={`${textSm} mx-4 md:mx-8 w-full ${maleGradient} text-white py-2 sm:py-3 md:py-4 rounded-full hover:bg-purple-600`}>
          決済する
        </button>
      </div>
      <PayConfirmationModal totalPrice={totalPrice} isVisible={isPayConfirmModalVisible} onCancel={handleCancelPay} onConfirm={handleConfirmPay} />
    </div>
  );
};

const StripePaymentElement: React.FC<StripePaymentInterface> = ({ totalPrice, fee, eventId }) => {
  const [clientSecret, setClientSecret] = useState<string>('');

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/payments/create-payment-intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalPrice
          }),
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
  }, [eventId]);

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
      <FormInput totalPrice={totalPrice} eventId={eventId} clientSecret={clientSecret} fee={fee} />
    </Elements>
  ) : (
    <div>読み込み中...</div>
  );
};

export default StripePaymentElement;