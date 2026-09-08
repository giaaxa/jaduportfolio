'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JaduLogo from './JaduLogo';
import AmbientBackground from './AmbientBackground';
import XMBNavigation from './XMBNavigation';
import WorkCategoryMenu from './WorkCategoryMenu';
import ProjectCard from './ProjectCard';
import SystemInfo from './SystemInfo';
import AudioController from './AudioController';
import MobileWorkCategories from './MobileWorkCategories';

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Sample project data
const sampleProject = {
  id: '1',
  title: 'BEYOND TOMORROW',
  category: 'Commercial',
  year: 2024,
  thumbnail: '/assets/project-placeholder.jpg',
  index: 1,
  total: 5,
};

export default function HomeScreen() {
  const [activeNav, setActiveNav] = useState('work');
  const [activeCategory, setActiveCategory] = useState('commercials');

  const showWorkSection = activeNav === 'work';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Atmospheric Background with video */}
      <AmbientBackground intensity="normal" showVideo />

      {/* Main content grid */}
      <div className="relative z-10 h-screen max-h-screen flex flex-col p-4 sm:p-5 md:p-6 lg:px-8 lg:py-4 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-start justify-between mb-2 md:mb-4 flex-shrink-0">
          {/* Left: Logo and title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
            className="flex flex-col gap-2 md:gap-3"
          >
            <JaduLogo size="small" />
            <div className="flex flex-col gap-0.5 ml-1">
              <span
                className="text-xs md:text-sm tracking-wide text-[#050505]/80"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Visual Effects Compositor
              </span>
              <span
                className="text-xs md:text-sm tracking-wide text-[#050505]/60"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                and Post Production Artist
              </span>
            </div>
          </motion.div>

          {/* Right: System info and audio control */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:block">
              <SystemInfo />
            </div>
            <AudioController />
          </div>
        </header>

        {/* Main navigation - XMB style - centered/right */}
        <div className="mb-2 md:mb-4 lg:pl-[18%] xl:pl-[22%] flex-shrink-0">
          <XMBNavigation activeItem={activeNav} onItemSelect={setActiveNav} />
        </div>

        {/* Content area - shifted right */}
        <div className="flex-1 flex flex-col lg:flex-row items-start justify-start gap-4 lg:gap-10 lg:pl-[15%] xl:pl-[18%] overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Left side - Category menu (when Work is selected) */}
            {showWorkSection && (
              <>
                {/* Desktop category menu */}
                <motion.div
                  key="desktop-category"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                  className="hidden lg:block w-[260px] flex-shrink-0"
                >
                  <WorkCategoryMenu
                    activeCategory={activeCategory}
                    onCategorySelect={setActiveCategory}
                  />
                </motion.div>

                {/* Mobile/Tablet horizontal category menu */}
                <motion.div
                  key="mobile-category"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                  className="lg:hidden w-full"
                >
                  <MobileWorkCategories
                    activeCategory={activeCategory}
                    onCategorySelect={setActiveCategory}
                  />
                </motion.div>
              </>
            )}

            {/* Right side - Project card - bigger */}
            {showWorkSection && (
              <motion.div
                key="project-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
                className="w-full lg:flex-1 lg:max-w-[720px]"
              >
                <ProjectCard project={sampleProject} />
              </motion.div>
            )}

            {/* Content for other nav items */}
            {!showWorkSection && (
              <motion.div
                key="coming-soon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center flex-1 min-h-[200px]"
              >
                <div
                  className="text-[#050505]/30 text-base md:text-lg tracking-wide"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)} — Coming Soon
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom bar - minimal, absolute positioned */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-3 left-4 right-4 md:left-6 md:right-6 lg:left-8 lg:right-8 flex items-center justify-between"
        >
          <span
            className="text-[9px] md:text-[10px] tracking-[0.1em] text-[#050505]/25"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            &copy; 2026 JADU / VISUAL EFFECTS
          </span>

          <span
            className="hidden md:block text-[9px] tracking-[0.1em] text-[#050505]/25"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            REALITY IS A BETTER CANVAS
          </span>
        </motion.footer>
      </div>

      {/* Film grain overlay */}
      <div className="film-grain" />
    </motion.div>
  );
}
