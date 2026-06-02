import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const sectionLabels = {
    home: '[INGEST: OK]',
    philosophy: '[CHECK: VALID]',
    work: '[DAG: RUNNING]',
    projects: '[DBT: TRANSFORM]',
    playground: '[SANDBOX: ACTIVE]',
    skills: '[SCHEMA: PARSED]',
    contact: '[QUERY: EXPORT]'
  };

  useEffect(() => {
    // Hide default cursor on mount
    document.documentElement.style.cursor = 'none';
    
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (isHidden) setIsHidden(false);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Track hovered elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.interactive') ||
        target.classList.contains('interactive');
        
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);

    // Animation Loop
    let frameCount = 0;
    let animationFrameId;
    const updatePosition = () => {
      frameCount++;
      // Linear interpolation (lerp) for smooth lag effect on outer ring
      const ringLerpFactor = 0.15;
      
      dotPos.current = mousePos.current;
      
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ringLerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ringLerpFactor;

      if (dotRef.current) {
        dotRef.current.style.left = `${dotPos.current.x}px`;
        dotRef.current.style.top = `${dotPos.current.y}px`;
        dotRef.current.style.opacity = isHidden ? '0' : '1';
      }

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
        ringRef.current.style.opacity = isHidden ? '0' : '1';
      }

      // Check current section under viewport center every 10 frames (~160ms) to maximize performance
      if (frameCount % 10 === 0) {
        const sections = ['home', 'philosophy', 'work', 'projects', 'playground', 'skills', 'contact'];
        for (const secId of sections) {
          const el = document.getElementById(secId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
              setActiveSection(secId);
              break;
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHidden]);

  // Don't render on mobile/touch screens (handled by media query but good for safety)
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      <div 
        ref={dotRef} 
        className={`custom-cursor ${isHovered ? 'hovered' : ''} ${isClicked ? 'click' : ''}`}
        style={{ left: '-10px', top: '-10px' }}
      />
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${isHovered ? 'hovered' : ''} ${isClicked ? 'click' : ''}`}
        style={{ 
          left: '-40px', 
          top: '-40px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <span style={{
          position: 'absolute',
          left: '100%',
          marginLeft: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '7px',
          color: isHovered ? 'var(--color-green)' : 'var(--color-cyan)',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
          backgroundColor: 'rgba(6, 6, 8, 0.85)',
          border: '1px solid rgba(0, 242, 254, 0.2)',
          padding: '2px 6px',
          borderRadius: '3px',
          boxShadow: '0 0 8px rgba(0, 242, 254, 0.1)',
          transition: 'color 0.2s, border-color 0.2s',
          opacity: isHidden ? 0 : 0.85,
          pointerEvents: 'none'
        }}>
          {sectionLabels[activeSection] || '[SYSTEM: OK]'}
        </span>
      </div>
    </>
  );
}
