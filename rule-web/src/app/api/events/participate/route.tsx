import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import EventParticipate from '@/models/eventParticipateModel';
import Event from '@/models/eventModel';
import User from '@/models/userModel';

export async function POST(req: NextRequest) {
    await dbConnect();

    const body = await req.json();
    const {
        userId,
        eventId
    } = body;
    try {
        const alreadyParticipate = await EventParticipate.findOne(body);
        if (alreadyParticipate) {
            return NextResponse.json({ success: false, message: 'Already participated' }, { status: 400 });
        }
        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({ success: false, message: "Invalid user" }, { status: 404 });
        }
        if(user?.gender === "male"){
            const updatedEvent = await Event.findByIdAndUpdate(eventId, {$inc: {males: 1}});
            if(!updatedEvent){
                return NextResponse.json({ success: false, message: "Invalid store" }, { status: 404 });
            }
        }else if(user?.gender === "female"){
            const updatedEvent = await Event.findByIdAndUpdate(eventId, {$inc: {females: 1}});
            if(!updatedEvent){
                return NextResponse.json({ success: false, message: "Invalid store" }, { status: 404 });
            }
        }
        
        const eventParticipate = await EventParticipate.create(body);
        if(!eventParticipate)
            return NextResponse.json({ success: false, message: "Failed to participate" }, { status: 400 });
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
