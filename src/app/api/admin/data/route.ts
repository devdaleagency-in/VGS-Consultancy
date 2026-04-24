import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

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

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
