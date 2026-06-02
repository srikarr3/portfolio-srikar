import React, { useEffect, useRef } from 'react';
import { FileText, ArrowDownRight, Terminal } from 'lucide-react';

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Static pipelines (network nodes)
    const nodes = [
      { id: 1, x: width * 0.15, y: height * 0.35, size: 6, label: 'API INGEST', pulseTime: 0 },
      { id: 2, x: width * 0.35, y: height * 0.25, size: 8, label: 'AIRFLOW DAG', pulseTime: 1.5 },
      { id: 3, x: width * 0.35, y: height * 0.55, size: 7, label: 'KAFKA STREAM', pulseTime: 0.8 },
      { id: 4, x: width * 0.55, y: height * 0.4, size: 10, label: 'DBT TRANSFORM', pulseTime: 2.2 },
      { id: 5, x: width * 0.75, y: height * 0.3, size: 9, label: 'SNOWFLAKE DWH', pulseTime: 3 },
      { id: 6, x: width * 0.75, y: height * 0.6, size: 8, label: 'POSTGRES DB', pulseTime: 1.2 },
      { id: 7, x: width * 0.9, y: height * 0.45, size: 12, label: 'ANALYTICS', pulseTime: 4 }
    ];

    // Pipeline Connections (directed edges)
    const connections = [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 4, to: 6 },
      { from: 5, to: 7 },
      { from: 6, to: 7 }
    ];

    // Flying packets
    let packets = [];

    // Add packets regularly
    const spawnPacket = () => {
      const connIndex = Math.floor(Math.random() * connections.length);
      const conn = connections[connIndex];
      const startNode = nodes.find(n => n.id === conn.from);
      const endNode = nodes.find(n => n.id === conn.to);
      
      if (startNode && endNode) {
        packets.push({
          x: startNode.x,
          y: startNode.y,
          startX: startNode.x,
          startY: startNode.y,
          endX: endNode.x,
          endY: endNode.y,
          progress: 0,
          speed: 0.005 + Math.random() * 0.01,
          size: 2 + Math.random() * 3,
          color: Math.random() > 0.15 ? '#00f2fe' : '#00ff87'
        });
      }
    };

    // User Interactive Packets
    const spawnInteractivePacket = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;
      
      // Find closest node to the click
      let closestNode = null;
      let minDist = 120;
      
      nodes.forEach(node => {
        const dist = Math.hypot(node.x - clickX, node.y - clickY);
        if (dist < minDist) {
          minDist = dist;
          closestNode = node;
        }
      });

      if (closestNode) {
        // Spawn packets from this node to all outgoing connections
        connections.forEach(conn => {
          if (conn.from === closestNode.id) {
            const endNode = nodes.find(n => n.id === conn.to);
            packets.push({
              x: closestNode.x,
              y: closestNode.y,
              startX: closestNode.x,
              startY: closestNode.y,
              endX: endNode.x,
              endY: endNode.y,
              progress: 0,
              speed: 0.02, // faster interactive packet
              size: 5,
              color: '#ff9f43'
            });
          }
        });
      }
    };

    // Handle clicks to inject packets
    const handleCanvasClick = (e) => spawnInteractivePacket(e.clientX, e.clientY);
    canvas.addEventListener('click', handleCanvasClick);

    // Initial pack of packets
    for (let i = 0; i < 8; i++) spawnPacket();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      
      // Update coordinates proportionally on resize
      nodes[0].x = width * 0.15; nodes[0].y = height * 0.35;
      nodes[1].x = width * 0.35; nodes[1].y = height * 0.25;
      nodes[2].x = width * 0.35; nodes[2].y = height * 0.55;
      nodes[3].x = width * 0.55; nodes[3].y = height * 0.4;
      nodes[4].x = width * 0.75; nodes[4].y = height * 0.3;
      nodes[5].x = width * 0.75; nodes[5].y = height * 0.6;
      nodes[6].x = width * 0.9;  nodes[6].y = height * 0.45;
    };

    window.addEventListener('resize', handleResize);

    let frameCount = 0;

    // Draw loop
    const draw = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw static grid overlay inside the canvas
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw connections (lines)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 2;
      connections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (fromNode && toNode) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
        }
      });

      // 3. Draw flowing packets
      packets.forEach((packet, index) => {
        packet.progress += packet.speed;
        if (packet.progress >= 1) {
          // Packet reached destination, spawn a random one and remove this
          packets.splice(index, 1);
          spawnPacket();
          return;
        }

        // Calculate position along path
        packet.x = packet.startX + (packet.endX - packet.startX) * packet.progress;
        packet.y = packet.startY + (packet.endY - packet.startY) * packet.progress;

        // Draw packet glow
        const glowColor = packet.color === '#00f2fe' ? 'rgba(0, 242, 254, 0.4)' : packet.color === '#00ff87' ? 'rgba(0, 255, 135, 0.4)' : 'rgba(255, 159, 67, 0.4)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = glowColor;
        ctx.fillStyle = packet.color;
        
        ctx.beginPath();
        ctx.arc(packet.x, packet.y, packet.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      });

      // Spawn raw packets on periodic intervals
      if (frameCount % 45 === 0 && packets.length < 15) {
        spawnPacket();
      }

      // 4. Draw nodes (points)
      nodes.forEach(node => {
        const pulse = Math.sin(frameCount * 0.05 + node.pulseTime) * 3;
        
        // Node halo glow
        ctx.shadowBlur = 15 + pulse;
        ctx.shadowColor = 'rgba(0, 242, 254, 0.15)';
        ctx.fillStyle = 'rgba(14, 14, 18, 0.9)';
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + pulse/2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0; // reset

        // Draw core node point
        ctx.fillStyle = '#00f2fe';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Node Label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '9px "JetBrains Mono"';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - node.size - 10);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 8%',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      {/* Background Interactive Lineage Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          opacity: 0.8,
          pointerEvents: 'auto'
        }}
      />

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '900px',
        pointerEvents: 'none' // Click passes through to canvas
      }}>
        {/* Confident Subtitle tag */}
        <div 
          className="font-mono-tech text-cyan flicker" 
          style={{ 
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Terminal size={14} />
          SYSTEM_INGEST_INIT // ACTIVE_PIPELINE
        </div>

        {/* Massive oversized text */}
        <h1 
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 9.5vw, 6.5rem)',
            fontWeight: '700',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}
        >
          <span className="text-gradient">SRIKAR</span>
          <br />
          <span className="text-gradient" style={{ opacity: 0.85 }}>MANDAVA</span>
        </h1>

        {/* Technical Sub-Head */}
        <h2 
          className="font-mono-tech"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
            color: 'var(--color-green)',
            letterSpacing: '0.25em',
            marginBottom: '32px',
            fontWeight: '500'
          }}
        >
          DATA ENGINEER
        </h2>

        {/* confident concise phrasing */}
        <p 
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
            color: 'var(--text-secondary)',
            fontWeight: '300',
            lineHeight: '1.45',
            maxWidth: '650px',
            marginBottom: '48px',
            borderLeft: '2px solid rgba(0, 242, 254, 0.25)',
            paddingLeft: '20px'
          }}
        >
          I build robust pipelines that turn raw records into reliable, production-grade decisions. Focused on scalability, speed, and recovery.
        </p>

        {/* Buttons - CTA (ensure buttons restore pointerEvents to capture clicks) */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          pointerEvents: 'auto'
        }}>
          <button 
            onClick={() => scrollToSection('playground')}
            className="btn-premium btn-cyan interactive"
          >
            Launch Command Center
            <ArrowDownRight size={16} />
          </button>
          
          <a 
            href="https://github.com/srikarr3" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-premium interactive"
          >
            <GithubIcon size={16} />
            GitHub
          </a>

          <a 
            href="https://www.linkedin.com/in/srikar-mandava-60b4bb24b/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-premium interactive"
          >
            <LinkedinIcon size={16} />
            LinkedIn
          </a>

          {/* Checks for Srikar-Mandava-DE.pdf file directly in workspace */}
          <a 
            href="/Srikar-Mandava-DE.pdf" 
            download="Srikar_Mandava_Resume.pdf"
            className="btn-premium interactive"
          >
            <FileText size={16} />
            Resume
          </a>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div 
        onClick={() => scrollToSection('work')}
        className="interactive"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.1em',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        <span>SCROLL TO MONITOR</span>
        <ArrowDownRight size={14} style={{ transform: 'rotate(45deg)', animation: 'bounceScroll 2s infinite' }} />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounceScroll {
          0%, 100% { transform: rotate(45deg) translateY(0); opacity: 0.4; }
          50% { transform: rotate(45deg) translateY(6px); opacity: 1; }
        }
      `}} />
    </section>
  );
}
