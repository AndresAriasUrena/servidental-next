'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

export default function CouponInput() {
  const { cart, applyCoupon, removeCoupon, isLoading } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = await applyCoupon(couponCode);

    if (result.success) {
      setSuccess('¡Cupón aplicado exitosamente!');
      setCouponCode('');
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.error || 'Error al aplicar el cupón');
    }
  };

  const handleRemoveCoupon = (code: string) => {
    removeCoupon(code);
    setError('');
    setSuccess('');
  };

  return (
    <div className="space-y-4">
      {cart.appliedCoupons.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Cupón aplicado:</h3>
          {cart.appliedCoupons.map((coupon) => (
            <div
              key={coupon.code}
              className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-2"
            >
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-green-900">{coupon.code}</p>
                  <p className="text-sm text-green-700">
                    {coupon.discountType === 'percent'
                      ? `${coupon.amount}% de descuento`
                      : `₡${parseFloat(coupon.amount).toLocaleString('es-CR')} de descuento`
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveCoupon(coupon.code)}
                className="text-red-600 hover:text-red-800 transition-colors"
                aria-label="Remover cupón"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Coupon Input Form - Only show if no coupon applied */}
      {cart.appliedCoupons.length === 0 && (
        <form onSubmit={handleApplyCoupon} className="space-y-2">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Código de cupón"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-servi_green focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !couponCode.trim()}
              className="px-6 py-2 bg-servi_green text-white font-medium rounded-lg hover:bg-servi_dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Aplicando...' : 'Aplicar'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center space-x-2 text-green-600 text-sm bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{success}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
