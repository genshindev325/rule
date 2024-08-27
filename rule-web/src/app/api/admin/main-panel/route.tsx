import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Store from '@/models/storeModel';

export async function GET(req: NextRequest) {
    //await dbConnect();

    try {
        const lastMonthSales = 12345;
        const thisMonthSales = 234567;
        
        return NextResponse.json({
            lastMonthSales: lastMonthSales,
            thisMonthSales: thisMonthSales
            }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}