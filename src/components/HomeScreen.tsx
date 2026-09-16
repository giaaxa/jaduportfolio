'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JaduLogo from './JaduLogo';
import AmbientBackground from './AmbientBackground';
import XMBNavigation from './XMBNavigation';
import WorkCategoryMenu from './WorkCategoryMenu';
import ProjectCard from './ProjectCard';
import SystemInfo from './SystemInfo';
import AudioController from './AudioController';
import MobileWorkCategories from './MobileWorkCategories';
import DPad from './DPad';
import PhotographySection from './PhotographySection';

interface HomeScreenProps {
  onLogoClick?: () => void;
}

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Sample project data
const sampleProject = {
  id: '1',
  title: 'BEYOND TOMORROW',
  category: 'Commercial',
  year: 2024,
  thumbnail: '/assets/project-placeholder.jpg',
  index: 1,
  total: 5,
};

export default function HomeScreen({ onLogoClick }: HomeScreenProps) {
  const [activeNav, setActiveNav] = useState('work');
  const [activeCategory, setActiveCategory] = useState('commercials');
  const [batteryLevel, setBatteryLevel] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('jadu-battery');
      return saved ? parseInt(saved, 10) : 1;
    }
    return 1;
  });

  const handleClick = () => {
    setBatteryLevel((prev) => {
      const newLevel = Math.min(prev + 5, 100);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('jadu-battery', newLevel.toString());
      }
      return newLevel;
    });
  };

  // Navigation arrays for D-pad
  const navItems = ['work', 'stills', 'profile', 'contact'];
  const categories = ['commercials', 'music-videos', 'film', 'cg-compositing', 'post-production'];

  const handleDPadUp = () => {
    const currentIndex = categories.indexOf(activeCategory);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
    setActiveCategory(categories[newIndex]);
  };

  const handleDPadDown = () => {
    const currentIndex = categories.indexOf(activeCategory);
    const newIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
    setActiveCategory(categories[newIndex]);
  };

  const handleDPadLeft = () => {
    const currentIndex = navItems.indexOf(activeNav);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : navItems.length - 1;
    setActiveNav(navItems[newIndex]);
  };

  const handleDPadRight = () => {
    const currentIndex = navItems.indexOf(activeNav);
    const newIndex = currentIndex < navItems.length - 1 ? currentIndex + 1 : 0;
    setActiveNav(navItems[newIndex]);
  };

  const showWorkSection = activeNav === 'work';
  const showProfileSection = activeNav === 'profile';
  const showStillsSection = activeNav === 'stills';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Atmospheric Background with video */}
      <AmbientBackground intensity="normal" showVideo />

      {/* Main content grid */}
      <div className="relative z-10 h-screen flex flex-col p-4 sm:p-5 md:p-6 lg:px-8 lg:py-4">
        {/* Top bar */}
        <header className="flex items-start justify-between mb-2 md:mb-4 flex-shrink-0">
          {/* Left: Logo and title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
            className="flex flex-col gap-2 md:gap-3"
          >
            <button
              onClick={onLogoClick}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Return to entry screen"
            >
              <JaduLogo size="small" />
            </button>
            <div className="flex flex-col gap-0.5 ml-1">
              <span
                className="text-xs md:text-sm tracking-wide text-[#050505]/80"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Visual Effects Compositor
              </span>
              <span
                className="text-xs md:text-sm tracking-wide text-[#050505]/60"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                and Post Production Artist
              </span>
            </div>
          </motion.div>

          {/* Right: System info and audio control */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:block">
              <SystemInfo />
            </div>
            <div className="flex flex-col items-end gap-1">
              <AudioController />
              <motion.a
                href="https://open.spotify.com/track/5AhxzlhZbKYfu4YNiUnmvx"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex items-center gap-1.5 px-2 py-1 rounded-full hover:bg-black/[0.03] transition-colors duration-300 group"
                aria-label="Listen on Spotify"
              >
                <svg
                  className="w-3.5 h-3.5 text-[#050505]/50 group-hover:text-[#1DB954] transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span
                  className="text-[9px] tracking-wide text-[#050505]/40 group-hover:text-[#050505]/60 transition-colors"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  jiya lage na
                </span>
              </motion.a>
            </div>
          </div>
        </header>

        {/* Main navigation - XMB style - centered/right */}
        <div className="mb-2 md:mb-4 lg:pl-[18%] xl:pl-[22%] flex-shrink-0">
          <XMBNavigation activeItem={activeNav} onItemSelect={setActiveNav} />
        </div>

        {/* Content area - shifted right */}
        <div className="flex-1 flex flex-col lg:flex-row items-start justify-start gap-4 lg:gap-10 lg:pl-[15%] xl:pl-[18%] min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Left side - Category menu (when Work is selected) */}
            {showWorkSection && (
              <>
                {/* Desktop category menu */}
                <motion.div
                  key="desktop-category"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                  className="hidden lg:block w-[260px] flex-shrink-0"
                >
                  <WorkCategoryMenu
                    activeCategory={activeCategory}
                    onCategorySelect={setActiveCategory}
                  />
                </motion.div>

                {/* Mobile/Tablet horizontal category menu */}
                <motion.div
                  key="mobile-category"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                  className="lg:hidden w-full"
                >
                  <MobileWorkCategories
                    activeCategory={activeCategory}
                    onCategorySelect={setActiveCategory}
                  />
                </motion.div>
              </>
            )}

            {/* Right side - Project card - bigger */}
            {showWorkSection && (
              <motion.div
                key="project-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
                className="w-full lg:flex-1 lg:max-w-[720px]"
              >
                <ProjectCard project={sampleProject} />
              </motion.div>
            )}

            {/* Profile Section */}
            {showProfileSection && (
              <motion.div
                key="profile-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
                className="flex-1 w-full min-h-0"
              >
                <div className="flex flex-row gap-4 md:gap-6 lg:gap-10 h-full max-h-full">
                  {/* Profile Photo - Fixed, smaller on mobile */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: easeOutExpo }}
                    className="flex-shrink-0 self-start"
                  >
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-xl md:rounded-2xl overflow-hidden">
                      <img
                        src="/assets/profile-photo.jpeg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                        style={{ filter: 'grayscale(20%) contrast(1.05)' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                  </motion.div>

                  {/* Profile Content - Scrollable */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: easeOutExpo }}
                    className="flex-1 max-w-2xl min-h-0 overflow-y-auto pr-2 md:pr-4"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(5,5,5,0.2) transparent',
                      WebkitOverflowScrolling: 'touch',
                      touchAction: 'pan-y'
                    }}
                  >
                    <div className="space-y-3 md:space-y-4 pb-20 pt-1">
                      <p
                        className="text-xs sm:text-sm md:text-base leading-relaxed text-[#050505]/80"
                        style={{ fontFamily: 'var(--font-primary)' }}
                      >
                        Through Visual Effects and Post Production, I work across the creative and technical sides of the frame. With a strong interest in culture, environment and visual storytelling.
                      </p>
                      <p
                        className="text-xs sm:text-sm md:text-base leading-relaxed text-[#050505]/80"
                        style={{ fontFamily: 'var(--font-primary)' }}
                      >
                        I spent the first 11 years of my life in India, and that has had a big influence on the way I see images. It&apos;s not just about colour or visual richness, but the layering of everyday life — old and new, quiet and chaotic, traditional and modern all existing at once. I think that made me more aware of atmosphere, detail and the way an environment can carry its own story. I&apos;m interested in culture more broadly too, and in how different places, people and visual languages shape mood, style and storytelling.
                      </p>
                      <p
                        className="text-xs sm:text-sm md:text-base leading-relaxed text-[#050505]/80"
                        style={{ fontFamily: 'var(--font-primary)' }}
                      >
                        My work spans compositing, 3D, editing and post-production, and I enjoy the balance between technical problem-solving and creating something visually striking.
                      </p>
                      <p
                        className="text-xs sm:text-sm md:text-base leading-relaxed text-[#050505]/80"
                        style={{ fontFamily: 'var(--font-primary)' }}
                      >
                        Some of my favourite films are <span className="italic">Haider</span>, <span className="italic">Pride & Prejudice</span>, <span className="italic">Memories of Murder</span> and <span className="italic">La Haine</span> — very different worlds, but all incredibly strong in atmosphere and visual identity. That&apos;s what I&apos;m drawn to most: work that feels distinctive, immersive and full of character.
                      </p>

                      {/* Hobbies */}
                      <div className="pt-2 md:pt-4">
                        <span
                          className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-[#050505]/40 block mb-2"
                          style={{ fontFamily: 'var(--font-primary)' }}
                        >
                          When I&apos;m not working
                        </span>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {['Sewing', 'Hiking', 'Travelling', 'Photography'].map((hobby) => (
                            <span
                              key={hobby}
                              className="px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-sm bg-[#050505]/[0.03] rounded-full text-[#050505]/70 border border-[#050505]/[0.06]"
                              style={{ fontFamily: 'var(--font-primary)' }}
                            >
                              {hobby}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Stills/Photography Section */}
            {showStillsSection && (
              <motion.div
                key="stills-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
                className="flex-1 w-full overflow-hidden"
              >
                <PhotographySection />
              </motion.div>
            )}

            {/* Content for other nav items */}
            {!showWorkSection && !showProfileSection && !showStillsSection && (
              <motion.div
                key="coming-soon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center flex-1 min-h-[200px]"
              >
                <div
                  className="text-[#050505]/30 text-base md:text-lg tracking-wide"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)} — Coming Soon
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom bar - minimal, absolute positioned */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-3 left-4 right-4 md:left-6 md:right-6 lg:left-8 lg:right-8 flex items-end justify-between"
        >
          <div className="flex items-end gap-4">
            <div className="hidden md:block" onClick={(e) => e.stopPropagation()}>
              <DPad
                onUp={handleDPadUp}
                onDown={handleDPadDown}
                onLeft={handleDPadLeft}
                onRight={handleDPadRight}
              />
            </div>
            <span
              className="text-[9px] md:text-[10px] tracking-[0.1em] text-[#050505]/25 mb-1"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              &copy; 2026 JADU / VISUAL EFFECTS
            </span>
          </div>

          <button
            onClick={handleClick}
            className="flex items-center gap-2 mb-1 cursor-pointer hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'var(--font-mono)' }}
            aria-label="Charge battery"
          >
            <div className="flex items-center gap-1">
              <div className="relative w-6 h-3 border border-[#050505]/50 rounded-sm">
                <div
                  className="absolute left-0.5 top-0.5 bottom-0.5 bg-[#050505]/70 rounded-[1px] transition-all duration-300"
                  style={{ width: `${Math.max((batteryLevel / 100) * 18, 2)}px` }}
                />
                <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1.5 bg-[#050505]/50 rounded-r-sm" />
              </div>
              <span className="text-[9px] tracking-wide text-[#050505]/50">
                {batteryLevel}%
              </span>
            </div>
          </button>
        </motion.footer>
      </div>

      {/* Film grain overlay */}
      <div className="film-grain" />
    </motion.div>
  );
}
