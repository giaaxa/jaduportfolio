'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EntryScreen from '@/components/EntryScreen';
import HomeScreen from '@/components/HomeScreen';
import CustomCursor from '@/components/CustomCursor';

type AppScreen = 'entry' | 'home';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('entry');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'play'>('default');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if user has visited before (optional - skip entry on return visit)
    // const hasVisited = sessionStorage.getItem('jadu-visited');
    // if (hasVisited) {
    //   setCurrentScreen('home');
    // }
  }, []);

  const handleEnter = () => {
    // sessionStorage.setItem('jadu-visited', 'true');
    setCurrentScreen('home');
  };

  if (!isMounted) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      />
    );
  }

  return (
    <main className="relative min-h-screen cursor-none">
      {/* Custom cursor */}
      <CustomCursor variant={cursorVariant} />

      <AnimatePresence mode="wait">
        {currentScreen === 'entry' && (
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EntryScreen onEnter={handleEnter} />
          </motion.div>
        )}

        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HomeScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
