import React, { useEffect, useState } from 'react';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'projects', label: 'Projects' },
    { id: 'playground', label: 'Lab' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section check based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      document.dispatchEvent(new CustomEvent('trigger-sync-ping', { detail: { sectionId: id } }));
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      padding: scrolled ? '16px 24px' : '24px',
      transition: 'var(--transition-smooth)',
    }}>
      <nav className="nav-capsule" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '6px 12px',
        borderRadius: '30px',
        backgroundColor: scrolled ? 'rgba(14, 14, 18, 0.75)' : 'rgba(6, 6, 8, 0.4)',
        backdropFilter: 'blur(16px)',
        border: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.03)',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
        transition: 'var(--transition-smooth)',
      }}>
        {/* Minimal Identity Logo */}
        <div 
          onClick={() => scrollToSection('home')}
          className="interactive nav-logo"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-cyan)',
            padding: '4px 12px 4px 8px',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            marginRight: '8px',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 'bold'
          }}
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-green)',
            display: 'inline-block',
            boxShadow: '0 0 8px var(--color-green)'
          }} />
          SRIKAR.DE
        </div>

        {/* Navigation Items */}
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="interactive nav-btn"
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: activeSection === item.id ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
              color: activeSection === item.id ? 'var(--color-cyan)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: activeSection === item.id ? '500' : '400',
              letterSpacing: '0.03em',
              transition: 'var(--transition-fast)',
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
