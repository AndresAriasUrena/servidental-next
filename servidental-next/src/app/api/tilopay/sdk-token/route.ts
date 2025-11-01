import { NextRequest, NextResponse } from 'next/server';
import { getTilopaySDKToken, validateTilopayConfig } from '@/lib/tilopay';

export async function POST(request: NextRequest) {
  try {
    // Validate configuration
    validateTilopayConfig();

    console.log('🎫 Processing TiloPay SDK token request...');

    // Get SDK token directly (no Bearer needed for this endpoint)
    const sdkToken = await getTilopaySDKToken();

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