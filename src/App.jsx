import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Database } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import GridOverlay from './components/GridOverlay';
import Navigation from './components/Navigation';

// Sections
import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Playground from './sections/Playground';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

export default function App() {
  const [crtActive, setCrtActive] = useState(false);
  const [telemetryLogs, setTelemetryLogs] = useState([]);
  const [telemetryVisible, setTelemetryVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [likesCount, setLikesCount] = useState(1337);
  const [likeSuccess, setLikeSuccess] = useState(false);
  const [likeHovered, setLikeHovered] = useState(false);
  const [footerLatency, setFooterLatency] = useState(14);
  const [showMobileDisclaimer, setShowMobileDisclaimer] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('dismiss-de-disclaimer');
    }
    return false;
  });

  const dismissDisclaimer = () => {
    setShowMobileDisclaimer(false);
    localStorage.setItem('dismiss-de-disclaimer', 'true');
  };

  const toggleCrtMode = () => {
    setCrtActive(!crtActive);
  };

  const handleLikeAndScroll = () => {
    setLikesCount(prev => prev + 1);
    setLikeSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setLikeSuccess(false);
    }, 2500);
  };

  useEffect(() => {
    const handleScrollTopVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollTopVisibility);
  }, []);

  useEffect(() => {
    const latencyInterval = setInterval(() => {
      setFooterLatency(Math.floor(Math.random() * 8) + 12); // 12ms - 19ms
    }, 3000);
    return () => clearInterval(latencyInterval);
  }, []);

  useEffect(() => {
    // 1. Sleek Navigation Telemetry Sync Trigger
    const handleSyncPing = (e) => {
      const targetId = e.detail?.sectionId || 'home';
      const latency = Math.floor(Math.random() * 5) + 2; // 2ms - 6ms
      const nodeHop = `0x${(Math.floor(Math.random() * 90) + 10).toString(16).toUpperCase()}`;

      setTelemetryLogs([
        `[NET_SYNC]: ROTATING PORTAL GATE...`,
        `[HOP_ADDR]: ${nodeHop} -> ${targetId.toUpperCase()}`,
        `[LATENCY] : ${latency}ms (OPTIMAL)`,
        `[ROUTING] : TELEMETRY_SYNC_OK`
      ]);
      setTelemetryVisible(true);

      // Trigger a beautiful, ultra-soft screen transition pulse on the background canvas
      const bgCanvas = document.querySelector('canvas');
      if (bgCanvas) {
        gsap.fromTo(bgCanvas,
          { opacity: 0.65 },
          { opacity: 0.95, duration: 0.8, ease: 'power2.out' }
        );
      }

      // Flash the corner borders subtly in cyan
      const cornersFrame = document.querySelector('.tech-corners-frame');
      if (cornersFrame) {
        gsap.fromTo(cornersFrame,
          { borderColor: 'rgba(0, 242, 254, 0.4)', scale: 1.01 },
          { borderColor: 'rgba(255, 255, 255, 0.02)', scale: 1, duration: 1.0, ease: 'power2.out' }
        );
      }

      // Automatically auto-clear the log after 1.8 seconds
      const timeoutId = setTimeout(() => {
        setTelemetryVisible(false);
      }, 1800);

      return () => clearTimeout(timeoutId);
    };

    document.addEventListener('trigger-sync-ping', handleSyncPing);

    // 2. IntersectionObserver + GSAP for buttery smooth reveals
    const revealOptions = {
      root: null,
      rootMargin: '0px 0px -120px 0px',
      threshold: 0.05
    };

    const handleReveal = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.2,
            ease: 'power4.out',
            overwrite: 'auto'
          });
        } else {
          // Reset states when exiting view to allow scrolling back to re-trigger animations!
          gsap.to(entry.target, {
            opacity: 0,
            y: 60,
            skewY: 0.5,
            duration: 0.8,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
      });
    };

    const observer = new IntersectionObserver(handleReveal, revealOptions);
    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');

    elementsToReveal.forEach(el => {
      // Set initial state via GSAP
      gsap.set(el, { opacity: 0, y: 60, skewY: 0.5 });
      observer.observe(el);
    });

    return () => {
      document.removeEventListener('trigger-sync-ping', handleSyncPing);
      elementsToReveal.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className={crtActive ? 'crt-mode' : ''} style={{ position: 'relative' }}>
      {/* Light Mobile/Tablet Disclaimer */}
      {showMobileDisclaimer && (
        <div className="mobile-disclaimer-banner" style={{
          backgroundColor: 'rgba(6, 6, 8, 0.95)',
          borderBottom: '1px solid rgba(0, 242, 254, 0.25)',
          padding: '10px 20px',
          display: 'none', // Overridden in CSS media queries to flex on < 1024px
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'var(--color-cyan)',
          position: 'sticky',
          top: 0,
          zIndex: 999999,
          backdropFilter: 'blur(12px)',
          animation: 'telemetryReveal 0.3s ease-out forwards',
          boxShadow: '0 4px 20px rgba(0, 242, 254, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', textAlign: 'left' }}>
            <span className="glow-pulsing" style={{
              width: '5px',
              height: '5px',
              backgroundColor: 'var(--color-amber)',
              borderRadius: '50%',
              boxShadow: '0 0 6px var(--color-amber)',
              display: 'inline-block',
              flexShrink: 0
            }} />
            <span>
              [SYS_NOTICE]: This interactive command center is best experienced on a desktop web browser for full canvas particle lineages, playable pipeline Overlord game, and CLI shell telemetry.
            </span>
          </div>
          <button 
            onClick={dismissDisclaimer}
            className="interactive"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              padding: '2px 8px',
              color: 'var(--text-secondary)',
              fontSize: '8px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              transition: 'var(--transition-fast)',
              flexShrink: 0
            }}
          >
            [DISMISS]
          </button>
        </div>
      )}

      {/* Dynamic Navigation Telemetry Route Logger */}
      {telemetryVisible && (
        <div style={{
          position: 'fixed',
          bottom: '40px',
          left: '40px',
          backgroundColor: 'rgba(6, 6, 8, 0.95)',
          border: '1px solid var(--color-cyan)',
          borderRadius: '4px',
          padding: '14px 20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'var(--color-cyan)',
          zIndex: 99999,
          pointerEvents: 'none',
          boxShadow: '0 0 20px rgba(0, 242, 254, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          animation: 'telemetryReveal 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {telemetryLogs.map((log, idx) => (
            <div key={idx} style={{
              color: idx === telemetryLogs.length - 1 ? 'var(--color-green)' : 'var(--color-cyan)',
              opacity: 0.95,
              letterSpacing: '0.05em'
            }}>
              {log}
            </div>
          ))}
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes telemetryReveal {
          0% { transform: translateY(15px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}} />

      {/* Background aesthetics */}
      <GridOverlay crtActive={crtActive} />

      {/* Dynamic Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navigation />

      {/* Main Container */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <div id="home" className="reveal-on-scroll">
          <Hero />
        </div>
        <div id="philosophy" className="reveal-on-scroll">
          <Philosophy />
        </div>
        <div id="work" className="reveal-on-scroll">
          <Experience />
        </div>
        <div id="projects" className="reveal-on-scroll">
          <Projects />
        </div>
        <div id="playground" className="reveal-on-scroll">
          <Playground onToggleCrt={toggleCrtMode} />
        </div>
        <div id="skills" className="reveal-on-scroll">
          <Skills />
        </div>
        <div id="contact" className="reveal-on-scroll">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#030305',
        borderTop: '1px solid var(--border-light)',
        padding: '40px 8%',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-cyan)',
              letterSpacing: '0.05em'
            }}>
              SRIKAR MANDAVA // DATA_ENGINEER
            </span>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(0, 255, 135, 0.08)',
              border: '1px solid rgba(0, 255, 135, 0.2)',
              borderRadius: '4px',
              padding: '2px 6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              color: 'var(--color-green)'
            }}>
              <span className="glow-pulsing" style={{
                width: '5px',
                height: '5px',
                backgroundColor: 'var(--color-green)',
                borderRadius: '50%',
                display: 'inline-block',
                boxShadow: '0 0 8px var(--color-green)'
              }} />
              PORTAL_CORE // ONLINE (SYS_HEARTBEAT: OK)
            </div>
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            marginTop: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            lineHeight: '1.5'
          }}>
            <div>
              <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>&gt; PIPELINE:</span>{' '}
              <span style={{ color: 'var(--text-secondary)' }}>INGEST_STREAM_ACTIVE // SYNC_COMPILATION: OK</span>
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              color: 'var(--text-muted)',
              fontSize: '9px',
              opacity: 0.85
            }}>
              <span>[LATENCY: {footerLatency}ms]</span>
              <span>[LOAD: NOMINAL]</span>
              <span>[AUTO_SCALING: TRUE]</span>
              <span>[REDUNDANCY: 3X]</span>
            </div>
            <p style={{
              marginTop: '4px',
              color: 'var(--text-secondary)',
              fontSize: '11px',
              maxWidth: '460px',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.01em',
              lineHeight: '1.4'
            }}>


            </p>
          </div>
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-secondary)'
        }}>
          © {new Date().getFullYear()} // ALL_PIPELINES_OPERATIONAL
        </div>
      </footer>

      {/* Floating Interactive Circular "Like & Seek-to-Top" data node */}
      {showScrollTop && (
        <div style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 9999 }}>

          {/* Slide-out monospaced label on hover */}
          <div style={{
            position: 'absolute',
            right: '60px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(6, 6, 8, 0.95)',
            border: '1px solid var(--color-cyan)',
            borderRadius: '4px',
            padding: '6px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            color: 'var(--color-cyan)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: '0 0 10px rgba(0, 242, 254, 0.1)',
            opacity: likeHovered ? 0.95 : 0,
            transform: likeHovered ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(10px)',
            transition: 'opacity 0.2s, transform 0.2s'
          }}>
            likes.increment() // COMMIT_EVENT
          </div>

          {/* Diagnostic floating database commit logs */}
          {likeSuccess && (
            <div style={{
              position: 'absolute',
              bottom: '55px',
              right: 0,
              backgroundColor: 'rgba(3, 3, 5, 0.95)',
              border: '1px solid var(--color-green)',
              padding: '4px 10px',
              borderRadius: '3px',
              fontFamily: 'var(--font-mono)',
              fontSize: '7px',
              color: 'var(--color-green)',
              whiteSpace: 'nowrap',
              boxShadow: '0 0 10px rgba(0, 255, 135, 0.2)',
              animation: 'telemetryReveal 0.2s ease-out forwards'
            }}>
              [PROD_DB.WRITTEN // COMMIT_OK]
            </div>
          )}

          {/* Small Circular Database Upvote Node */}
          <button
            onClick={handleLikeAndScroll}
            onMouseEnter={() => setLikeHovered(true)}
            onMouseLeave={() => setLikeHovered(false)}
            className="interactive"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(6, 6, 8, 0.9)',
              border: `1px solid ${likeSuccess ? 'var(--color-green)' : 'var(--color-cyan)'}`,
              color: 'var(--color-cyan)',
              cursor: 'pointer',
              boxShadow: likeSuccess
                ? '0 0 20px rgba(0, 255, 135, 0.3)'
                : '0 4px 20px rgba(0, 242, 254, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-fast)',
              outline: 'none',
              position: 'relative'
            }}
          >
            {/* Center Database Cylinder Icon */}
            <Database
              size={18}
              style={{
                color: likeSuccess ? 'var(--color-green)' : 'var(--color-cyan)',
                transform: likeHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)',
                transition: 'transform 0.2s'
              }}
            />

            {/* Absolute alert badge showing likes record metrics */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#060608',
              border: `1px solid ${likeSuccess ? 'var(--color-green)' : 'var(--color-cyan)'}`,
              borderRadius: '10px',
              padding: '1px 5px',
              fontSize: '7px',
              fontFamily: 'var(--font-mono)',
              color: likeSuccess ? 'var(--color-green)' : 'var(--color-cyan)',
              fontWeight: 'bold',
              boxShadow: likeSuccess
                ? '0 0 8px var(--color-green)'
                : '0 0 6px rgba(0, 242, 254, 0.2)',
              transition: 'var(--transition-fast)'
            }}>
              {likesCount}
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
