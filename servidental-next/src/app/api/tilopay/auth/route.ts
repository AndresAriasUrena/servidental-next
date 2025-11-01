import { NextRequest, NextResponse } from 'next/server';
import { getTilopayBearerToken, validateTilopayConfig } from '@/lib/tilopay';

export async function POST(request: NextRequest) {
  try {
    // Validate configuration
    validateTilopayConfig();

    console.log('🔄 Processing TiloPay authentication request...');

    const bearerToken = await getTilopayBearerToken();

    return NextResponse.json({
      success: true,
      access_token: bearerToken,
      expires_in: 3600, // 1 hour default
    });

  } catch (error) {
    console.error('❌ TiloPay Auth API Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown authentication error';
    
    return NextResponse.json(
      {
        success: false,
        error: 'Authentication failed',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for authentication.' },
    { status: 405 }
  );
}