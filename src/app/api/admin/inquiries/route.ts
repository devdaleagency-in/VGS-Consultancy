import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Inquiry from '@/models/Inquiry';

export async function GET(req: NextRequest) {
  const password = req.nextUrl.searchParams.get('password');

  if (password !== 'vgs-admin-2024') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error: any) {
    console.error('Fetch inquiries error:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id, password } = await req.json();

  if (password !== 'vgs-admin-2024') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    await Inquiry.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Inquiry deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
