'use client';

import { motion } from 'framer-motion';
import {
  Film,
  Music,
  Clapperboard,
  Box,
  Sparkles
} from 'lucide-react';

type WorkCategory = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  projectCount: number;
};

const categories: WorkCategory[] = [
  {
    id: 'commercials',
    title: 'Commercials',
    subtitle: 'Brand Stories',
    icon: Film,
    projectCount: 5,
  },
  {
    id: 'music-videos',
    title: 'Music Videos',
    subtitle: 'Motion Culture',
    icon: Music,
    projectCount: 8,
  },
  {
    id: 'film-narrative',
    title: 'Film / Narrative',
    subtitle: 'Cinematic Worlds',
    icon: Clapperboard,
    projectCount: 4,
  },
  {
    id: 'cg-compositing',
    title: 'CG Compositing',
    subtitle: 'Integrated Realities',
    icon: Box,
    projectCount: 6,
  },
  {
    id: 'post-production',
    title: 'Post Production',
    subtitle: 'Finish Everything',
    icon: Sparkles,
    projectCount: 7,
  },
];

interface WorkCategoryMenuProps {
  activeCategory: string;
  onCategorySelect: (id: string) => void;
}

export default function WorkCategoryMenu({
  activeCategory,
  onCategorySelect,
}: WorkCategoryMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-1"
    >
      {categories.map((category, index) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;

        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.6 + index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => onCategorySelect(category.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative flex items-center gap-4 px-4 py-3 rounded-xl text-left
              transition-all duration-300 group
              ${isActive ? 'text-[#050505]' : 'text-[#050505]/55 hover:text-[#050505]/75'}
            `}
          >
            {/* Active background */}
            {isActive && (
              <motion.div
                layoutId="category-active-bg"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 0 16px rgba(200, 255, 216, 0.12), inset 0 0 0 1px rgba(200, 255, 216, 0.15)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            {/* Icon container */}
            <motion.div
              animate={{ scale: isActive ? 1.1 : 1 }}
              className={`
                relative z-10 flex items-center justify-center w-10 h-10 rounded-lg
                transition-all duration-300
                ${isActive ? 'bg-white/80' : 'bg-transparent group-hover:bg-white/40'}
              `}
              style={{
                boxShadow: isActive ? '0 0 12px rgba(200, 255, 216, 0.2)' : 'none',
              }}
            >
              <Icon size={18} className="transition-transform duration-300" />
            </motion.div>

            {/* Text content */}
            <div className="relative z-10 flex flex-col">
              <span
                className={`text-sm tracking-wide transition-all duration-300 ${
                  isActive ? 'font-medium' : 'font-normal'
                }`}
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                {category.title}
              </span>
              <span
                className="text-[10px] tracking-wider uppercase opacity-50"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                {category.subtitle}
              </span>
            </div>

            {/* Hover background (non-active) */}
            {!isActive && (
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.3)' }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

export { categories };
export type { WorkCategory };
