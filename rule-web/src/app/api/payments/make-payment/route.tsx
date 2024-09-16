import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';
import User from '@/models/userModel';

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
    await dbConnect();
    
    const body = await req.json();
    const {
        holderId,
        holderRole,
        cardNumber,
        totalPrice,
     } = body;

    try {
        if(holderRole === "user"){
            const existingUser = await User.findById(holderId);
            if (existingUser) {
                // Create a PaymentIntent with the order amount and currency
                const payIntent = await stripe.paymentIntents.create({
                    amount: totalPrice,
                    currency: "jpy",
                });
                const clientSecret = payIntent.client_secret;

                // Confirm the payment
                const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                  payment_method: {
                    card: cardNumber,
                  },
                });

                if (error) {
                    return NextResponse.json({
                        success: false,
                        message: error.message
                    }, { status: 404 });
                } else if (paymentIntent?.status === 'succeeded') {
                    return NextResponse.json({
                        success: true,
                        message: "Pay successfully"
                    }, { status: 200 });
                }
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Invalid user"
                }, { status: 404 });
            }
        }
        if(holderRole === "store"){
            const existingStore = await Store.findById(holderId);
            if (existingStore) {
                
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Invalid store"
                }, { status: 404 });
            }
        }
        
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}