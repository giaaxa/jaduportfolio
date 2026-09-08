'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CustomCursorProps {
  variant?: 'default' | 'play' | 'link';
}

export default function CustomCursor({ variant = 'default' }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check for touch device
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', checkTouch);
    };
  }, [cursorX, cursorY, isTouch]);

  if (isTouch) return null;

  const cursorSize = variant === 'play' ? 64 : variant === 'link' ? 40 : 12;

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        animate={{
          width: cursorSize,
          height: cursorSize,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center rounded-full bg-white"
      >
        {variant === 'play' && (
          <span
            className="text-[10px] font-medium tracking-wider uppercase text-black"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            play
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
