'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  year: number;
  thumbnail: string;
  index: number;
  total: number;
}

interface ProjectCardProps {
  project: Project;
  onPlay?: () => void;
  onCursorChange?: (variant: 'default' | 'play') => void;
}

export default function ProjectCard({ project, onPlay, onCursorChange }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onCursorChange?.('play');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onCursorChange?.('default');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onPlay}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Project thumbnail placeholder */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Placeholder image - dark atmospheric */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, rgba(20,20,25,1) 0%, rgba(35,35,40,1) 50%, rgba(25,25,30,1) 100%),
              radial-gradient(ellipse at 30% 20%, rgba(60,60,70,0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(50,50,60,0.2) 0%, transparent 50%)
            `,
          }}
        />

        {/* Abstract shape for visual interest */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-40"
          style={{
            background: 'linear-gradient(135deg, rgba(80,80,90,0.5), rgba(40,40,50,0.3))',
            borderRadius: '8px',
            transform: 'translate(-50%, -50%) rotate(12deg)',
          }}
        />

        {/* Figure silhouette */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-4 h-16 opacity-30"
          style={{
            background: 'linear-gradient(180deg, rgba(60,60,65,1), rgba(40,40,45,1))',
            borderRadius: '2px 2px 0 0',
          }}
        />
      </motion.div>

      {/* Darkening overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Scan line effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <motion.div
          className="absolute w-full h-[2px] bg-white/10"
          initial={{ top: '0%' }}
          animate={isHovered ? { top: ['0%', '100%'] } : { top: '0%' }}
          transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
        />
      </motion.div>

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top left - Index */}
      <div className="absolute top-5 left-5 flex items-baseline gap-1.5">
        <span
          className="text-lg font-semibold text-white"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          {String(project.index).padStart(2, '0')}
        </span>
        <span
          className="text-xs text-white/50"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          / {String(project.total).padStart(2, '0')}
        </span>
      </div>

      {/* Top right - Category */}
      <div className="absolute top-5 right-5">
        <span
          className="text-[10px] tracking-[0.15em] uppercase text-white/70"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          {project.category}
        </span>
      </div>

      {/* Bottom left - Project info */}
      <div className="absolute bottom-5 left-5 flex flex-col gap-1">
        <h3
          className="text-lg font-medium text-white tracking-wide"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          {project.title}
        </h3>
        <span
          className="text-[10px] tracking-[0.12em] uppercase text-white/60"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          {project.category} / {project.year}
        </span>
      </div>

      {/* Bottom right - Play button */}
      <motion.div
        className="absolute bottom-5 right-5"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <Play size={18} className="text-white ml-0.5" fill="white" />
        </div>
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </motion.div>
  );
}

export type { Project };
