'use client';

import { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { Facebook, MessageCircle, Linkedin } from 'lucide-react';

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export function ShareButton({ url, title, description = '', className = '' }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareData = {
    title,
    text: description,
    url
  };

  const handleNativeShare = async () => {
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${url}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      url: shareUrls.whatsapp,
      icon: MessageCircle,
      color: 'text-green-600 hover:bg-green-50'
    },
    {
      name: 'Facebook',
      url: shareUrls.facebook,
      icon: Facebook,
      color: 'text-blue-600 hover:bg-blue-50'
    },
    {
      name: 'LinkedIn',
      url: shareUrls.linkedin,
      icon: Linkedin,
      color: 'text-blue-700 hover:bg-blue-50'
    }
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleNativeShare}
        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <ShareIcon className="w-4 h-4" />
        Compartir producto
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share options */}
          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-20 min-w-[200px]">
            <div className="text-sm font-medium text-gray-900 px-3 py-2 border-b border-gray-100">
              Compartir en:
            </div>
            <div className="space-y-1 mt-2">
              {shareOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${option.color}`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {option.name}
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}