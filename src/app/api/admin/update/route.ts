import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data, password } = body;

    // Simple password protection
    if (password !== 'vgs-admin-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let filePath = '';
    if (type === 'success-stories') {
      filePath = path.join(process.cwd(), 'src/data/success-stories.json');
    } else if (type === 'destinations') {
      filePath = path.join(process.cwd(), 'src/data/destinations.json');
    } else if (type === 'about') {
      filePath = path.join(process.cwd(), 'src/data/about.json');
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Update successful' });
  } catch (error) {
    console.error('Admin update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
