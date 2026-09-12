'use client';

import { useRef, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Home,
  Folder,
  PlayCircle,
  Image,
  User,
  Mail,
  Database
} from 'lucide-react';

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'work', label: 'Work', icon: Folder },
  { id: 'reel', label: 'Reel', icon: PlayCircle },
  { id: 'stills', label: 'Stills', icon: Image },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'archive', label: 'Archive', icon: Database },
];

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface XMBNavigationProps {
  activeItem: string;
  onItemSelect: (id: string) => void;
}

export default function XMBNavigation({ activeItem, onItemSelect }: XMBNavigationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll active item into view on mobile
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const activeElement = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      const scrollLeft = activeRect.left - containerRect.left - (containerRect.width / 2) + (activeRect.width / 2);
      container.scrollBy({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeItem]);

  const navVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.3, ease: easeOutExpo }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.4 + i * 0.05,
        ease: easeOutExpo,
      },
    }),
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-full"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Scrollable container for mobile */}
      <div
        ref={scrollRef}
        className="flex items-center justify-start md:justify-center gap-1 md:gap-2 overflow-x-auto scrollbar-hide px-4 md:px-0 -mx-4 md:mx-0"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Left padding for mobile scroll */}
        <div className="flex-shrink-0 w-2 md:hidden" />

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <motion.button
              key={item.id}
              ref={isActive ? activeRef : null}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => onItemSelect(item.id)}
              className={`
                relative flex flex-col items-center gap-1.5 md:gap-2
                px-3 py-2.5 md:px-6 md:py-4
                transition-all duration-300 rounded-xl group flex-shrink-0
                ${isActive ? 'text-[#050505]' : 'text-[#050505]/50 hover:text-[#050505]/75'}
              `}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active background glow */}
              {isActive && (
                <motion.div
                  layoutId="nav-active-bg"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    boxShadow: '0 0 20px rgba(200, 255, 216, 0.15), 0 0 40px rgba(200, 255, 216, 0.05)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
                className="relative z-10"
              >
                <Icon
                  size={isActive ? 24 : 20}
                  className="transition-all duration-300 md:w-6 md:h-6"
                />
              </motion.div>

              {/* Label */}
              <span
                className={`
                  relative z-10 text-[10px] md:text-xs tracking-wide transition-all duration-300
                  ${isActive ? 'font-medium' : 'font-normal'}
                `}
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                {item.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-0.5 md:-bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#050505]"
                />
              )}

              {/* Hover glow (non-active) */}
              {!isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.4)' }}
                />
              )}
            </motion.button>
          );
        })}

        {/* Right padding for mobile scroll */}
        <div className="flex-shrink-0 w-2 md:hidden" />
      </div>
    </motion.nav>
  );
}
