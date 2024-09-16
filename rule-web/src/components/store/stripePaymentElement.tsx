// components/StripePaymentElement.tsx
import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Notification from '@/utils/notification';
import DeleteConfirmationModal from '@/components/utils/deleteConfirmModal';
import Stripe from "stripe";

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
const stripeGet = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const FormInput: React.FC = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handleCancel = () => {
    setDeleteConfirmModalVisible(false);
  };

  // Fetch registered card details
  const fetchRegisteredCard = async () => {
    try {
      const response = await fetch('/api/payments/credit-cards', {
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

  if (!elements || !stripe) return;

  const handleDeleteCard = async () => {
    setDeleteConfirmModalVisible(false);
    try {
      const response = await fetch('/api/payments/credit-cards', {
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

    if (error) {
      console.log(error);
      setIsProcessing(false);
      return;
    }

    const response = await fetch('/api/payments/register-credit-card', {
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
      setIsProcessing(false);
      setRegisteredCard(result.data);
      fetchRegisteredCard();
      setNotification({ message: '支払い方法が正常に登録されました', type: 'success' });
      setTimeout(() => {
        // router.push('/store/setting');
      }, 2000);
    } else {
      console.error('Error saving payment method:', result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto text-gray-800">
      <h3 className='font-semibold py-2'>登録済みカード</h3>
      { registeredCard &&
        <div className="mb-4 w-full p-3 gap-3 bg-gray-100 rounded-md flex flex-col">
          <div className='flex flex-col'>
            <h3 className='text-black text-lg'>{`****_****_****_${last4}`}</h3>
            {cardSVG && <img src={`${cardSVG}`} alt="Visa" className="h-10 sm:h-12 mr-auto" />}
            <h4 className="text-md text-left font-semibold">{exDate}</h4>
          </div>
          <div className='flex flex-row-reverse'>
            <button
              type="button" 
              onClick={() => setDeleteConfirmModalVisible(true)}
              className="w-20 py-1 px-4 bg-red-300 text-white rounded-md hover:bg-red-500 duration-300"
            >
              削除
            </button>
          </div>
        </div>
      }
      <h3 className='font-semibold py-4'>カード登録</h3>
      <h3 className='font-semibold py-2'>カード番号</h3>
      <div className="mb-4">
        <CardNumberElement
          id="card-number"
          className='w-full p-3 bg-gray-100 rounded-md'
          options={{showIcon: true}}
        />
      </div>
      <label className='font-semibold py-2' htmlFor="cardholder-name">カード名義</label>
      <div className="mb-4">
        <input
          type="text"
          id='cardholder-name'
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
          placeholder="カード名義"
          required
        />
      </div>
      <h3 className='font-semibold py-2'>有効期限</h3>
      <div className="mb-4">
        <CardExpiryElement
          id="card-expiry"
          className='w-full p-3 bg-gray-100 rounded-md'
        />
      </div>
      <h3 className='font-semibold py-2'>セキュリティコード</h3>
      <div className="mb-4">
        <CardCvcElement
          id="card-cvc"
          className='w-full p-3 bg-gray-100 rounded-md'
        />
      </div>
      <div className="flex flex-row space-x-4">
        <button
          type="submit"
          disabled={isProcessing}
          className={`flex-1 bg-blue-500 text-white p-2 rounded ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 duration-300'}`}
        >
          {isProcessing ? "登録中..." : "新しくカードを登録"}
        </button>
        <button type="button" className="flex-1 py-2 p-2 bg-gray-300 text-black rounded hover:bg-gray-400 duration-300">
          <a href='/store/setting'>キャンセル</a>
        </button>
      </div>
      {notification && (<Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />)}
      <DeleteConfirmationModal isVisible={isDeleteConfirmModalVisible} onConfirm={handleDeleteCard} onCancel={handleCancel} />
    </form>
  );
};

const StripePaymentElement: React.FC =({}) => {
  return (
    <Elements stripe={stripePromise}>
      <FormInput /> 
    </Elements>
  )
}

export default StripePaymentElement;
