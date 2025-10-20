'use client';

import React, { useState } from 'react';
import { ProductResource } from '@/types/woocommerce';
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { ProductReviews } from './ProductReviews';

interface ProductTabsProps {
  descriptionHtml: string;
  resources: ProductResource[];
  productId: number;
  reviewCount: number;
}

export function ProductTabs({ descriptionHtml, resources, productId, reviewCount }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'reviews'>('description');

  const hasResources = resources && resources.length > 0;

  return (
    <div className="w-full overflow-x-hidden">
      {/* Tab Headers - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          <button
            onClick={() => setActiveTab('description')}
            className={`flex-1 min-w-fit px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'description'
                ? 'text-servi_green border-b-2 border-servi_green bg-servi_light/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Descripción
          </button>

          {hasResources && (
            <button
              onClick={() => setActiveTab('resources')}
              className={`flex-1 min-w-fit px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'resources'
                  ? 'text-servi_green border-b-2 border-servi_green bg-servi_light/30'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span className="hidden sm:inline">Documentos y Recursos ({resources.length})</span>
              <span className="sm:hidden">Docs ({resources.length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 min-w-fit px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'text-servi_green border-b-2 border-servi_green bg-servi_light/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Valoraciones ({reviewCount})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'description' && (
          <div className="prose prose-slate max-w-none product-description">
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          </div>
        )}

        {activeTab === 'resources' && hasResources && (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              Descarga manuales de usuario y fichas técnicas del producto.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <ProductReviews productId={productId} />
        )}
      </div>
    </div>
  );
}

/**
 * Tarjeta de recurso individual
 */
interface ResourceCardProps {
  resource: ProductResource;
}

function ResourceCard({ resource }: ResourceCardProps) {
  const { title, url, downloadUrl } = resource;

  // Colores de marca ServiDental
  const colors = {
    bg: 'bg-servi_light/50',
    border: 'border-servi_green/30',
    iconBg: 'bg-servi_green',
    hover: 'hover:bg-servi_light/70',
    textColor: 'text-servi_dark'
  };

  // Obtener dominio de la URL para mostrar
  const getDomain = (urlString: string) => {
    try {
      const urlObj = new URL(urlString);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  const domain = getDomain(url);

  return (
    <a
      href={downloadUrl || url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between p-4 ${colors.bg} border ${colors.border} rounded-lg ${colors.hover} transition-colors group`}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Icono PDF */}
        <div className={`w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <DocumentTextIcon className="w-6 h-6 text-white" />
        </div>

        {/* Título y dominio */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 group-hover:text-servi_green transition-colors">
            {title}
          </p>
          {domain && (
            <p className="text-sm text-gray-600 truncate">
              {domain}
            </p>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className={`flex items-center gap-2 ${colors.textColor} font-medium flex-shrink-0 ml-4`}>
        {downloadUrl ? (
          <>
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Descargar</span>
          </>
        ) : (
          <>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Abrir</span>
          </>
        )}
      </div>
    </a>
  );
}
