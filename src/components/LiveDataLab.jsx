import React, { useState, useEffect, useRef } from 'react';
import { ToggleLeft, ToggleRight, Play, Pause, BarChart2, ShieldAlert, Cpu } from 'lucide-react';

export default function LiveDataLab() {
  const [isStreaming, setIsStreaming] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Simulated State Metrics
  const [metrics, setMetrics] = useState({
    throughput: 450,
    latency: 240,
    freshness: "99.9%",
    cost: 1.25,
    integrity: 100
  });

  const animFrame = useRef(null);
  const particles = useRef([]);
  const canvasRef = useRef(null);

  // Lineage nodes
  const nodes = [
    { name: "Raw Logs", x: 60, y: 120, label: "API_INGEST" },
    { name: "Airflow Ingest", x: 200, y: 60, label: "DAG_MONITOR" },
    { name: "Blob Landing", x: 340, y: 120, label: "ADLS_GEN2" },
    { name: "dbt Core", x: 480, y: 60, label: "VALIDATION" },
    { name: "Snowflake DWH", x: 620, y: 120, label: "GOLD_TABLES" },
    { name: "Analytics", x: 740, y: 120, label: "POWER_BI" }
  ];

  // Connections
  const paths = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 }
  ];

  useEffect(() => {
    // Metric simulation loop
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (isStreaming) {
        // Streaming: low latency, high freshness, constant throughput, high cost
        setMetrics({
          throughput: Math.floor(180 + Math.random() * 80),
          latency: (0.12 + Math.random() * 0.05).toFixed(2) + "s",
          freshness: "Real-Time (50ms)",
          cost: (2.4 + Math.random() * 0.3).toFixed(2),
          integrity: (99.8 + Math.random() * 0.2).toFixed(2)
        });
      } else {
        // Batch: spikes/high latency, 24h freshness, bulk records, low cost
        setMetrics({
          throughput: Math.random() > 0.85 ? 12500 : 0,
          latency: "24.0h",
          freshness: "T+1 (Daily Load)",
          cost: (0.42 + Math.random() * 0.05).toFixed(2),
          integrity: 100
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStreaming, isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const spawnParticle = (fromIdx, toIdx, bulk = false) => {
      const fromNode = nodes[fromIdx];
      const toNode = nodes[toIdx];
      
      // Scale coordinates relative to canvas width
      const scaleX = (x) => (x / 800) * width;
      const scaleY = (y) => (y / 240) * height;

      particles.current.push({
        x: scaleX(fromNode.x),
        y: scaleY(fromNode.y),
        startX: scaleX(fromNode.x),
        startY: scaleY(fromNode.y),
        endX: scaleX(toNode.x),
        endY: scaleY(toNode.y),
        progress: 0,
        speed: isStreaming ? (0.01 + Math.random() * 0.01) : 0.005,
        size: bulk ? (4 + Math.random() * 4) : (2 + Math.random() * 2),
        color: isStreaming ? '#00ff87' : '#00f2fe',
        from: fromIdx,
        to: toIdx
      });
    };

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Scale calculations helper
      const scaleX = (x) => (x / 800) * width;
      const scaleY = (y) => (y / 240) * height;

      // 1. Draw DAG Connection lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 2;
      paths.forEach(p => {
        const from = nodes[p.from];
        const to = nodes[p.to];
        ctx.beginPath();
        ctx.moveTo(scaleX(from.x), scaleY(from.y));
        ctx.lineTo(scaleX(to.x), scaleY(to.y));
        ctx.stroke();
      });

      // 2. Spawn particles based on streaming mode
      if (isPlaying) {
        if (isStreaming) {
          // Streaming mode: Spawns continuously
          if (frame % 8 === 0) {
            paths.forEach((p, idx) => {
              if (Math.random() > 0.4) spawnParticle(p.from, p.to);
            });
          }
        } else {
          // Batch mode: Spawns in large waves periodically
          if (frame % 120 === 0) {
            // Spawn large burst of data packets flowing down paths
            paths.forEach((p) => {
              for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                  spawnParticle(p.from, p.to, true);
                }, i * 150);
              }
            });
          }
        }
      }

      // 3. Draw particles
      particles.current.forEach((p, index) => {
        if (!isPlaying) return;
        
        p.progress += p.speed;
        if (p.progress >= 1) {
          particles.current.splice(index, 1);
          return;
        }

        p.x = p.startX + (p.endX - p.startX) * p.progress;
        p.y = p.startY + (p.endY - p.startY) * p.progress;

        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Draw node blocks
      nodes.forEach(node => {
        const x = scaleX(node.x);
        const y = scaleY(node.y);

        // Box frame
        ctx.fillStyle = '#0e0e12'; // surface solid background
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x - 50, y - 24, 100, 48, 4);
        ctx.fill();
        ctx.stroke();

        // Node title
        ctx.fillStyle = '#fff';
        ctx.font = '10px "Inter"';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, x, y + 2);

        // Technical category
        ctx.fillStyle = '#8e8e9c'; // text-secondary solid
        ctx.font = '7px "JetBrains Mono"';
        ctx.fillText(node.label, x, y - 10);
      });

      animFrame.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrame.current);
    };
  }, [isStreaming, isPlaying]);

  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-medium)',
      borderRadius: '8px',
      padding: '32px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
    }}>
      
      {/* Control Panel Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        paddingBottom: '20px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span className="font-mono-tech text-cyan" style={{ fontSize: '10px' }}>
            ETL_ORCHESTRATION // MONITORING_LAB
          </span>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: '600',
            marginTop: '4px'
          }}>
            Data Flow Pipeline Lab
          </h3>
        </div>

        {/* Dashboard Switches */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Pause / Play */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="interactive"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          {/* Batch vs Stream Mode Switch */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(255,255,255,0.02)',
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: !isStreaming ? 'var(--color-cyan)' : 'var(--text-muted)',
              fontWeight: 'bold'
            }}>
              BATCH (T+1)
            </span>
            
            <button 
              onClick={() => {
                setIsStreaming(!isStreaming);
                particles.current = []; // Wipe old particles
              }}
              className="interactive"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-cyan)',
                cursor: 'pointer',
                display: 'flex'
              }}
            >
              {isStreaming ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
            </button>

            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: isStreaming ? 'var(--color-green)' : 'var(--text-muted)',
              fontWeight: 'bold'
            }}>
              STREAMING
            </span>
          </div>
        </div>
      </div>

      {/* Graphical Lineage Canvas */}
      <div style={{
        backgroundColor: '#07070a',
        border: '1px solid rgba(255, 255, 255, 0.03)',
        borderRadius: '6px',
        position: 'relative',
        height: '240px',
        marginBottom: '24px',
        overflow: 'hidden'
      }}>
        <canvas 
          ref={canvasRef} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2
          }}
        />
      </div>

      {/* Live System Metrics grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '16px'
      }}>
        
        {/* Throughput */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '16px',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            <Cpu size={14} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.05em' }}>THROUGHPUT</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 'bold' }}>
            {metrics.throughput} <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>rec/s</span>
          </div>
        </div>

        {/* Latency */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '16px',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            <ToggleRight size={14} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.05em' }}>LATENCY</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 'bold', color: 'var(--color-cyan)' }}>
            {metrics.latency}
          </div>
        </div>

        {/* Freshness */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '16px',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            <BarChart2 size={14} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.05em' }}>DATA_FRESHNESS</span>
          </div>
          <div style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold', color: 'var(--color-green)', marginTop: '4px' }}>
            {metrics.freshness}
          </div>
        </div>

        {/* Compute Cost */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '16px',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            <ShieldAlert size={14} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.05em' }}>COMPUTE_COST</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 'bold', color: 'var(--color-amber)' }}>
            ${metrics.cost} <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>/ hr</span>
          </div>
        </div>

      </div>

    </div>
  );
}
