import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public/uploads');

// Ensure upload directory exists
const ensureDir = async () => {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    if (password !== 'vgs-admin-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await ensureDir();
    const files = await fs.readdir(uploadDir);
    
    // Filter out hidden files and sort by newest
    const stats = await Promise.all(
      files.filter(f => !f.startsWith('.')).map(async (f) => {
        const filePath = path.join(uploadDir, f);
        const s = await fs.stat(filePath);
        return {
          name: f,
          url: `/uploads/${f}`,
          size: s.size,
          mtime: s.mtime,
          type: f.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image'
        };
      })
    );

    return NextResponse.json(stats.sort((a, b) => b.mtime.getTime() - a.mtime.getTime()));
  } catch (error) {
    console.error('List error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const password = formData.get('password') as string;

    if (password !== 'vgs-admin-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    await ensureDir();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ 
      message: 'Upload successful',
      url: `/uploads/${filename}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { filename, password } = await request.json();

    if (password !== 'vgs-admin-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    const filePath = path.join(uploadDir, filename);
    await fs.unlink(filePath);

    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
