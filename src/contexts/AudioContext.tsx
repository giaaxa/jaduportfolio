'use client';

import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

interface AudioContextType {
  isSoundEnabled: boolean;
  isPlaying: boolean;
  isIntroPlaying: boolean;
  volume: number;
  enableSound: () => void;
  disableSound: () => void;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
  playIntroSound: () => void;
  stopIntroSound: () => void;
  playMainMusic: () => void;
  pauseMainMusic: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.25);
  const mainAudioRef = useRef<HTMLAudioElement | null>(null);
  const introAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check for stored preference
    const stored = localStorage.getItem('jadu-sound-preference');
    if (stored === 'enabled') {
      setIsSoundEnabled(true);
    }
  }, []);

  useEffect(() => {
    // Create audio elements
    if (typeof window !== 'undefined') {
      // Main music - loops
      if (!mainAudioRef.current) {
        mainAudioRef.current = new Audio('/assets/main-music.mp3');
        mainAudioRef.current.loop = true;
        mainAudioRef.current.volume = volume;
      }
      // Intro sound - plays once
      if (!introAudioRef.current) {
        introAudioRef.current = new Audio('/assets/intro-sound.mp3');
        introAudioRef.current.loop = false;
        introAudioRef.current.volume = volume;
      }
    }

    return () => {
      if (mainAudioRef.current) {
        mainAudioRef.current.pause();
        mainAudioRef.current = null;
      }
      if (introAudioRef.current) {
        introAudioRef.current.pause();
        introAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mainAudioRef.current) {
      mainAudioRef.current.volume = volume;
    }
    if (introAudioRef.current) {
      introAudioRef.current.volume = volume;
    }
  }, [volume]);

  const enableSound = useCallback(() => {
    setIsSoundEnabled(true);
    localStorage.setItem('jadu-sound-preference', 'enabled');
  }, []);

  const disableSound = useCallback(() => {
    setIsSoundEnabled(false);
    localStorage.setItem('jadu-sound-preference', 'disabled');
    if (mainAudioRef.current) {
      mainAudioRef.current.pause();
      setIsPlaying(false);
    }
    if (introAudioRef.current) {
      introAudioRef.current.pause();
      setIsIntroPlaying(false);
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

  const playIntroSound = useCallback(async () => {
    if (introAudioRef.current) {
      try {
        introAudioRef.current.currentTime = 0;
        await introAudioRef.current.play();
        setIsIntroPlaying(true);
      } catch {
        console.log('Intro autoplay blocked by browser');
      }
    }
  }, []);

  const stopIntroSound = useCallback(() => {
    if (introAudioRef.current) {
      // Fade out intro
      const fadeOut = setInterval(() => {
        if (introAudioRef.current && introAudioRef.current.volume > 0.05) {
          introAudioRef.current.volume = Math.max(0, introAudioRef.current.volume - 0.1);
        } else {
          clearInterval(fadeOut);
          if (introAudioRef.current) {
            introAudioRef.current.pause();
            introAudioRef.current.volume = volume;
            introAudioRef.current.currentTime = 0;
          }
          setIsIntroPlaying(false);
        }
      }, 50);
    }
  }, [volume]);

  const playMainMusic = useCallback(async () => {
    // Stop intro first
    stopIntroSound();

    if (mainAudioRef.current) {
      try {
        mainAudioRef.current.currentTime = 0;
        await mainAudioRef.current.play();
        setIsPlaying(true);
      } catch {
        console.log('Autoplay blocked by browser');
      }
    }
  }, [stopIntroSound]);

  const pauseMainMusic = useCallback(() => {
    if (mainAudioRef.current) {
      mainAudioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isSoundEnabled,
        isPlaying,
        isIntroPlaying,
        volume,
        enableSound,
        disableSound,
        toggleSound,
        setVolume,
        playIntroSound,
        stopIntroSound,
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
