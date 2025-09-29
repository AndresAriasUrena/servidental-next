import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken, validateTilopayConfig } from '@/lib/tilopay';

export async function POST() {
  try {
    console.log('🧪 Testing TiloPay authentication...');

    // Validate configuration first
    try {
      validateTilopayConfig();
      console.log('✅ TiloPay configuration is valid');
    } catch (configError) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Configuration error',
          details: configError instanceof Error ? configError.message : 'Invalid configuration'
        },
        { status: 400 }
      );
    }

    // Test authentication
    const token = await getAccessToken();
    
    return NextResponse.json({
      success: true,
      message: 'TiloPay authentication successful',
      hasToken: !!token,
      tokenLength: token.length,
      tokenPreview: `${token.substring(0, 10)}...${token.substring(token.length - 10)}`
    });

  } catch (error) {
    console.error('❌ TiloPay Auth Test Failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Authentication test failed',
        details: error instanceof Error ? error.message : 'Unknown authentication error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to test authentication.' },
    { status: 405 }
  );
}