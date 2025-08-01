'use client';

import { useState, useEffect } from 'react';

interface WordPressDirectIframeProps {
  postId: number;
  title: string;
  content: string;
  slug?: string; // Agregar slug para URL amigable
}

export default function WordPressDirectIframe({ postId, title, content, slug }: WordPressDirectIframeProps) {
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      // Intentar usar URL amigable si tenemos slug, sino usar ID
      let wordpressUrl;
      if (slug) {
        // Usar la URL amigable exacta como en el ejemplo
        wordpressUrl = `https://wp.servidentalcr.com/${slug}/`;
      } else {
        // Fallback a ID si no hay slug
        wordpressUrl = `https://wp.servidentalcr.com/?p=${postId}`;
      }
      
      console.log('URL de WordPress:', wordpressUrl);
      console.log('Slug del post:', slug);
      console.log('ID del post:', postId);
      
      setIframeUrl(wordpressUrl);
      setIsLoading(false);
    } catch (err) {
      console.error('Error creando iframe directo:', err);
      setError('Error al crear iframe directo');
      setIsLoading(false);
    }
  }, [postId, slug]);

  return (
    <div className="wordpress-direct-iframe-container">
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-servi_green"></div>
          <span className="ml-3 text-gray-600">Cargando página de WordPress...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
      
      {iframeUrl && (
        <div className="relative">      
          <iframe
            src={iframeUrl}
            className="w-full min-h-screen border-0"
            onLoad={() => setIsLoading(false)}
            title={title}
            style={{
              border: 'none',
              width: '100%',
              minHeight: '800px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      )}
    </div>
  );
} 