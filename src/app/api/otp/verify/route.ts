import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import OTP from '@/models/OTP';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    await connectDB();

    // 1. Find the most recent OTP record for this email
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return NextResponse.json({ error: 'No OTP found for this email' }, { status: 404 });
    }

    if (otpRecord.verified) {
      return NextResponse.json({ error: 'Email already verified' }, { status: 400 });
    }

    // 2. Check Expiry
    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    // 3. Verify Hash
    const isValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // 4. Mark as Verified
    otpRecord.verified = true;
    await otpRecord.save();

    return NextResponse.json({ message: 'Email verified successfully' });

  } catch (error: any) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
