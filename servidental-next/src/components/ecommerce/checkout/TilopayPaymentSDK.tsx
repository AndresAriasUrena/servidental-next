'use client';

import React, { useState, useEffect } from 'react';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  sku?: string;
}

interface TilopayPaymentLinkProps {
  customerInfo: CustomerInfo;
  cart: {
    items: CartItem[];
    total: number;
  };
  orderId?: string;
}

export default function TilopayPaymentLink({ customerInfo, cart }: TilopayPaymentLinkProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');

  // Generate order number on component mount
  useEffect(() => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const newOrderNumber = `SRV-${timestamp}-${random}`;
    setOrderNumber(newOrderNumber);
  }, []);

  const handleTilopayPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🚀 Starting TiloPay Payment Link flow...');
      
      // Step 1: Get comprehensive checkout data from localStorage
      const checkoutFormData = localStorage.getItem('checkout-form-data');
      let customerNote = '';
      let personalInfo = null;
      let shippingOption = 'messenger';
      let shippingOtherDetails = '';
      let contactData = null;
      
      if (checkoutFormData) {
        try {
          const formData = JSON.parse(checkoutFormData);
          customerNote = formData.customer_note || '';
          personalInfo = formData.personal_info || null;
          shippingOption = formData.shipping_option || 'messenger';
          shippingOtherDetails = formData.shipping_other_details || '';
          contactData = formData.contact_data || null;
        } catch (e) {
          console.log('Could not parse checkout form data from localStorage');
        }
      }

      // Step 2: Create WooCommerce order first (optional but recommended)
      console.log('📦 Creating WooCommerce order...');
      
      const orderResponse = await fetch('/api/woocommerce/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo: customerInfo,
          cartItems: cart.items,
          total: cart.total,
          paymentMethod: 'TiloPay',
          tilopayOrderNumber: orderNumber,
          customer_note: customerNote, // Include customer notes
          personal_info: personalInfo, // Include all new structured data
          shipping_option: shippingOption, // Include shipping preference
          shipping_other_details: shippingOtherDetails, // Include custom shipping details
          contact_data: contactData, // Include optional contact data
          billingAddress: {
            first_name: customerInfo.firstName,
            last_name: customerInfo.lastName,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address_1: customerInfo.address?.line1 || '',
            city: customerInfo.address?.city || '',
            state: customerInfo.address?.state || '',
            postcode: customerInfo.address?.postalCode || '',
            country: customerInfo.address?.country || 'CR'
          },
          shippingAddress: {
            first_name: customerInfo.firstName,
            last_name: customerInfo.lastName,
            address_1: customerInfo.address?.line1 || '',
            city: customerInfo.address?.city || '',
            state: customerInfo.address?.state || '',
            postcode: customerInfo.address?.postalCode || '',
            country: customerInfo.address?.country || 'CR'
          }
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create WooCommerce order');
      }

      const orderData = await orderResponse.json();
      const wooOrderId = orderData.order.id;
      console.log('✅ WooCommerce order created:', wooOrderId);

      // Step 2: Create TiloPay Payment Link
      console.log('💳 Creating TiloPay payment link...');
      
      const tilopayResponse = await fetch('/api/tilopay/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: cart.total,
          currency: 'USD',
          orderNumber: orderNumber,
          wooOrderId: wooOrderId,
          customerInfo: customerInfo,
          items: cart.items,
        }),
      });

      if (!tilopayResponse.ok) {
        const errorData = await tilopayResponse.json();
        console.error('❌ TiloPay payment link creation failed:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to create TiloPay payment link');
      }

      const tilopayData = await tilopayResponse.json();
      console.log('✅ TiloPay response:', tilopayData);
      
      if (tilopayData.success && tilopayData.paymentUrl) {
        console.log('🔗 Redirecting to TiloPay payment link:', tilopayData.paymentUrl);
        
        // Clear cart before redirecting since order is created
        localStorage.removeItem('servidental-cart');
        
        // Redirect to TiloPay payment page
        window.location.href = tilopayData.paymentUrl;
      } else {
        throw new Error(tilopayData.details || tilopayData.error || 'No payment URL received from TiloPay');
      }
      
    } catch (error) {
      console.error('❌ TiloPay payment process failed:', error);
      setError(error instanceof Error ? error.message : 'Error al procesar el pago');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Pagar con TiloPay</h3>
        <div className="flex items-center mb-4">
          <img 
            src="https://tilopay.com/assets/img/logo.png" 
            alt="TiloPay" 
            className="h-8 mr-3"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div>
            <p className="text-sm text-gray-600">
              Pago seguro con tarjeta de crédito o débito
            </p>
            <p className="text-xs text-gray-500">
              Total: ${cart.total.toLocaleString()} USD
            </p>
          </div>
        </div>
        
        {loading && (
          <div className="text-center py-4 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-servi_green border-t-transparent mx-auto"></div>
            <p className="mt-2 text-gray-600">Creando enlace de pago...</p>
            <p className="text-sm text-gray-500">Orden: {orderNumber}</p>
          </div>
        )}
        
        <button
          onClick={handleTilopayPayment}
          disabled={loading || !orderNumber}
          className="w-full bg-servi_green text-white py-3 px-4 rounded-md hover:bg-servi_dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              Procesando...
            </>
          ) : (
            'Pagar con TiloPay'
          )}
        </button>
        
        <p className="text-xs text-gray-500 mt-3 text-center">
          Serás redirigido a la página segura de TiloPay para completar el pago
        </p>
      </div>

      {/* Security and payment info */}
      <div className="text-sm text-gray-500 space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Pago seguro procesado por TiloPay</span>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 text-xs">
            <span>✓ Tarjetas Visa</span>
            <span>✓ Tarjetas Mastercard</span>
            <span>✓ Transferencias bancarias</span>
          </div>
        </div>
        
        {orderNumber && (
          <div className="text-center text-xs text-gray-400">
            Orden: {orderNumber}
          </div>
        )}
      </div>
    </div>
  );
}