'use client';

import React, { useState } from 'react';
import { ProductResource } from '@/types/woocommerce';
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

interface ProductTabsProps {
  descriptionHtml: string;
  resources: ProductResource[];
}

export function ProductTabs({ descriptionHtml, resources }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'resources'>('description');

  const hasResources = resources && resources.length > 0;

  return (
    <div className="w-full">
      {/* Tab Headers - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('description')}
            className={`flex-1 px-6 py-3 font-medium text-sm transition-all ${
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
              className={`flex-1 px-6 py-3 font-medium text-sm transition-all ${
                activeTab === 'resources'
                  ? 'text-servi_green border-b-2 border-servi_green bg-servi_light/30'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Documentos y Recursos ({resources.length})
            </button>
          )}
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

  // Siempre es PDF (rojo)
  const colors = {
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconBg: 'bg-red-500',
    hover: 'hover:bg-red-100',
    textColor: 'text-red-700'
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
