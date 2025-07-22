'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { BillingAddress, ShippingAddress } from '@/types/woocommerce';

interface CheckoutFormData {
  billing: BillingAddress;
  shipping: ShippingAddress;
  payment_method: string;
  customer_note: string;
  terms_accepted: boolean;
}

export function Checkout() {
  const { cart, clearCart } = useCart();
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
    payment_method: 'cod',
    customer_note: '',
    terms_accepted: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useShippingForBilling, setUseShippingForBilling] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms_accepted) {
      alert('Debe aceptar los términos y condiciones');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Aquí iría la lógica para crear la orden en WooCommerce
      console.log('Creating order with:', { formData, cart });
      
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Limpiar carrito después de orden exitosa
      clearCart();
      
      // Redirigir a página de éxito
      window.location.href = '/checkout/success';
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al procesar la orden. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
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
          {/* Billing & Shipping Info */}
          <div className="space-y-8">
            {/* Billing Address */}
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

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Dirección de envío
              </h2>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useShippingForBilling}
                    onChange={(e) => setUseShippingForBilling(e.target.checked)}
                    className="mr-2"
                  />
                  Usar la misma dirección para facturación y envío
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Dirección línea 1 *"
                  required
                  value={formData.shipping.address_1}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, address_1: e.target.value },
                    ...(useShippingForBilling && {
                      billing: { ...prev.billing, address_1: e.target.value }
                    })
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2 md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Dirección línea 2 (opcional)"
                  value={formData.shipping.address_2}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, address_2: e.target.value },
                    ...(useShippingForBilling && {
                      billing: { ...prev.billing, address_2: e.target.value }
                    })
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
                    shipping: { ...prev.shipping, city: e.target.value },
                    ...(useShippingForBilling && {
                      billing: { ...prev.billing, city: e.target.value }
                    })
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
                    shipping: { ...prev.shipping, state: e.target.value },
                    ...(useShippingForBilling && {
                      billing: { ...prev.billing, state: e.target.value }
                    })
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
                    shipping: { ...prev.shipping, postcode: e.target.value },
                    ...(useShippingForBilling && {
                      billing: { ...prev.billing, postcode: e.target.value }
                    })
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2 md:col-span-2"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Método de pago
              </h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-md">
                  <input
                    type="radio"
                    name="payment_method"
                    value="cod"
                    checked={formData.payment_method === 'cod'}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      payment_method: e.target.value
                    }))}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Contra entrega</div>
                    <div className="text-sm text-gray-500">
                      Paga en efectivo al recibir tu pedido
                    </div>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-md opacity-50">
                  <input
                    type="radio"
                    name="payment_method"
                    value="card"
                    disabled
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Tarjeta de crédito/débito</div>
                    <div className="text-sm text-gray-500">
                      Próximamente disponible
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Notes */}
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

          {/* Order Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Resumen del pedido
              </h2>
              
              <div className="space-y-3 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₡{item.subtotal.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₡{cart.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>Por calcular</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₡{cart.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    checked={formData.terms_accepted}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      terms_accepted: e.target.checked
                    }))}
                    className="mr-2 mt-1"
                  />
                  <span className="text-sm text-gray-600">
                    He leído y acepto los{' '}
                    <a href="/terms" className="text-servi_green hover:underline">
                      términos y condiciones
                    </a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.terms_accepted}
                className="w-full mt-6 bg-servi_green text-white py-3 px-4 rounded-md hover:bg-servi_dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Procesando...' : 'Realizar pedido'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}