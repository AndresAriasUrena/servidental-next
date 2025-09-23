import { NextRequest, NextResponse } from 'next/server';
import { getTilopayBearerToken, getTilopaySDKToken, validateTilopayConfig } from '@/lib/tilopay';

export async function POST(request: NextRequest) {
  try {
    // Validate configuration
    validateTilopayConfig();

    console.log('🎫 Processing TiloPay SDK token request...');

    // Step 1: Get Bearer token
    const bearerToken = await getTilopayBearerToken();

    // Step 2: Get SDK token using Bearer token
    const sdkToken = await getTilopaySDKToken(bearerToken);

    return NextResponse.json({
      success: true,
      token: sdkToken,
      message: 'SDK token generated successfully',
    });

  } catch (error) {
    console.error('❌ TiloPay SDK Token API Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown SDK token error';
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate SDK token',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for SDK token generation.' },
    { status: 405 }
  );
}