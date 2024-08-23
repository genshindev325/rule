import { NextRequest, NextResponse } from 'next/server'

import upload from '@/lib/multer';

export async function POST(req: NextRequest) {

    //const body = await req.json();
    try {
      upload.single('photo');
      
      return NextResponse.json({ success: true, message: "Uploaded successfully" }, { status: 201 });
    } catch (error) {
      console.log(error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
