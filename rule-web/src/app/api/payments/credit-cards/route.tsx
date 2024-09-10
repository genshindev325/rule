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
     } = body;

    try {
        if(holderRole === "user"){
            const existingUser = await User.findById(holderId);
            if (existingUser) {
                const creditCards = existingUser.creditCards;
                if (creditCards) {
                    return NextResponse.json({
                        success: true,
                        data: {
                            paymentMethodId: creditCards[0].paymentMethodId,
                            cardholderName: creditCards[0].cardholderName,
                        },
                        message: ""
                    }, { status: 200 });
                } else {
                    return NextResponse.json({
                        success: false,
                        data: creditCards,
                        message: "User didn't register card."
                    }, { status: 404 });
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
                const creditCards = existingStore.creditCards;
                if (creditCards) {
                    return NextResponse.json({
                        success: true,
                        data: {
                            paymentMethodId: creditCards[0].paymentMethodId,
                            cardholderName: creditCards[0].cardholderName,
                        },
                        message: ""
                    }, { status: 200 });
                } else {
                    return NextResponse.json({
                        success: false,
                        data: creditCards,
                        message: "User didn't register card."
                    }, { status: 404 });
                }
            } else {
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

export async function DELETE(req: NextRequest) {
    await dbConnect();
    
    const body = await req.json();
    const {
        holderId,
        holderRole,
     } = body;

    try {
        if(holderRole === "user"){
            const existingUser = await Store.findByIdAndUpdate(holderId, { creditCards: [] });
            if (existingUser) {
                const creditCards = existingUser.creditCards;
                if (creditCards) {
                    return NextResponse.json({
                        success: true,
                        message: ""
                    }, { status: 200 });
                } else {
                    return NextResponse.json({
                        success: false,
                        data: creditCards,
                        message: "User didn't register card."
                    }, { status: 404 });
                }
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Invalid user"
                }, { status: 404 });
            }
        }
        if(holderRole === "store"){
            const existingStore = await Store.findByIdAndUpdate(holderId, { creditCards: [] });
            if (existingStore) {
                const creditCards = existingStore.creditCards;
                if (creditCards) {
                    return NextResponse.json({
                        success: true,
                        message: ""
                    }, { status: 200 });
                } else {
                    return NextResponse.json({
                        success: false,
                        data: creditCards,
                        message: "User didn't register card."
                    }, { status: 404 });
                }
            } else {
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