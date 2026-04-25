import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import OTP from '@/models/OTP';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    await connectDB();

    // 1. Rate Limiting Check (Max 3 OTPs per 10 minutes)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recentOTPsCount = await OTP.countDocuments({
      email,
      createdAt: { $gt: tenMinutesAgo }
    });

    if (recentOTPsCount >= 3) {
      return NextResponse.json({ 
        error: 'Too many requests. Please wait a few minutes before requesting a new OTP.' 
      }, { status: 429 });
    }

    // 2. Cooldown Check (60 seconds)
    const lastOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (lastOTP && (Date.now() - lastOTP.createdAt.getTime()) < 60000) {
      return NextResponse.json({ 
        error: 'Please wait 60 seconds before requesting another OTP.' 
      }, { status: 429 });
    }

    // 3. Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otpCode, 10);

    // 4. Store in DB
    await OTP.create({
      email,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      verified: false
    });

    // 5. Send Email
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'VGS Global <onboarding@resend.dev>',
        to: email,
        subject: `${otpCode} is your VGS Global verification code`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #2563EB; text-align: center;">VGS Global Verification</h2>
            <p>Hello,</p>
            <p>Use the following one-time password (OTP) to verify your email address. This code is valid for <b>5 minutes</b>.</p>
            <div style="background: #f4f7ff; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1e40af;">${otpCode}</span>
            </div>
            <p style="color: #666; font-size: 14px;">If you didn't request this code, you can safely ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999; text-align: center;">&copy; 2026 VGS Global Consultancy. All rights reserved.</p>
          </div>
        `
      });
    }

    return NextResponse.json({ message: 'OTP sent successfully' });

  } catch (error: any) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
