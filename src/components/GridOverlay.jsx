import React, { useEffect, useRef } from 'react';

export default function GridOverlay({ crtActive }) {
  const bgCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // ETL Background Data Stream Configuration
    // We define vertical pipeline buses running down the page
    const pipelines = [
      { xPct: 0.08, label: "INGEST_BUS_A", speed: 0.6, color: "rgba(0, 242, 254, 0.12)" }, 
      { xPct: 0.22, label: "STREAM_BUS_B", speed: 1.0, color: "rgba(0, 255, 135, 0.12)" },
      { xPct: 0.38, label: "BATCH_BUS_C", speed: 0.5, color: "rgba(161, 140, 209, 0.12)" },
      { xPct: 0.62, label: "STAGE_BUS_D", speed: 0.7, color: "rgba(0, 242, 254, 0.12)" },
      { xPct: 0.78, label: "TRANSFORM_BUS_E", speed: 0.9, color: "rgba(0, 255, 135, 0.12)" },
      { xPct: 0.92, label: "LOAD_BUS_F", speed: 0.5, color: "rgba(255, 159, 67, 0.12)" }
    ];

    const deHumorLogs = [
      "DROP DATABASE prod; -- oops",
      "SELECT * FROM brain WHERE coffee > 0;",
      "[FATAL] Ingest crashed: API out of caffeine",
      "git commit -m 'fixed final final fix v12'",
      "JSON_ERROR: Unexpected character '💸'",
      "[WARN] Schema drift: user_age is now string?",
      "dbt test: expected 0 nulls, got 14,000,000",
      "[INFO] 1.4Cr records ingested successfully",
      "SELECT count(secrets) FROM company_dwh;",
      "[SUCCESS] Pipeline self-healed via auto-retry",
      "Airflow: DAG failed 3 times (retrying...)",
      "[INFO] Data quality score: 100% (miracle)",
      "dbt run --force-magic",
      "docker run -it srikar/data-genius",
      "CircuitBreaker: TRIP (system exhausted)",
      "SELECT * FROM users WHERE brain IS NULL;",
      "spark.read.parquet('s3://messy-data/raw')",
      "df.filter(col('null_values') === 0)",
      "[SYSTEM] Circuits healthy. pipelines optimal."
    ];

    const logsList = [];

    const spawnLog = (pipelineIdx, startY = -40) => {
      const pipe = pipelines[pipelineIdx];
      const logText = deHumorLogs[Math.floor(Math.random() * deHumorLogs.length)];
      
      logsList.push({
        pipelineIndex: pipelineIdx,
        y: startY,
        speed: pipe.speed * (0.8 + Math.random() * 0.4),
        text: logText,
        color: pipe.color
      });
    };

    // Pre-populate logs across height
    for (let i = 0; i < 20; i++) {
      const pipeIdx = Math.floor(Math.random() * pipelines.length);
      spawnLog(pipeIdx, Math.random() * height);
    }

    // Capture scrolling details to dynamically accelerate streams
    let lastScrollY = window.scrollY;
    let scrollSpeed = 0;

    const handleScrollSpeed = () => {
      const currentScrollY = window.scrollY;
      scrollSpeed = Math.min(15, Math.abs(currentScrollY - lastScrollY) * 0.25);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScrollSpeed, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Validation Gates (Horizontal process triggers)
    const gates = [
      { yPct: 0.25, label: "SCHEMA_VALIDATION_GATE" },
      { yPct: 0.60, label: "TRANSFORM_TRANSIT_GATE" }
    ];

    let frame = 0;

    // Draw loop
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Decelerate scroll speed impact slowly
      scrollSpeed *= 0.95;

      // Draw custom ultra-subtle creative background grid with funny data easter eggs!
      const gridStep = 48;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let x = gridStep; x < width; x += gridStep) {
        for (let y = gridStep; y < height; y += gridStep) {
          // Deterministic hash based on grid coordinates to prevent flicker across frames
          const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
          const randVal = seed - Math.floor(seed);

          if (randVal < 0.95) {
            // 95% standard ultra-subtle dot (very soft white)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // 5% funny, creative data engineering easter eggs!
            const eggIndex = Math.floor(randVal * 1000) % 10;
            ctx.font = '7px "JetBrains Mono"';
            
            switch (eggIndex) {
              case 0:
                ctx.fillStyle = 'rgba(0, 242, 254, 0.04)'; // cyan semi-colon
                ctx.fillText(';', x, y);
                break;
              case 1:
                ctx.fillStyle = 'rgba(255, 159, 67, 0.05)'; // orange coffee
                ctx.fillText('☕', x, y);
                break;
              case 2:
                ctx.fillStyle = 'rgba(255, 51, 102, 0.05)'; // red bug
                ctx.fillText('🐛', x, y);
                break;
              case 3:
                ctx.fillStyle = 'rgba(0, 255, 135, 0.04)'; // green database
                ctx.fillText('💾', x, y);
                break;
              case 4:
                ctx.fillStyle = 'rgba(161, 140, 209, 0.05)'; // purple null
                ctx.fillText('null', x, y);
                break;
              case 5:
                ctx.fillStyle = 'rgba(255, 159, 67, 0.04)'; // orange S3
                ctx.fillText('S3', x, y);
                break;
              case 6:
                ctx.fillStyle = 'rgba(0, 242, 254, 0.045)'; // cyan DAG
                ctx.fillText('DAG', x, y);
                break;
              case 7:
                ctx.fillStyle = 'rgba(255, 51, 102, 0.05)'; // red NaN
                ctx.fillText('NaN', x, y);
                break;
              case 8:
                ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'; // white 0
                ctx.fillText('0', x, y);
                break;
              case 9:
                ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'; // white 1
                ctx.fillText('1', x, y);
                break;
              default:
                break;
            }
          }
        }
      }

      // 1. Draw horizontal processing gates
      gates.forEach(gate => {
        const gateY = gate.yPct * height;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
        ctx.setLineDash([4, 12]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, gateY);
        ctx.lineTo(width, gateY);
        ctx.stroke();
        ctx.setLineDash([]); // reset

        // Label on the gate
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.font = '7px "JetBrains Mono"';
        ctx.textAlign = 'right';
        ctx.fillText(gate.label, width - 24, gateY - 4);
      });

      // 2. Draw and process pipelines
      pipelines.forEach((pipe, pipeIdx) => {
        const pipeX = pipe.xPct * width;

        // Draw pipeline bus line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pipeX, 0);
        ctx.lineTo(pipeX, height);
        ctx.stroke();

        // Draw pipeline label at the top
        ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
        ctx.font = '6px "JetBrains Mono"';
        ctx.textAlign = 'center';
        ctx.fillText(pipe.label, pipeX, 15);

        // Spawn new logs occasionally
        if (frame % 100 === 0 && logsList.filter(l => l.pipelineIndex === pipeIdx).length < 5) {
          if (Math.random() > 0.4) spawnLog(pipeIdx);
        }
      });

      // 3. Process glowing text logs
      logsList.forEach((log, idx) => {
        const pipe = pipelines[log.pipelineIndex];
        const pipeX = pipe.xPct * width;

        // Apply scroll-induced acceleration
        log.y += log.speed + scrollSpeed;

        // Re-spawn logs that fall off the bottom of the screen
        if (log.y > height + 40) {
          logsList.splice(idx, 1);
          spawnLog(log.pipelineIndex);
          return;
        }

        // Highlight slightly when passing horizontal gates
        let isPassingGate = false;
        gates.forEach(gate => {
          const gateY = gate.yPct * height;
          if (Math.abs(log.y - gateY) < 15) {
            isPassingGate = true;
          }
        });

        // Set subtle font fill
        ctx.font = '8px "JetBrains Mono"';
        ctx.textAlign = 'center';

        if (isPassingGate) {
          // Glow slightly brighter inside schema gates
          ctx.fillStyle = log.color.replace('0.12', '0.45'); 
        } else {
          ctx.fillStyle = log.color;
        }

        ctx.fillText(log.text, pipeX, log.y);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('scroll', handleScrollSpeed);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* High-Performance Canvas for slowly drifting data meshes */}
      <canvas 
        ref={bgCanvasRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.95
        }}
      />

      {/* Dynamic Background Grid and overlay Elements */}
      <div className="dot-grid" style={{ zIndex: 1 }} />
      <div className="ambient-glow" style={{ zIndex: 1 }} />
      
      {/* Corner Technical Aesthetics */}
      <div className="tech-corners-frame" style={{
        position: 'fixed',
        inset: '24px',
        border: '1px solid rgba(255, 255, 255, 0.02)',
        pointerEvents: 'none',
        zIndex: 5,
      }}>
        {/* Top-Left Corner Tick */}
        <div style={{
          position: 'absolute',
          top: '-1px', left: '-1px',
          width: '12px', height: '12px',
          borderLeft: '2px solid var(--color-cyan)',
          borderTop: '2px solid var(--color-cyan)',
        }} />
        {/* Top-Right Corner Tick */}
        <div style={{
          position: 'absolute',
          top: '-1px', right: '-1px',
          width: '12px', height: '12px',
          borderRight: '2px solid var(--color-cyan)',
          borderTop: '2px solid var(--color-cyan)',
        }} />
        {/* Bottom-Left Corner Tick */}
        <div style={{
          position: 'absolute',
          bottom: '-1px', left: '-1px',
          width: '12px', height: '12px',
          borderLeft: '2px solid var(--color-cyan)',
          borderBottom: '2px solid var(--color-cyan)',
        }} />
        {/* Bottom-Right Corner Tick */}
        <div style={{
          position: 'absolute',
          bottom: '-1px', right: '-1px',
          width: '12px', height: '12px',
          borderRight: '2px solid var(--color-cyan)',
          borderBottom: '2px solid var(--color-cyan)',
        }} />
      </div>

      {/* Retro CRT monitor scanning visuals */}
      {crtActive && (
        <>
          <div className="crt-scanline" />
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '48px',
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid var(--color-green)',
            padding: '4px 8px',
            fontSize: '10px',
            color: 'var(--color-green)',
            fontFamily: 'var(--font-mono)',
            borderRadius: '4px',
            pointerEvents: 'none',
            letterSpacing: '0.1em'
          }}>
            SYSTEM OPTIMIZED: RETRO_CRT_MODE = ENABLED
          </div>
        </>
      )}
    </>
  );
}
