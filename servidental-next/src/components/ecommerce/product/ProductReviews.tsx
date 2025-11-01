'use client';

import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

interface Review {
  id: number;
  rating: number;
  review: string;
  verified: boolean;
  date: string;
  reviewer: string;
  reviewerAvatarUrl?: string | null;
}

interface ReviewsSummary {
  average: number;
  count: number;
}

interface ProductReviewsProps {
  productId: number;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<ReviewsSummary>({ average: 0, count: 0 });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    consent: false,
    hp: '', // Honeypot
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    loadReviews(1);
  }, [productId]);

  const loadReviews = async (pageNum: number) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await fetch(
        `/api/reviews?productId=${productId}&page=${pageNum}&per_page=10`
      );

      if (!response.ok) {
        throw new Error('Error al cargar las valoraciones');
      }

      const data = await response.json();

      setSummary(data.summary);
      setTotalPages(data.total_pages);

      if (pageNum === 1) {
        setReviews(data.data);
      } else {
        setReviews((prev) => [...prev, ...data.data]);
      }

      setPage(pageNum);
      setError(null);
    } catch (err) {
      console.error('Error loading reviews:', err);
      setError('No se pudieron cargar las valoraciones');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages && !loadingMore) {
      loadReviews(page + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar la valoración');
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        rating: 5,
        comment: '',
        consent: false,
        hp: '',
      });

      // Recargar reviews después de 2 segundos (opcional, ya que estará en hold)
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error al enviar la valoración');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => {
          const Icon = index < rating ? StarIcon : StarIconOutline;
          return (
            <Icon
              key={index}
              className={`${sizeClasses[size]} ${
                index < rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          );
        })}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
    return `Hace ${Math.floor(diffDays / 365)} años`;
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full overflow-x-hidden">
      {/* Resumen */}
      {summary.count > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{summary.average.toFixed(1)}</div>
              <div className="mt-1">{renderStars(Math.round(summary.average), 'md')}</div>
              <div className="text-sm text-gray-600 mt-2">
                {summary.count} {summary.count === 1 ? 'valoración' : 'valoraciones'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de reviews */}
      {error && !loading && (
        <div className="text-center py-8 text-gray-600">
          <p>{error}</p>
          <button
            onClick={() => loadReviews(1)}
            className="mt-4 text-servi_green hover:text-servi_dark"
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      {!error && reviews.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-600">
          <p className="mb-2">Aún no hay valoraciones para este producto.</p>
          <p className="text-sm">¡Sé el primero en compartir tu opinión!</p>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 w-full">
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {review.reviewerAvatarUrl ? (
                    <img
                      src={review.reviewerAvatarUrl}
                      alt={review.reviewer}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-servi_green text-white flex items-center justify-center font-semibold text-sm">
                      {getInitials(review.reviewer)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 break-words">{review.reviewer}</span>
                    {review.verified && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Compra verificada
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    {renderStars(review.rating, 'sm')}
                    <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                  </div>

                  <div className="mt-3 text-gray-700 whitespace-pre-wrap break-words overflow-wrap-anywhere">{review.review}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Botón Cargar más */}
          {page < totalPages && (
            <div className="text-center pt-4">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-2 border border-servi_green text-servi_green rounded-lg hover:bg-servi_green hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? 'Cargando...' : 'Cargar más valoraciones'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Formulario */}
      <div className="border-t border-gray-200 pt-8 w-full">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Escribe tu valoración</h3>

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            Gracias, tu opinión fue enviada y quedará visible cuando sea aprobada.
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot (campo oculto) */}
          <input
            type="text"
            name="hp"
            value={formData.hp}
            onChange={(e) => setFormData((prev) => ({ ...prev, hp: e.target.value }))}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <input
              type="text"
              placeholder="Nombre *"
              required
              maxLength={100}
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />

            <input
              type="email"
              placeholder="Email *"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calificación *
            </label>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, index) => {
                const rating = index + 1;
                return (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, rating }))}
                    className="focus:outline-none focus:ring-2 focus:ring-servi_green rounded"
                  >
                    <StarIcon
                      className={`w-8 h-8 ${
                        rating <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                      } hover:text-yellow-400 transition-colors`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <textarea
            placeholder="Escribe tu comentario *"
            required
            maxLength={1000}
            rows={4}
            value={formData.comment}
            onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="consent"
              required
              checked={formData.consent}
              onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
              className="mt-1"
            />
            <label htmlFor="consent" className="text-sm text-gray-600">
              Acepto que mi valoración será visible públicamente una vez aprobada *
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-servi_green text-white px-6 py-3 rounded-lg hover:bg-servi_dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Enviando...' : 'Enviar valoración'}
          </button>
        </form>
      </div>
    </div>
  );
}
