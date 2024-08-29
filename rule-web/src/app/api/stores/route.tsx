import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';

export async function GET(req: NextRequest) {
    await dbConnect();

    try {
        const stores = await Store.find({});
        return NextResponse.json({ success: true, data: stores }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    
    const body = await req.json();
    const { email } = body;

    try {
        const existingStore = await Store.findOne({ email });
        if (existingStore) {
            return NextResponse.json({ success: false, message: 'Store already exists' }, { status: 400 });
        }

        const store = await Store.create(body);
        return NextResponse.json({
            success: true,
            data: {
                email: email,
                role: "store",
                profile: store,
                token: "jwt",
            },
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}