'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import JaduLogo from './JaduLogo';
import AmbientBackground from './AmbientBackground';
import { useAudio } from '@/contexts/AudioContext';

interface EntryScreenProps {
  onEnter: () => void;
}

// Shared easing as tuple
const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { enableSound, disableSound, playMainMusic, playIntroSound, stopIntroSound } = useAudio();

  // Play intro sound when entry screen loads
  useEffect(() => {
    // Small delay to ensure audio context is ready
    const timer = setTimeout(() => {
      playIntroSound();
    }, 500);
    return () => clearTimeout(timer);
  }, [playIntroSound]);

  const handleEnterWithSound = () => {
    enableSound();
    setIsExiting(true);
    // Stop intro and start main music with slight delay
    setTimeout(() => {
      playMainMusic();
    }, 400);
    setTimeout(onEnter, 900);
  };

  const handleEnterWithoutSound = () => {
    disableSound();
    stopIntroSound();
    setIsExiting(true);
    setTimeout(onEnter, 900);
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.6 + i * 0.1,
        duration: 0.6,
        ease: easeOutExpo,
      },
    }),
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          key="entry-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.2 } }}
          className="fixed inset-0 flex flex-col items-center justify-center min-h-screen"
          onAnimationComplete={() => setHasLoaded(true)}
        >
          <AmbientBackground intensity="subtle" />

          <div className="relative z-10 flex flex-col items-center justify-center px-6">
            <motion.div
              animate={isExiting ? {
                scale: 1.15,
                filter: 'blur(8px)',
                opacity: 0,
              } : {}}
              transition={{ duration: 0.7, ease: easeOutExpo }}
              className="mb-16 md:mb-20"
            >
              <JaduLogo size="large" animate={hasLoaded || true} />
            </motion.div>

            <motion.div
              animate={isExiting ? { opacity: 0, y: 20 } : {}}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5"
            >
              <motion.button
                custom={0}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scaleX: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEnterWithSound}
                className="relative px-8 py-3 rounded-full bg-[#050505] text-white text-sm font-medium tracking-wide lowercase overflow-hidden group transition-transform duration-300"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                <span className="relative z-10">enter with sound</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </motion.button>

              <motion.button
                custom={1}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ backgroundColor: '#050505', color: '#ffffff' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEnterWithoutSound}
                className="px-8 py-3 rounded-full bg-white text-[#050505] text-sm font-medium tracking-wide lowercase border border-[#050505] transition-colors duration-400"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                enter without sound
              </motion.button>
            </motion.div>
          </div>

          <AnimatePresence>
            {isExiting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="fixed inset-0 z-50 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(248,249,247,1) 0%, rgba(248,249,247,1) 100%)',
                }}
              />
            )}
          </AnimatePresence>

          <div className="film-grain" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
