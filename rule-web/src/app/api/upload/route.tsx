import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    return new Promise<NextResponse>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            console.error('Upload failed:', error);
            reject(NextResponse.json({ error: 'Upload failed' }, { status: 500 }));
          } else if (result) {
            resolve(NextResponse.json({ url: result.secure_url }, { status: 200 }));
          } else {
            reject(NextResponse.json({ error: 'No result from Cloudinary' }, { status: 500 }));
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
