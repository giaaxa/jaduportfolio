'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { categories } from './WorkCategoryMenu';

interface MobileWorkCategoriesProps {
  activeCategory: string;
  onCategorySelect: (id: string) => void;
}

export default function MobileWorkCategories({
  activeCategory,
  onCategorySelect,
}: MobileWorkCategoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll active category into view
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const activeElement = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      const scrollLeft =
        activeRect.left -
        containerRect.left -
        containerRect.width / 2 +
        activeRect.width / 2;
      container.scrollBy({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div
      ref={scrollRef}
      className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;

        return (
          <motion.button
            key={category.id}
            ref={isActive ? activeRef : null}
            onClick={() => onCategorySelect(category.id)}
            whileTap={{ scale: 0.97 }}
            className={`
              relative flex items-center gap-2 px-4 py-2.5
              rounded-full flex-shrink-0 transition-all duration-300
              ${
                isActive
                  ? 'bg-white/80 text-[#050505] shadow-sm'
                  : 'bg-white/30 text-[#050505]/60 hover:bg-white/50 hover:text-[#050505]/80'
              }
            `}
            style={{
              boxShadow: isActive
                ? '0 0 12px rgba(200, 255, 216, 0.15)'
                : 'none',
            }}
          >
            <Icon size={16} />
            <span
              className={`text-xs tracking-wide whitespace-nowrap ${
                isActive ? 'font-medium' : 'font-normal'
              }`}
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              {category.title}
            </span>

            {/* Active dot indicator */}
            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-1.5 h-1.5 rounded-full bg-[#050505]/30 ml-1"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
