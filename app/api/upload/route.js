// /app/api/upload/route.js
import { NextResponse } from 'next/server';
import { promises as fsPromises } from 'fs';
import clientPromise from '../../../utils/mongodb';
import cloudinary from '../../../utils/cloudinary';
import path from 'path';

export async function GET() {
  return new NextResponse('Test route', { status: 200 });
}

export async function POST(request) {
  try {
    // Parse formData from the request
    const formData = await request.formData();
    const file = formData.get('file'); // Extract the file from formData

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Convert the file to a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Save the file to the public/images folder
    const filePath = path.join(process.cwd(), 'public/images', file.name);
    await fsPromises.writeFile(filePath, buffer);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('my-photos');
    const collection = db.collection('photos');

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads',
    });

    // Save image details to MongoDB
    await collection.insertOne({
      url: result.secure_url,
      public_id: result.public_id,
      timestamp: new Date(),
    });

    // Clean up the locally saved file
    await fsPromises.unlink(filePath);

    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}