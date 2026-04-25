import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
import connectDB from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import { Resend } from 'resend';
import { AdminEmailTemplate, UserEmailTemplate } from '@/components/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@vgs.ind.in';

export async function POST(req: NextRequest) {
  console.log('Incoming inquiry request...');
  
  try {
    // 1. Parse Body safely
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { name, email, phone, country, course, visaType, message } = body;

    // 2. Basic Validation
    if (!name || !email || !phone || !country || !course || !visaType || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // 3. Environment Check
    if (!process.env.MONGODB_URI) {
      console.error('CRITICAL: MONGODB_URI is missing from environment');
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 });
    }

    // 4. Connect to MongoDB and Save
    try {
      console.log('Connecting to database...');
      await connectDB();
      console.log('Saving inquiry...');
      const newInquiry = await Inquiry.create({
        name,
        email,
        phone,
        country,
        course,
        visaType,
        message,
      });
      console.log('Inquiry saved successfully:', newInquiry._id);

      // 5. Send Emails (Admin Notification & User Confirmation)
      if (process.env.RESEND_API_KEY) {
        console.log('Attempting to send notification emails...');
        
        try {
          const [adminRes, userRes] = await Promise.all([
            resend.emails.send({
              from: 'VGS Global <onboarding@resend.dev>',
              to: ADMIN_EMAIL,
              subject: `New Inquiry: ${name} - ${country}`,
              react: React.createElement(AdminEmailTemplate, { name, email, phone, country, course, visaType, message }),
            }),
            resend.emails.send({
              from: 'VGS Global <onboarding@resend.dev>',
              to: email,
              subject: 'We received your inquiry - VGS Global',
              react: React.createElement(UserEmailTemplate, { name }),
            })
          ]);

          if (adminRes.error) console.error('Admin Email Failed:', adminRes.error);
          if (userRes.error) console.error('User Email Failed:', userRes.error);
        } catch (emailError) {
          console.error('Email Error:', emailError);
        }
      }

      return NextResponse.json(
        { message: 'Inquiry submitted successfully', id: newInquiry._id },
        { status: 201 }
      );

    } catch (dbError: any) {
      console.error('Database Error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed', details: dbError.message },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Unexpected Global Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
