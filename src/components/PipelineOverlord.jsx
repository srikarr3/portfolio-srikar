import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, AlertTriangle, ShieldCheck, Database, Award } from 'lucide-react';

export default function PipelineOverlord() {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER, VICTORY
  const [score, setScore] = useState(0);
  const [warehouseHealth, setWarehouseHealth] = useState(100);
  const [dlqCount, setDlqCount] = useState(0);
  
  // Powerup/Filter States
  const [filters, setFilters] = useState({
    dedup: false,
    schemaGuard: false,
    nullPurger: false,
    bufferCache: false
  });

  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const packets = useRef([]);
  const scoreRef = useRef(0);
  const healthRef = useRef(100);
  const dlqRef = useRef(0);

  // Sync refs to draw loop
  useEffect(() => {
    scoreRef.current = score;
    healthRef.current = warehouseHealth;
    dlqRef.current = dlqCount;
  }, [score, warehouseHealth, dlqCount]);

  const startGame = () => {
    setGameState('PLAYING');
    setScore(0);
    setWarehouseHealth(100);
    setDlqCount(0);
    packets.current = [];
    setFilters({ dedup: false, schemaGuard: false, nullPurger: false, bufferCache: false });
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

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

    const packetTypes = [
      { type: 'CLEAN', color: '#00ff87', speed: 1.5, weight: 0.5 },
      { type: 'DUPLICATE', color: '#00f2fe', speed: 1.8, weight: 0.2 },
      { type: 'SCHEMA_DRIFT', color: '#ff3366', speed: 2.2, weight: 0.15 },
      { type: 'NULL_VAL', color: '#ff9f43', speed: 1.6, weight: 0.15 }
    ];

    const spawnPacket = () => {
      // Pick random type based on weight
      const rand = Math.random();
      let selectedType = packetTypes[0];
      if (rand > 0.5 && rand <= 0.7) selectedType = packetTypes[1];
      else if (rand > 0.7 && rand <= 0.85) selectedType = packetTypes[2];
      else if (rand > 0.85) selectedType = packetTypes[3];

      packets.current.push({
        x: Math.random() * (width - 40) + 20,
        y: -20,
        type: selectedType.type,
        color: selectedType.color,
        speed: selectedType.speed + (scoreRef.current * 0.02), // accelerate as score goes up
        size: selectedType.type === 'SCHEMA_DRIFT' ? 12 : 8,
        pulse: 0
      });
    };

    // Spawn packets timer
    let spawnTimer = setInterval(() => {
      // Adjust spawn rate based on Buffer Cache filter
      const maxPackets = filters.bufferCache ? 2500 : 1500;
      spawnPacket();
    }, 1500);

    // Dynamic Filter state tracking in canvas
    let currentFilters = { ...filters };

    // Canvas Draw Loop
    let frame = 0;
    const update = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Draw warehouse line at the bottom
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height - 60);
      ctx.lineTo(width, height - 60);
      ctx.stroke();

      // Warehouse label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '9px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.fillText("DESTINATION: DATA WAREHOUSE", width / 2, height - 70);

      // Update and draw packets
      packets.current.forEach((p, idx) => {
        p.pulse += 0.05;
        
        // Speed adjustment by cache buffer
        const finalSpeed = filters.bufferCache ? p.speed * 0.6 : p.speed;
        p.y += finalSpeed;

        // Auto filter checks
        if (p.type === 'DUPLICATE' && filters.dedup) {
          // Auto filter duplicate records
          packets.current.splice(idx, 1);
          setScore(s => s + 1);
          return;
        }

        if (p.type === 'NULL_VAL' && filters.nullPurger) {
          // Auto impute nulls (turns clean!)
          p.type = 'CLEAN';
          p.color = 'var(--color-green)';
        }

        if (p.type === 'SCHEMA_DRIFT' && filters.schemaGuard) {
          // Auto route to DLQ
          packets.current.splice(idx, 1);
          setDlqCount(d => d + 1);
          setScore(s => s + 1);
          return;
        }

        // Draw packet node
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10 + Math.sin(p.pulse) * 4;
        ctx.shadowColor = p.color;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw node tag
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '6px "JetBrains Mono"';
        ctx.textAlign = 'center';
        ctx.fillText(p.type, p.x, p.y - p.size - 4);

        // Check boundary crash (packet reaches the warehouse)
        if (p.y >= height - 60) {
          packets.current.splice(idx, 1);

          if (p.type === 'CLEAN') {
            setScore(s => s + 2); // Successful data yields points!
          } else if (p.type === 'DUPLICATE') {
            setWarehouseHealth(h => Math.max(0, h - 5)); // Duplicates damage storage indexes
          } else if (p.type === 'NULL_VAL') {
            setWarehouseHealth(h => Math.max(0, h - 10)); // Nulls corrupt data models
          } else if (p.type === 'SCHEMA_DRIFT') {
            setWarehouseHealth(h => Math.max(0, h - 20)); // Schema Drift breaks warehouse tables!
          }
        }
      });

      // Win / Loss evaluation
      if (healthRef.current <= 0) {
        setGameState('GAMEOVER');
      } else if (scoreRef.current >= 80) {
        setGameState('VICTORY');
      } else {
        animRef.current = requestAnimationFrame(update);
      }
    };

    update();

    // Tap/Click interaction to manual target packets
    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      packets.current.forEach((p, idx) => {
        const dist = Math.hypot(p.x - clickX, p.y - clickY);
        if (dist <= 30) {
          // Captured node! Remove and process it!
          packets.current.splice(idx, 1);
          
          if (p.type === 'SCHEMA_DRIFT') {
            // Manual DLQ routing
            setDlqCount(d => d + 1);
            setScore(s => s + 3);
          } else if (p.type === 'CLEAN') {
            // Processing clean record
            setScore(s => s + 2);
          } else {
            // Neutralized threats
            setScore(s => s + 1);
          }
        }
      });
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(spawnTimer);
      cancelAnimationFrame(animRef.current);
      if (canvas) canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [gameState, filters]);

  // UI rendering based on states
  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-medium)',
      borderRadius: '8px',
      padding: '32px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '460px'
    }}>
      
      {/* Game Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        paddingBottom: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <span className="font-mono-tech text-green" style={{ fontSize: '10px' }}>
            ARCADE_SHELL // INGEST_DEFENDER
          </span>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: '600',
            marginTop: '4px'
          }}>
            Pipeline Overlord v1.2
          </h3>
        </div>

        {gameState === 'PLAYING' && (
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            display: 'flex',
            gap: '16px'
          }}>
            <span>SCORE: <span style={{ color: '#fff', fontWeight: 'bold' }}>{score}/80</span></span>
            <span>DLQ: <span style={{ color: 'var(--color-cyan)', fontWeight: 'bold' }}>{dlqCount}</span></span>
            <span style={{
              color: warehouseHealth > 40 ? 'var(--color-green)' : 'var(--color-red)'
            }}>
              HEALTH: {warehouseHealth}%
            </span>
          </div>
        )}
      </div>

      {/* Screen Render Switch */}
      {gameState === 'START' && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px 0'
        }}>
          <Database size={48} className="text-cyan animate-pulse" style={{ marginBottom: '24px' }} />
          <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
            Pipeline Ingest Shield Override
          </h4>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            maxWidth: '450px',
            lineHeight: '1.5',
            marginBottom: '32px'
          }}>
            You are the on-call data engineer. Messy data packets are falling. Enable automated filters or click/tap incoming records directly to secure the data warehouse and reach 80 ingestion credits!
          </p>
          <button onClick={startGame} className="btn-premium btn-cyan interactive">
            <Play size={14} />
            Start Pipeline Diagnostic
          </button>
        </div>
      )}

      {gameState === 'PLAYING' && (
        <div style={{ display: 'flex', gap: '24px', flex: 1, flexDirection: 'column' }}>
          
          {/* Main Game Screen Canvas */}
          <div style={{
            flex: 1,
            backgroundColor: '#050508',
            border: '1px solid rgba(255, 255, 255, 0.03)',
            borderRadius: '6px',
            position: 'relative',
            height: '240px',
            overflow: 'hidden'
          }}>
            
            <canvas 
              ref={canvasRef} 
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                zIndex: 2,
                cursor: 'crosshair'
              }}
            />

            <div style={{
              position: 'absolute',
              top: '12px', left: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              color: 'var(--text-muted)',
              zIndex: 3,
              letterSpacing: '0.05em'
            }}>
              CLICK TARGET PACKETS DIRECTLY TO MANUALLY PURGE THREATS
            </div>
          </div>

          {/* Action Filter Panel */}
          <div>
            <div className="font-mono-tech" style={{ fontSize: '8px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              ACTIVE_FILTERS // COMPUTE_SHIELDS
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '10px'
            }}>
              {/* Dedup filter */}
              <button
                onClick={() => setFilters({ ...filters, dedup: !filters.dedup })}
                className="interactive"
                style={{
                  padding: '8px 12px',
                  backgroundColor: filters.dedup ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255,255,255,0.01)',
                  border: '1px solid',
                  borderColor: filters.dedup ? 'var(--color-cyan)' : 'rgba(255, 255, 255, 0.05)',
                  color: filters.dedup ? 'var(--color-cyan)' : 'var(--text-secondary)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'var(--transition-fast)'
                }}
              >
                [ ] DEDUPLICATOR {filters.dedup ? "ON" : "OFF"}
              </button>

              {/* Schema guard */}
              <button
                onClick={() => setFilters({ ...filters, schemaGuard: !filters.schemaGuard })}
                className="interactive"
                style={{
                  padding: '8px 12px',
                  backgroundColor: filters.schemaGuard ? 'rgba(0, 255, 135, 0.1)' : 'rgba(255,255,255,0.01)',
                  border: '1px solid',
                  borderColor: filters.schemaGuard ? 'var(--color-green)' : 'rgba(255, 255, 255, 0.05)',
                  color: filters.schemaGuard ? 'var(--color-green)' : 'var(--text-secondary)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'var(--transition-fast)'
                }}
              >
                [ ] SCHEMA GUARD {filters.schemaGuard ? "ON" : "OFF"}
              </button>

              {/* Null purger */}
              <button
                onClick={() => setFilters({ ...filters, nullPurger: !filters.nullPurger })}
                className="interactive"
                style={{
                  padding: '8px 12px',
                  backgroundColor: filters.nullPurger ? 'rgba(255, 159, 67, 0.1)' : 'rgba(255,255,255,0.01)',
                  border: '1px solid',
                  borderColor: filters.nullPurger ? 'var(--color-amber)' : 'rgba(255, 255, 255, 0.05)',
                  color: filters.nullPurger ? 'var(--color-amber)' : 'var(--text-secondary)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'var(--transition-fast)'
                }}
              >
                [ ] NULL FILLER {filters.nullPurger ? "ON" : "OFF"}
              </button>

              {/* Buffer rate limit */}
              <button
                onClick={() => setFilters({ ...filters, bufferCache: !filters.bufferCache })}
                className="interactive"
                style={{
                  padding: '8px 12px',
                  backgroundColor: filters.bufferCache ? 'rgba(161, 140, 209, 0.15)' : 'rgba(255,255,255,0.01)',
                  border: '1px solid',
                  borderColor: filters.bufferCache ? 'var(--color-purple)' : 'rgba(255, 255, 255, 0.05)',
                  color: filters.bufferCache ? 'var(--color-purple)' : 'var(--text-secondary)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'var(--transition-fast)'
                }}
              >
                [ ] RATE LIMITER {filters.bufferCache ? "ON" : "OFF"}
              </button>
            </div>
          </div>

        </div>
      )}

      {gameState === 'GAMEOVER' && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px 0'
        }}>
          <AlertTriangle size={48} className="text-red animate-bounce" style={{ marginBottom: '24px' }} />
          <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: '12px', color: 'var(--color-red)' }}>
            Pipeline Crashed: Database schema corrupted!
          </h4>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            maxWidth: '450px',
            lineHeight: '1.5',
            marginBottom: '32px'
          }}>
            Critical system alerts: Warehouse health dropped to 0%. Schema drifts or duplicate records breached your database parameters. Take another shift and check your filters next time!
          </p>
          <button onClick={startGame} className="btn-premium interactive">
            <RotateCcw size={14} />
            Initialize Safe Hotfix
          </button>
        </div>
      )}

      {gameState === 'VICTORY' && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px 0'
        }}>
          <Award size={48} className="text-green glow-pulsing" style={{ marginBottom: '24px', color: 'var(--color-green)' }} />
          <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: '12px', color: 'var(--color-green)' }}>
            Pipeline Verified: 100% Ingest Reliability!
          </h4>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            maxWidth: '450px',
            lineHeight: '1.5',
            marginBottom: '32px'
          }}>
            Systems stable. All schema drifts successfully rerouted to the Dead Letter Queue. Deduplication processes completed. Srikar Mandava's diagnostic tests are fully passed. You've earned the Senior DE title!
          </p>
          <button onClick={startGame} className="btn-premium btn-cyan interactive">
            <RotateCcw size={14} />
            Re-run Diagnostic Simulation
          </button>
        </div>
      )}

    </div>
  );
}
