import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/userModel';

export async function POST(req: NextRequest) {
    await dbConnect();

    const { email, password, newPassword } = await req.json();

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Check if the user exists and if the provided password matches the stored password
        if (user && (await user.comparePassword(password))) {
            // Update the store with the new password
            const updatedUser = await User.findOneAndUpdate(
                { email: email },
                { password: newPassword },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
            }

            return NextResponse.json({ success: true, message: 'User updated' }, { status: 200 });
        }

        // If password does not match
        return NextResponse.json({
            message: "Old password does not match.",
            success: false,
        }, { status: 401 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}
