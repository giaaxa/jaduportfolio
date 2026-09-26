'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Message {
  id: number;
  type: 'system' | 'contact';
  content: string;
  icon?: 'phone' | 'email';
  link?: string;
}

const messages: Message[] = [
  {
    id: 1,
    type: 'system',
    content: 'Player 2 has entered the lobby',
  },
  {
    id: 2,
    type: 'system',
    content: 'Select a contact method to connect',
  },
  {
    id: 3,
    type: 'contact',
    content: '07508058387',
    icon: 'phone',
    link: 'tel:+447508058387',
  },
  {
    id: 4,
    type: 'contact',
    content: 'Jadepereira21@yahoo.com',
    icon: 'email',
    link: 'mailto:Jadepereira21@yahoo.com',
  },
];

export default function ContactSection() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (text: string, id: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-[100px]">
      {/* Console-style header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#050505]/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#050505]/20" />
        </div>
        <span
          className="text-[10px] tracking-[0.2em] uppercase text-[#050505]/50"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ONLINE • READY TO CONNECT
        </span>
      </motion.div>

      {/* Message container - console style */}
      <div className="relative">
        {/* Console frame */}
        <div
          className="absolute -inset-4 rounded-2xl border border-[#050505]/10 bg-gradient-to-b from-white/40 to-white/20"
          style={{ backdropFilter: 'blur(8px)' }}
        />

        {/* Messages */}
        <div className="relative space-y-3 p-2">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.type === 'system' ? 0 : 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.15,
                ease: easeOutExpo,
              }}
            >
              {message.type === 'system' ? (
                /* System message */
                <div className="flex justify-center">
                  <div
                    className="px-4 py-2 rounded-full bg-[#050505]/[0.04] border border-[#050505]/[0.06]"
                  >
                    <span
                      className="text-[10px] tracking-wide text-[#050505]/50"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {message.content}
                    </span>
                  </div>
                </div>
              ) : (
                /* Contact message bubble */
                <div className="flex justify-end">
                  <div
                    className="group relative max-w-[85%] px-4 py-3 rounded-2xl rounded-br-md bg-[#050505]/[0.06] border border-[#050505]/[0.08] hover:bg-[#050505]/[0.08] transition-all duration-200"
                  >
                    {/* Icon */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#050505]/[0.06] flex items-center justify-center flex-shrink-0">
                        {message.icon === 'phone' ? (
                          <svg
                            className="w-4 h-4 text-[#050505]/60"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 text-[#050505]/60"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                          </svg>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span
                          className="text-[10px] uppercase tracking-wider text-[#050505]/40 mb-0.5"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {message.icon === 'phone' ? 'Phone' : 'Email'}
                        </span>
                        <a
                          href={message.link}
                          className="text-sm text-[#050505]/80 hover:text-[#050505] transition-colors"
                          style={{ fontFamily: 'var(--font-primary)' }}
                        >
                          {message.content}
                        </a>
                      </div>

                      {/* Copy button */}
                      <button
                        onClick={() => handleCopy(message.content, message.id)}
                        className="ml-2 p-1.5 rounded-lg hover:bg-[#050505]/[0.06] transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        aria-label="Copy to clipboard"
                      >
                        {copiedId === message.id ? (
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 text-[#050505]/40"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Message tail */}
                    <div className="absolute -right-1 bottom-2 w-3 h-3 bg-[#050505]/[0.06] border-r border-b border-[#050505]/[0.08] transform rotate-45" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controller hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="flex items-center justify-center gap-4 mt-8"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded bg-[#050505]/[0.06] border border-[#050505]/[0.1] flex items-center justify-center"
          >
            <span
              className="text-[8px] font-bold text-[#050505]/50"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ×
            </span>
          </div>
          <span
            className="text-[10px] text-[#050505]/40"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            SELECT
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded bg-[#050505]/[0.06] border border-[#050505]/[0.1] flex items-center justify-center"
          >
            <span
              className="text-[8px] font-bold text-[#050505]/50"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ○
            </span>
          </div>
          <span
            className="text-[10px] text-[#050505]/40"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            COPY
          </span>
        </div>
      </motion.div>
    </div>
  );
}
