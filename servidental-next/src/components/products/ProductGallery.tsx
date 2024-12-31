'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { ProductImage } from '@/types/product';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/types/product';
import { StaticImageData } from 'next/image';

type CarouselItem = 
  | ProductImage
  | { type: 'video'; iframe: string };

interface ProductGalleryProps {
  images: ProductImage[];
  product: Product;
}

function isVideoItem(item: CarouselItem): item is { type: 'video'; iframe: string } {
  return 'type' in item && item.type === 'video';
}

function getImageUrl(src: string | StaticImageData): string {
  if (typeof src === 'string') return src;
  return src.src;
}

export default function ProductGallery({ images, product }: ProductGalleryProps) {
  const carouselItems: CarouselItem[] = [
    ...images,
    ...(product.videoIframe ? [{ type: 'video' as const, iframe: product.videoIframe }] : []),
  ];

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const nextItem = () => {
    setCurrentItemIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const previousItem = () => {
    setCurrentItemIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const slides = images.map(image => ({
    src: getImageUrl(image.url),
    alt: image.alt,
    width: image.width,
    height: image.height,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <div className="h-full w-full relative">
            {carouselItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: index === currentItemIndex ? 1 : 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  position: index === currentItemIndex ? 'relative' : 'absolute',
                  visibility: index === currentItemIndex ? 'visible' : 'hidden',
                }}
                className="h-full w-full"
              >
                {isVideoItem(item) ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.iframe,
                    }}
                    className="h-full w-full"
                  />
                ) : (
                  <div onClick={() => setOpen(true)} className="cursor-zoom-in w-full h-full">
                    <Image
                      src={item.url}
                      alt={item.alt}
                      className="h-full w-full object-contain"
                      width={item.width}
                      height={item.height}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {carouselItems.length > 1 && (
          <>
            <button
              onClick={previousItem}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextItem}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {carouselItems.length > 1 && (
        <div className="flex gap-4 overflow-x-auto">
          {carouselItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentItemIndex(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
                index === currentItemIndex ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'
              }`}
            >
              {isVideoItem(item) ? (
                <div className="flex items-center justify-center bg-gray-200 h-full w-full">
                  🎥 Video
                </div>
              ) : (
                <Image
                  src={item.url}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  width={80}
                  height={80}
                />
              )}
            </button>
          ))}
        </div>
      )}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Zoom]}
        index={currentItemIndex}
      />
    </div>
  );
}