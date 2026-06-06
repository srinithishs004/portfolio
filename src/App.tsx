import React from 'react';
import Navbar from './components/Navbar';
import ProgressBar from './components/shared/ProgressBar';
import Hero from './components/scenes/Hero';
import About from './components/scenes/About';
import Skills from './components/scenes/Skills';
import Experience from './components/scenes/Experience';
import Projects from './components/scenes/Projects';
import Contact from './components/scenes/Contact';
import Footer from './components/scenes/Footer';
import { useScrollProgress } from './hooks/useScrollProgress';
import { SpaceBackdrop } from './components/shared/SpaceBackdrop';

export default function App() {
  const scrollProgress = useScrollProgress();

  return (
    <div className="bg-transparent min-h-screen selection:bg-primary/20 selection:text-primary relative z-10">
      {/* Fixed Parallax Space Backdrop */}
      <SpaceBackdrop scrollProgress={scrollProgress} />

      {/* Navigation overlay */}
      <Navbar scrollProgress={scrollProgress} />

      {/* Chapters / Scroll Storytelling Layout */}
      <Hero scrollProgress={scrollProgress} />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />

      {/* Linear progress bar at the bottom */}
      <ProgressBar />
    </div>
  );
}
