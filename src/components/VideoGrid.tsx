'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description?: string;
}

interface VideoGridProps {
  videos: Video[];
  category: string;
}

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function VideoGrid({ videos, category }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const getThumbnailUrl = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  return (
    <>
      <div className="w-full">
        {/* Category header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
          className="mb-4"
        >
          <span
            className="text-[10px] tracking-[0.2em] uppercase text-[#050505]/40"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            {category}
          </span>
          <span
            className="text-[10px] tracking-wide text-[#050505]/30 ml-2"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {videos.length} projects
          </span>
        </motion.div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[#050505]/5">
                {/* Thumbnail */}
                <img
                  src={getThumbnailUrl(video.youtubeId)}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to hqdefault if maxresdefault doesn't exist
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play size={24} className="text-[#050505] ml-1" fill="#050505" />
                  </div>
                </div>

                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Title and Description */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3
                    className="text-sm font-medium text-white line-clamp-2"
                    style={{ fontFamily: 'var(--font-primary)' }}
                  >
                    {video.title}
                  </h3>
                  {video.description && (
                    <p
                      className="text-[10px] text-white/60 mt-1 line-clamp-1"
                      style={{ fontFamily: 'var(--font-primary)' }}
                    >
                      {video.description}
                    </p>
                  )}
                </div>

                {/* Index badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="text-xs text-white/70 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors z-20 cursor-pointer"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            {/* Video title */}
            <div className="absolute top-6 left-6">
              <h2
                className="text-lg text-white/90"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                {selectedVideo.title}
              </h2>
            </div>

            {/* Video embed */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              className="w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
