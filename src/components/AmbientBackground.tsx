'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AmbientBackgroundProps {
  intensity?: 'subtle' | 'normal' | 'enhanced';
  showVideo?: boolean;
}

export default function AmbientBackground({
  intensity = 'normal',
  showVideo = false
}: AmbientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || prefersReducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Wave parameters based on intensity
    const intensityConfig = {
      subtle: { waveCount: 3, opacity: 0.015, speed: 0.0003 },
      normal: { waveCount: 5, opacity: 0.025, speed: 0.0005 },
      enhanced: { waveCount: 7, opacity: 0.035, speed: 0.0008 },
    };

    const config = intensityConfig[intensity];

    // Create flowing wave ribbons
    const drawWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < config.waveCount; i++) {
        const yOffset = (canvas.height / (config.waveCount + 1)) * (i + 1);
        const amplitude = 60 + i * 15;
        const frequency = 0.002 + i * 0.0003;
        const phaseOffset = i * 0.5;

        ctx.beginPath();
        ctx.moveTo(-100, yOffset);

        for (let x = -100; x <= canvas.width + 100; x += 5) {
          const y = yOffset +
            Math.sin(x * frequency + time + phaseOffset) * amplitude +
            Math.sin(x * frequency * 0.5 + time * 0.7 + phaseOffset) * (amplitude * 0.5);

          if (x === -100) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Continue to bottom right and back to create a ribbon
        ctx.lineTo(canvas.width + 100, canvas.height + 100);
        ctx.lineTo(-100, canvas.height + 100);
        ctx.closePath();

        // Gradient with occasional mint tint
        const gradient = ctx.createLinearGradient(0, yOffset - amplitude, 0, yOffset + amplitude * 3);

        // Add very subtle mint on some waves
        const hasMintTint = i % 3 === 0;

        if (hasMintTint) {
          gradient.addColorStop(0, 'rgba(248, 249, 247, 0)');
          gradient.addColorStop(0.3, `rgba(200, 255, 216, ${config.opacity * 0.3})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${config.opacity})`);
          gradient.addColorStop(0.7, `rgba(168, 245, 194, ${config.opacity * 0.2})`);
          gradient.addColorStop(1, 'rgba(248, 249, 247, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(248, 249, 247, 0)');
          gradient.addColorStop(0.4, `rgba(255, 255, 255, ${config.opacity * 0.5})`);
          gradient.addColorStop(0.6, `rgba(250, 250, 250, ${config.opacity})`);
          gradient.addColorStop(1, 'rgba(248, 249, 247, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Add a few extremely subtle floating light points
      for (let i = 0; i < 3; i++) {
        const x = (canvas.width * 0.2) + (canvas.width * 0.6) * ((i + time * 0.00002) % 1);
        const y = canvas.height * 0.3 + Math.sin(time * 0.0003 + i) * canvas.height * 0.2;

        const pointGradient = ctx.createRadialGradient(x, y, 0, x, y, 80);
        pointGradient.addColorStop(0, 'rgba(200, 255, 216, 0.08)');
        pointGradient.addColorStop(0.5, 'rgba(200, 255, 216, 0.02)');
        pointGradient.addColorStop(1, 'rgba(200, 255, 216, 0)');

        ctx.fillStyle = pointGradient;
        ctx.beginPath();
        ctx.arc(x, y, 80, 0, Math.PI * 2);
        ctx.fill();
      }

      time += config.speed * 16.67; // Normalize for ~60fps
      animationId = requestAnimationFrame(drawWaves);
    };

    drawWaves();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isMounted, prefersReducedMotion, intensity]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base background color */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      />

      {/* Video background (for home screen) */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(60%) brightness(1.1) contrast(0.95)' }}
          >
            <source src="/assets/background-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}

      {/* Canvas for wave animation */}
      {!prefersReducedMotion && isMounted && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: showVideo ? 0.7 : 1 }}
        />
      )}

      {/* Static fallback for reduced motion */}
      {prefersReducedMotion && (
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 30%, rgba(200, 255, 216, 0.03), transparent),
              radial-gradient(ellipse 60% 40% at 70% 60%, rgba(255, 255, 255, 0.05), transparent),
              radial-gradient(ellipse 70% 45% at 30% 70%, rgba(250, 250, 250, 0.04), transparent)
            `
          }}
        />
      )}

      {/* Subtle vignette - minimal */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 150% 150% at 50% 50%, transparent 75%, rgba(248, 249, 247, 0.08) 100%)'
        }}
      />
    </div>
  );
}
