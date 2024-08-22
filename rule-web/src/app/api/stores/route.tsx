import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';

export async function GET(req: NextRequest) {
    await dbConnect();

    try {
        const stores = await Store.find({});
        const memberStores = [
            { storeID: '1111-2222-3333-43441', monthlyRate: '5000', storeName: 'Taro Yamamoto', createdAt: 'September 20, 2023 17:00' },
            { storeID: '1111-2222-3333-43442', monthlyRate: '5000', storeName: 'Taro Sato', createdAt: 'October 12, 2023 16:00' },
            { storeID: '1111-2222-3333-43443', monthlyRate: '5000', storeName: 'Taro Iwasaki', createdAt: 'October 20, 2023 17:00' },
            { storeID: '1111-2222-3333-43444', monthlyRate: '5000', storeName: 'Taro Omae', createdAt: 'December 15, 2023 18:00' },
            { storeID: '1111-2222-3333-43445', monthlyRate: '5000', storeName: 'Hanako', createdAt: 'September 20, 2023 17:00' },
            { storeID: '1111-2222-3333-43446', monthlyRate: '5000', storeName: 'Hanako', createdAt: 'October 12, 2023 16:00' },
            { storeID: '1111-2222-3333-43447', monthlyRate: '5000', storeName: 'Hanako', createdAt: 'October 20, 2023 17:00' },
            { storeID: '1111-2222-3333-43448', monthlyRate: '5000', storeName: 'Taro Omae', createdAt: 'December 15, 2023 18:00' },
            { storeID: '1111-2222-3333-43449', monthlyRate: '5000', storeName: 'Taro Yamamoto', createdAt: 'September 20, 2023 17:00' },
            { storeID: '1111-2222-3333-43451', monthlyRate: '5000', storeName: 'Taro Sato', createdAt: 'October 12, 2023 16:00' },
            { storeID: '1111-2222-3333-43452', monthlyRate: '5000', storeName: 'Taro Iwasaki', createdAt: 'October 20, 2023 17:00' },
            { storeID: '1111-2222-3333-43453', monthlyRate: '5000', storeName: 'Taro Omae', createdAt: 'December 15, 2023 18:00' },
            { storeID: '1111-2222-3333-43454', monthlyRate: '5000', storeName: 'Taro Yamamoto', createdAt: 'September 20, 2023 17:00' },
            { storeID: '1111-2222-3333-43455', monthlyRate: '5000', storeName: 'Taro Sato', createdAt: 'October 12, 2023 16:00' },
            { storeID: '1111-2222-3333-43456', monthlyRate: '5000', storeName: 'Taro Iwasaki', createdAt: 'October 20, 2023 17:00' },
            { storeID: '1111-2222-3333-43457', monthlyRate: '5000', storeName: 'Taro Omae', createdAt: 'December 15, 2023 18:00' },
            { storeID: '1111-2222-3333-43458', monthlyRate: '5000', storeName: 'Taro Yamamoto', createdAt: 'September 20, 2023 17:00' },
            { storeID: '1111-2222-3333-43459', monthlyRate: '5000', storeName: 'Taro Sato', createdAt: 'October 12, 2023 16:00' },
            { storeID: '1111-2222-3333-43461', monthlyRate: '5000', storeName: 'Taro Iwasaki', createdAt: 'October 20, 2023 17:00' },
            { storeID: '1111-2222-3333-43462', monthlyRate: '5000', storeName: 'Taro Omae', createdAt: 'December 15, 2023 18:00' },
            { storeID: '1111-2222-3333-43463', monthlyRate: '5000', storeName: 'Taro Yamamoto', createdAt: 'September 20, 2023 17:00' },
            { storeID: '1111-2222-3333-43464', monthlyRate: '5000', storeName: 'Taro Sato', createdAt: 'October 12, 2023 16:00' },
            { storeID: '1111-2222-3333-43465', monthlyRate: '5000', storeName: 'Taro Iwasaki', createdAt: 'October 20, 2023 17:00' },
            { storeID: '1111-2222-3333-43466', monthlyRate: '5000', storeName: 'Taro Omae', createdAt: 'December 15, 2023 18:00' },
        ];
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
        return NextResponse.json({ success: true, data: store, jwt: 'jwt' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}