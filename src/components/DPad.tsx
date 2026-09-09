'use client';

import { motion } from 'framer-motion';

interface DPadProps {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
}

export default function DPad({ onUp, onDown, onLeft, onRight }: DPadProps) {
  const buttonClass = "absolute flex items-center justify-center transition-all duration-150 hover:bg-[#050505]/[0.06] active:bg-[#050505]/[0.1] active:scale-95";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="relative w-24 h-24"
    >
      {/* D-pad base */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Vertical bar */}
        <div className="absolute w-8 h-full bg-[#050505]/[0.04] rounded-sm" />
        {/* Horizontal bar */}
        <div className="absolute w-full h-8 bg-[#050505]/[0.04] rounded-sm" />

        {/* Center dot */}
        <div className="absolute w-2 h-2 rounded-full bg-[#050505]/20" />
      </div>

      {/* Up button */}
      <button
        onClick={onUp}
        className={`${buttonClass} top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-t-sm`}
        aria-label="Navigate up"
      >
        <svg width="12" height="9" viewBox="0 0 8 6" fill="none" className="text-[#050505]/40">
          <path d="M4 0.5L7.5 5.5H0.5L4 0.5Z" fill="currentColor" />
        </svg>
      </button>

      {/* Down button */}
      <button
        onClick={onDown}
        className={`${buttonClass} bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-b-sm`}
        aria-label="Navigate down"
      >
        <svg width="12" height="9" viewBox="0 0 8 6" fill="none" className="text-[#050505]/40">
          <path d="M4 5.5L0.5 0.5H7.5L4 5.5Z" fill="currentColor" />
        </svg>
      </button>

      {/* Left button */}
      <button
        onClick={onLeft}
        className={`${buttonClass} left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-l-sm`}
        aria-label="Navigate left"
      >
        <svg width="9" height="12" viewBox="0 0 6 8" fill="none" className="text-[#050505]/40">
          <path d="M0.5 4L5.5 0.5V7.5L0.5 4Z" fill="currentColor" />
        </svg>
      </button>

      {/* Right button */}
      <button
        onClick={onRight}
        className={`${buttonClass} right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-r-sm`}
        aria-label="Navigate right"
      >
        <svg width="9" height="12" viewBox="0 0 6 8" fill="none" className="text-[#050505]/40">
          <path d="M5.5 4L0.5 7.5V0.5L5.5 4Z" fill="currentColor" />
        </svg>
      </button>
    </motion.div>
  );
}
