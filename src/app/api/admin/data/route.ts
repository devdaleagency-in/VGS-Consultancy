import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import connectDB from '@/lib/db';
import Content from '@/models/Content';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!type || !['success-stories', 'destinations', 'about'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  try {
    await connectDB();
    
    // 1. Try to get from MongoDB first
    const content = await Content.findOne({ type });
    if (content) {
      return NextResponse.json(content.data);
    }

    // 2. Fallback to local JSON files if not in DB yet
    let filePath = '';
    if (type === 'success-stories') {
      filePath = path.join(process.cwd(), 'src/data/success-stories.json');
    } else if (type === 'destinations') {
      filePath = path.join(process.cwd(), 'src/data/destinations.json');
    } else if (type === 'about') {
      filePath = path.join(process.cwd(), 'src/data/about.json');
    }

    const fileContent = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    console.error('Data fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
