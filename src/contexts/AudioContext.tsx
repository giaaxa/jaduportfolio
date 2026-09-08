'use client';

import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

interface AudioContextType {
  isSoundEnabled: boolean;
  isPlaying: boolean;
  volume: number;
  enableSound: () => void;
  disableSound: () => void;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
  playMainMusic: () => void;
  pauseMainMusic: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.25);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check for stored preference
    const stored = localStorage.getItem('jadu-sound-preference');
    if (stored === 'enabled') {
      setIsSoundEnabled(true);
    }
  }, []);

  useEffect(() => {
    // Create audio element for background music
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio('/assets/background-video.mp4');
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const enableSound = useCallback(() => {
    setIsSoundEnabled(true);
    localStorage.setItem('jadu-sound-preference', 'enabled');
  }, []);

  const disableSound = useCallback(() => {
    setIsSoundEnabled(false);
    localStorage.setItem('jadu-sound-preference', 'disabled');
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleSound = useCallback(() => {
    if (isSoundEnabled) {
      disableSound();
    } else {
      enableSound();
      playMainMusic();
    }
  }, [isSoundEnabled]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)));
  }, []);

  const playMainMusic = useCallback(async () => {
    if (audioRef.current && isSoundEnabled) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked - fail silently
        console.log('Autoplay blocked by browser');
      }
    }
  }, [isSoundEnabled]);

  const pauseMainMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isSoundEnabled,
        isPlaying,
        volume,
        enableSound,
        disableSound,
        toggleSound,
        setVolume,
        playMainMusic,
        pauseMainMusic,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
