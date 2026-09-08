'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SystemInfo() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format time: HH:MM
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);

      // Format date: MON AUG 31
      const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      const dayNum = now.getDate();
      setDate(`${dayName} ${monthName} ${dayNum}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="flex items-center gap-4"
    >
      {/* Tagline */}
      <span
        className="text-[10px] tracking-[0.12em] uppercase text-[#050505]/40"
        style={{ fontFamily: 'var(--font-primary)' }}
      >
        Imagery Shapes Reality
      </span>

      {/* Divider */}
      <div className="w-8 h-[1px] bg-[#050505]/15" />

      {/* Date & Time */}
      <div className="flex items-center gap-3">
        <span
          className="text-[10px] tracking-[0.08em] text-[#050505]/40"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {date}
        </span>
        <span
          className="text-sm font-medium text-[#050505]/60"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {time}
        </span>
      </div>
    </motion.div>
  );
}
