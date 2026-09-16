'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Album {
  id: string;
  name: string;
  images: string[];
}

const albums: Album[] = [
  {
    id: 'textures',
    name: 'Textures',
    images: [
      '/photography/textures/2S0A0838.jpeg',
      '/photography/textures/2S0A0848.jpeg',
      '/photography/textures/2S0A0856.jpeg',
      '/photography/textures/2S0A0862.jpeg',
      '/photography/textures/Stone.jpeg',
      '/photography/textures/texture-screenshot-1.jpeg',
      '/photography/textures/texture-screenshot-2.jpeg',
    ],
  },
  {
    id: 'natural-rhythm',
    name: 'The Natural Rhythm',
    images: [
      '/photography/natural-rhythm/DSC08979.JPEG',
      '/photography/natural-rhythm/DSC08988.JPEG',
      '/photography/natural-rhythm/DSC08991.JPEG',
      '/photography/natural-rhythm/DSC08996.JPEG',
      '/photography/natural-rhythm/DSC09080.JPEG',
      '/photography/natural-rhythm/DSC09082.JPEG',
      '/photography/natural-rhythm/DSC09085.JPEG',
      '/photography/natural-rhythm/DSC09111.JPEG',
      '/photography/natural-rhythm/DSC09236.JPEG',
      '/photography/natural-rhythm/DSC09249.JPG',
      '/photography/natural-rhythm/DSC09258.JPEG',
      '/photography/natural-rhythm/DSC09261.JPG',
    ],
  },
  {
    id: 'cow',
    name: 'Cow',
    images: [
      '/photography/cow/2S0A0687.jpeg',
      '/photography/cow/2S0A0696-2.jpeg',
      '/photography/cow/2S0A0699-2.jpeg',
      '/photography/cow/2S0A0702-2.jpeg',
      '/photography/cow/2S0A0705-2.jpeg',
      '/photography/cow/2S0A0707-2.jpeg',
    ],
  },
];

interface FloatingImage {
  id: string;
  src: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
  velocityX: number;
  velocityY: number;
  loaded: boolean;
}

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PhotographySection() {
  const [activeAlbum, setActiveAlbum] = useState<string>('textures');
  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const currentAlbum = albums.find((a) => a.id === activeAlbum);
  const selectedImage = selectedImageIndex !== null ? currentAlbum?.images[selectedImageIndex] : null;

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null || !currentAlbum) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev + 1) % currentAlbum.images.length : 0
        );
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev - 1 + currentAlbum.images.length) % currentAlbum.images.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, currentAlbum]);

  // Initialize floating images when album changes
  useEffect(() => {
    if (!currentAlbum || currentAlbum.images.length === 0) {
      setFloatingImages([]);
      return;
    }

    // Stagger positions to avoid overlap
    const newImages: FloatingImage[] = currentAlbum.images.map((src, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      return {
        id: `${activeAlbum}-${index}`,
        src,
        x: 10 + col * 25 + (Math.random() * 10),
        y: 5 + row * 22 + (Math.random() * 8),
        rotation: -8 + Math.random() * 16,
        scale: 0.85 + Math.random() * 0.15,
        zIndex: index,
        velocityX: (Math.random() - 0.5) * 0.08,
        velocityY: (Math.random() - 0.5) * 0.08,
        loaded: false,
      };
    });

    setFloatingImages(newImages);
  }, [activeAlbum, currentAlbum]);

  // Smooth animation using requestAnimationFrame
  useEffect(() => {
    if (floatingImages.length === 0) return;

    const animate = (timestamp: number) => {
      // Throttle to ~30fps for performance
      if (timestamp - lastTimeRef.current < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = timestamp;

      setFloatingImages((prev) =>
        prev.map((img) => {
          let newX = img.x + img.velocityX;
          let newY = img.y + img.velocityY;
          let newVelocityX = img.velocityX;
          let newVelocityY = img.velocityY;

          // Bounce off boundaries
          if (newX < 2 || newX > 68) {
            newVelocityX = -newVelocityX * 0.7;
            newX = Math.max(2, Math.min(68, newX));
          }
          if (newY < 2 || newY > 60) {
            newVelocityY = -newVelocityY * 0.7;
            newY = Math.max(2, Math.min(60, newY));
          }

          // Subtle random drift
          newVelocityX += (Math.random() - 0.5) * 0.005;
          newVelocityY += (Math.random() - 0.5) * 0.005;

          // Limit velocity for smooth movement
          newVelocityX = Math.max(-0.12, Math.min(0.12, newVelocityX));
          newVelocityY = Math.max(-0.12, Math.min(0.12, newVelocityY));

          return {
            ...img,
            x: newX,
            y: newY,
            velocityX: newVelocityX,
            velocityY: newVelocityY,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [floatingImages.length, activeAlbum]);

  const handleImageClick = useCallback((e: React.MouseEvent, src: string) => {
    e.stopPropagation();
    const index = currentAlbum?.images.indexOf(src) ?? -1;
    if (index >= 0) {
      setSelectedImageIndex(index);
    }
  }, [currentAlbum]);

  const goToPrevious = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentAlbum) return;
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev - 1 + currentAlbum.images.length) % currentAlbum.images.length : 0
    );
  }, [currentAlbum]);

  const goToNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentAlbum) return;
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev + 1) % currentAlbum.images.length : 0
    );
  }, [currentAlbum]);

  const closeModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex(null);
  }, []);

  const bringToFront = useCallback((id: string) => {
    setFloatingImages((prev) => {
      const maxZ = Math.max(...prev.map((img) => img.zIndex));
      return prev.map((img) =>
        img.id === id ? { ...img, zIndex: maxZ + 1 } : img
      );
    });
  }, []);

  const markAsLoaded = useCallback((id: string) => {
    setFloatingImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, loaded: true } : img
      )
    );
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 h-full w-full">
      {/* Album selector */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="flex lg:flex-col gap-2 lg:gap-3 lg:w-48 flex-shrink-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
      >
        <span
          className="hidden lg:block text-[10px] tracking-[0.2em] uppercase text-[#050505]/40 mb-2"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          Albums
        </span>
        {albums.map((album) => (
          <button
            key={album.id}
            onClick={() => setActiveAlbum(album.id)}
            className={`
              px-4 py-2.5 rounded-lg text-left transition-all duration-200 flex-shrink-0 cursor-pointer
              ${
                activeAlbum === album.id
                  ? 'bg-[#050505]/[0.06] text-[#050505]'
                  : 'text-[#050505]/50 hover:text-[#050505]/80 hover:bg-[#050505]/[0.02]'
              }
            `}
          >
            <span
              className="text-sm tracking-wide block"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              {album.name}
            </span>
            <span
              className="text-[10px] text-[#050505]/40 mt-0.5 block"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {album.images.length} photos
            </span>
          </button>
        ))}
      </motion.div>

      {/* Scattered images area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 relative min-h-[400px] lg:min-h-[500px] overflow-hidden rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.3)' }}
      >
        {floatingImages.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[#050505]/30 text-sm"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Coming Soon
            </span>
          </div>
        ) : (
          <>
            {floatingImages.map((img, index) => (
              <div
                key={img.id}
                className="absolute cursor-pointer group will-change-transform"
                style={{
                  transform: `translate(${img.x}%, ${img.y}%) rotate(${img.rotation}deg) scale(${img.scale})`,
                  zIndex: img.zIndex,
                  transition: 'transform 0.1s linear',
                }}
                onClick={(e) => {
                  bringToFront(img.id);
                  handleImageClick(e, img.src);
                }}
              >
                <div
                  className="relative"
                  style={{
                    opacity: img.loaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-out',
                  }}
                >
                  <img
                    src={img.src}
                    alt=""
                    loading="lazy"
                    onLoad={() => markAsLoaded(img.id)}
                    className="w-32 h-24 sm:w-40 sm:h-30 md:w-48 md:h-36 lg:w-56 lg:h-42 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-200"
                    draggable={false}
                  />
                  <div className="absolute inset-0 rounded-lg border border-white/20 pointer-events-none" />
                </div>
                {!img.loaded && (
                  <div className="w-32 h-24 sm:w-40 sm:h-30 md:w-48 md:h-36 lg:w-56 lg:h-42 bg-[#050505]/5 rounded-lg animate-pulse" />
                )}
              </div>
            ))}
          </>
        )}

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #050505 1px, transparent 1px), linear-gradient(to bottom, #050505 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </motion.div>

      {/* Fullscreen image modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={closeModal}
          >
            {/* Previous button */}
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/60 hover:text-white transition-colors z-20 cursor-pointer"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Image */}
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="max-w-[80vw] max-h-[80vh] object-contain rounded-lg cursor-default"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            {/* Next button */}
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/60 hover:text-white transition-colors z-20 cursor-pointer"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors z-20 cursor-pointer"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image counter */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-wide"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {selectedImageIndex !== null ? selectedImageIndex + 1 : 0} / {currentAlbum?.images.length || 0}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
