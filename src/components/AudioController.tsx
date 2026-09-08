'use client';

import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';

export default function AudioController() {
  const { isSoundEnabled, isPlaying, toggleSound } = useAudio();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      onClick={toggleSound}
      className="relative flex items-center gap-2 px-3 py-2 rounded-full hover:bg-black/[0.03] transition-colors duration-300 group"
      aria-label={isSoundEnabled ? 'Mute audio' : 'Enable audio'}
    >
      {/* Icon */}
      <div className="relative">
        {isSoundEnabled ? (
          <Volume2 size={14} className="text-[#050505]/60 group-hover:text-[#050505]/80 transition-colors" />
        ) : (
          <VolumeX size={14} className="text-[#050505]/40 group-hover:text-[#050505]/60 transition-colors" />
        )}

        {/* Active indicator dot */}
        {isSoundEnabled && isPlaying && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--accent-mint-soft)' }}
          >
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: 'var(--accent-mint-soft)' }}
            />
          </motion.div>
        )}
      </div>

      {/* Waveform indicator */}
      {isSoundEnabled && isPlaying && (
        <div className="flex items-center gap-[2px] h-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                height: ['30%', '100%', '30%'],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
              className="w-[2px] bg-[#050505]/30 rounded-full"
              style={{ height: '30%' }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}
