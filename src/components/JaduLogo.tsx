'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';

interface JaduLogoProps {
  size?: 'small' | 'medium' | 'large';
  animate?: boolean;
  className?: string;
}

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function JaduLogo({ size = 'large', animate = false, className = '' }: JaduLogoProps) {
  const sizeClasses = {
    small: 'w-[120px] md:w-[140px]',
    medium: 'w-[180px] md:w-[220px]',
    large: 'w-[280px] md:w-[340px] lg:w-[400px]',
  };

  const logoVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: easeOutExpo,
      },
    },
  };

  const sliceVariants: Variants = {
    hidden: {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
    },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      transition: {
        duration: 1.4,
        ease: easeOutExpo,
      },
    },
  };

  const glitchVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0, 1, 0],
      x: [0, -3, 3, -2, 0],
      transition: {
        duration: 0.3,
        delay: 0.8,
        times: [0, 0.2, 0.4, 0.6, 1],
      },
    },
  };

  if (animate) {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <motion.div
          variants={sliceVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <Image
            src="/assets/jadu-logo.png"
            alt="JADU"
            width={400}
            height={200}
            className="w-full h-auto object-contain"
            priority
          />
        </motion.div>

        <motion.div
          variants={glitchVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 opacity-0"
          style={{ mixBlendMode: 'multiply' }}
        >
          <Image
            src="/assets/jadu-logo.png"
            alt=""
            width={400}
            height={200}
            className="w-full h-auto object-contain"
            style={{ filter: 'hue-rotate(180deg) saturate(2)' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.15, 0],
            scaleY: [1, 1.02, 1],
          }}
          transition={{
            duration: 0.2,
            delay: 1.0,
          }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,255,216,0.1) 2px, rgba(200,255,216,0.1) 4px)',
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={logoVariants}
      className={`relative ${sizeClasses[size]} ${className}`}
    >
      <Image
        src="/assets/jadu-logo.png"
        alt="JADU"
        width={400}
        height={200}
        className="w-full h-auto object-contain"
        priority
      />
    </motion.div>
  );
}
