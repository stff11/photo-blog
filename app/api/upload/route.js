// /app/api/upload/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../utils/mongodb';
import cloudinary from '../../../utils/cloudinary';

// Increase the body size limit for file uploads
export const runtime = 'nodejs';

export async function GET() {
  return new NextResponse('Upload API is running', { status: 200 });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ message: 'Invalid file type. Please upload an image.' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ message: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    // Convert file to base64 data URI for Cloudinary upload (no filesystem needed)
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload directly to Cloudinary using the data URI
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'uploads',
      resource_type: 'image',
    });

    // Save image details to MongoDB
    const client = await clientPromise;
    const db = client.db('my-photos');
    const collection = db.collection('photos');

    await collection.insertOne({
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      timestamp: new Date(),
    });

    return NextResponse.json({
      message: 'File uploaded successfully',
      url: result.secure_url,
      public_id: result.public_id,
    }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: error.message || 'Server error during upload' },
      { status: 500 }
    );
  }
}
