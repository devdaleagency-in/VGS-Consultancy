import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Content from '@/models/Content';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data, password } = body;

    // Simple password protection
    if (password !== 'vgs-admin-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!type || !['success-stories', 'destinations', 'about'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    await connectDB();

    // Persist to MongoDB
    await Content.findOneAndUpdate(
      { type },
      { data },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: 'Update successful' });
  } catch (error) {
    console.error('Admin update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
