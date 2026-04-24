import { NextResponse } from 'next/server';
import { put, del, list } from '@vercel/blob';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    if (password !== 'vgs-admin-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { blobs } = await list();
    
    // Map blobs to the expected dashboard format
    const stats = blobs.map((blob) => ({
      name: blob.pathname,
      url: blob.url,
      size: blob.size,
      mtime: blob.uploadedAt,
      type: blob.pathname.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image'
    }));

    return NextResponse.json(stats.sort((a, b) => new Date(b.mtime).getTime() - new Date(a.mtime).getTime()));
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

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true, // Prevents collisions
    });

    return NextResponse.json({ 
      message: 'Upload successful',
      url: blob.url
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { url, password } = await request.json(); // Use URL for deletion in Blob

    if (password !== 'vgs-admin-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    await del(url);

    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
