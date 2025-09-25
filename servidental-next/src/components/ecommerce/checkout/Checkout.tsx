'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { BillingAddress, ShippingAddress } from '@/types/woocommerce';
import { formatPrice } from '@/utils/currency';
import TilopayPaymentSDK from './TilopayPaymentSDK';

interface CheckoutFormData {
  billing: BillingAddress;
  shipping: ShippingAddress;
  payment_method: string;
  customer_note: string;
}

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [showTilopayCheckout, setShowTilopayCheckout] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    billing: {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: 'CR',
      email: '',
      phone: ''
    },
    shipping: {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: 'CR'
    },
    payment_method: 'tilopay',
    customer_note: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem('checkout-form-data', JSON.stringify(formData));
    setShowTilopayCheckout(true);
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          No hay productos en el carrito
        </h1>
        <p className="text-gray-600 mb-8">
          Agrega algunos productos antes de proceder al checkout
        </p>
        <a
          href="/products"
          className="bg-servi_green text-white px-6 py-3 rounded-md hover:bg-servi_dark transition-colors"
        >
          Ver productos
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Información de facturación
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre *"
                  required
                  value={formData.billing.first_name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    billing: { ...prev.billing, first_name: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Apellidos *"
                  required
                  value={formData.billing.last_name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    billing: { ...prev.billing, last_name: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.billing.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    billing: { ...prev.billing, email: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2 md:col-span-2"
                />
                <input
                  type="tel"
                  placeholder="Teléfono *"
                  required
                  value={formData.billing.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    billing: { ...prev.billing, phone: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Empresa (opcional)"
                  value={formData.billing.company}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    billing: { ...prev.billing, company: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Dirección de envío
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Dirección línea 1 *"
                  required
                  value={formData.shipping.address_1}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, address_1: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2 md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Dirección línea 2 (opcional)"
                  value={formData.shipping.address_2}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, address_2: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2 md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Ciudad *"
                  required
                  value={formData.shipping.city}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, city: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Provincia *"
                  required
                  value={formData.shipping.state}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, state: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Código postal *"
                  required
                  value={formData.shipping.postcode}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, postcode: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2 md:col-span-2"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Método de pago
              </h2>
              <div className="p-3 border border-gray-300 rounded-md bg-gray-50">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment_method"
                    value="tilopay"
                    checked={formData.payment_method === 'tilopay'}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      payment_method: e.target.value
                    }))}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Tarjeta de crédito/débito (TiloPay)</div>
                    <div className="text-sm text-gray-500">
                      Pago seguro con tarjeta a través de TiloPay
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Notas del pedido
              </h2>
              <textarea
                placeholder="Notas sobre tu pedido (opcional)"
                rows={4}
                value={formData.customer_note}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  customer_note: e.target.value
                }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Resumen del pedido
              </h2>
              
              <div className="space-y-3 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{formatPrice(item.subtotal)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>Por calcular</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-servi_green text-white py-3 px-4 rounded-md hover:bg-servi_dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Procesando...' : 'Realizar pedido'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {showTilopayCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 relative">
            <button
              onClick={() => setShowTilopayCheckout(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <TilopayPaymentSDK
              customerInfo={{
                firstName: formData.billing.first_name,
                lastName: formData.billing.last_name,
                email: formData.billing.email,
                phone: formData.billing.phone,
                address: {
                  line1: formData.shipping.address_1,
                  line2: formData.shipping.address_2,
                  city: formData.shipping.city,
                  state: formData.shipping.state,
                  postalCode: formData.shipping.postcode,
                  country: formData.shipping.country,
                },
              }}
              cart={{
                items: cart.items.map(item => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  sku: item.sku,
                })),
                total: cart.total,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}