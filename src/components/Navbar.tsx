import React from 'react';
import Button from './ui/Button';

interface NavbarProps {
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollProgress }) => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine active chapter link based on scroll progress
  // progress boundaries:
  // Ch0 (Hero): < 0.12
  // Ch1 (About): < 0.25
  // Ch2 (Skills): < 0.38
  // Ch3 (Experience): < 0.51
  // Ch4 (Projects): < 0.64
  // Ch5 (Bridge): < 0.77
  // Ch6 (Contact): < 0.90
  const activeSection = React.useMemo(() => {
    if (scrollProgress < 0.15) return 'hero';
    if (scrollProgress < 0.35) return 'about';
    if (scrollProgress < 0.55) return 'skills';
    if (scrollProgress < 0.75) return 'experience';
    if (scrollProgress < 0.92) return 'projects';
    return 'contact';
  }, [scrollProgress]);

  // Adjust navbar background opacity as user scrolls down
  const bgOpacity = Math.min(0.9, scrollProgress * 6);
  const borderOpacity = Math.min(0.15, scrollProgress * 1.5);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5 transition-all duration-300"
      style={{
        backgroundColor: `rgba(26, 26, 26, ${bgOpacity})`,
        borderBottom: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
        backdropFilter: scrollProgress > 0.02 ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrollProgress > 0.02 ? 'blur(12px)' : 'none',
      }}
    >
      {/* Left: Logo */}
      <a 
        href="#" 
        onClick={handleLogoClick}
        className="brand-logo text-foreground text-lg font-bold tracking-wider uppercase select-none"
      >
        SRI NITHISH S
      </a>

      {/* Center: Nav links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        <li>
          <a 
            href="#about" 
            onClick={(e) => handleLinkClick(e, '#about')}
            className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${
              activeSection === 'about' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Profile
          </a>
        </li>
        <li>
          <a 
            href="#skills" 
            onClick={(e) => handleLinkClick(e, '#skills')}
            className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${
              activeSection === 'skills' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Expertise
          </a>
        </li>
        <li>
          <a 
            href="#experience" 
            onClick={(e) => handleLinkClick(e, '#experience')}
            className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${
              activeSection === 'experience' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Milestones
          </a>
        </li>
        <li>
          <a 
            href="#projects" 
            onClick={(e) => handleLinkClick(e, '#projects')}
            className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${
              activeSection === 'projects' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Projects
          </a>
        </li>

        <li>
          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, '#contact')}
            className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${
              activeSection === 'contact' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Contact
          </a>
        </li>
      </ul>

      {/* Right: Connect Button */}
      <Button 
        variant="navCta" 
        onClick={() => window.open('https://linkedin.com/in/srinithishs', '_blank')}
        className="hidden md:inline-flex rounded-lg uppercase text-[10px] tracking-widest px-6 h-10"
      >
        LinkedIn
      </Button>
    </nav>
  );
};
export default Navbar;
