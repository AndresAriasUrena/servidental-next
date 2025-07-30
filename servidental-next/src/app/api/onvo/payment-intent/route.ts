import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent } from '@/lib/onvo';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_ONVO_PUBLISHABLE_KEY || !process.env.ONVO_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Error de configuración: credenciales de ONVO no disponibles' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { 
      amount, 
      currency = 'CRC',
      description,
      metadata
    } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'El monto debe ser mayor a 0' },
        { status: 400 }
      );
    }

    const paymentIntent = await createPaymentIntent({
      amount: Math.round(amount), 
      currency,
      description,
      captureMethod: 'automatic'
    });

    return NextResponse.json(paymentIntent);
  } catch (error) {
    console.error('Error creando payment intent:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || 'Error al procesar el pago';
      
      return NextResponse.json(
        { error: message },
        { status }
      );
    }

    return NextResponse.json(
      { 
        error: 'Error al crear la intención de pago',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentIntentId = searchParams.get('id');

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'ID de payment intent requerido' },
        { status: 400 }
      );
    }

    const paymentIntent = await getPaymentIntent(paymentIntentId);
    return NextResponse.json(paymentIntent);
  } catch (error) {
    console.error('Error obteniendo payment intent:', error);
    return NextResponse.json(
      { error: 'Error al obtener la intención de pago' },
      { status: 500 }
    );
  }
}

import axios from 'axios';
import { getPaymentIntent } from '@/lib/onvo'; 