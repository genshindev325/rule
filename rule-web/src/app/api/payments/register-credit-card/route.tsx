import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';
import User from '@/models/userModel';

export async function POST(req: NextRequest) {
    await dbConnect();
    
    const body = await req.json();
    const {
        holderId,
        holderRole,
        // holderEmail,
        cardNumber,
        holderName,
        expiresDate,
        securityCode,
     } = body;

    try {
        if(holderRole === "user"){
            const existingUser = await User.findById(holderId);
            if (existingUser) {
                const creditCards = existingUser.creditCards;
                creditCards.push({
                    cardNumber,
                    holderName,
                    expiresDate,
                    securityCode,
                });
                const updatedUser = await existingUser.updateOne({creditCards: creditCards});
                if(updatedUser){
                    return NextResponse.json({
                        success: true,
                        message: "Credit card is registered successfully"
                    }, { status: 201 });
                }else{
                    return NextResponse.json({
                        success: false,
                        message: "Credit card is not registered"
                    }, { status: 400 });
                }
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Invalid user"
                }, { status: 404 });
            }
        }
        if(holderRole === "store"){
            const existingStore = await Store.findById(holderId);
            if (existingStore) {
                const creditCards = existingStore.creditCards;
                creditCards.push({
                    cardNumber,
                    holderName,
                    expiresDate,
                    securityCode,
                });
                const updatedStore = await existingStore.updateOne({creditCards: creditCards});
                if(updatedStore){
                    return NextResponse.json({
                        success: true,
                        message: "Credit card is registered successfully"
                    }, { status: 201 });
                }else{
                    return NextResponse.json({
                        success: false,
                        message: "Credit card is not registered"
                    }, { status: 400 });
                }
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