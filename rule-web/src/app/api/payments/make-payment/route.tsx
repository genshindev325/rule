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