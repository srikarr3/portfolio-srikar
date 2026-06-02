import React, { useState } from 'react';
import { ShieldCheck, Zap, Database, RotateCcw, AlertTriangle } from 'lucide-react';

export default function Philosophy() {
  const [activeLogIndex, setActiveLogIndex] = useState(null);

  const philosophies = [
    {
      title: "Good pipelines do not just run. They recover.",
      icon: <RotateCcw className="text-cyan" size={20} />,
      accent: "var(--color-cyan)",
      logs: [
        { time: "09:41:02", type: "INFO", message: "Batch pipeline initialized. Ingesting records..." },
        { time: "09:41:04", type: "WARN", message: "API connection throttled (429 Too Many Requests)." },
        { time: "09:41:05", type: "SYSTEM", message: "Activating circuit breaker. Backoff wait: 1.5s." },
        { time: "09:41:07", type: "SYSTEM", message: "Retrying connection (Attempt 1/3)... Connected." },
        { time: "09:41:08", type: "SUCCESS", message: "1.4Cr records processed. DLQ status: 0 packets." }
      ]
    },
    {
      title: "Data quality is a product feature.",
      icon: <ShieldCheck className="text-green" size={20} />,
      accent: "var(--color-green)",
      logs: [
        { time: "10:02:11", type: "INFO", message: "Triggering dbt validation layer..." },
        { time: "10:02:12", type: "TEST", message: "Running: test_unique_users_id... PASSED" },
        { time: "10:02:13", type: "TEST", message: "Running: test_not_null_transaction_amount... PASSED" },
        { time: "10:02:14", type: "WARN", message: "Running: test_accepted_values_payment_status... 2 records null." },
        { time: "10:02:15", type: "SYSTEM", message: "Imputing null values with defaults. Validated: 100%." }
      ]
    },
    {
      title: "Speed matters. Reliability lasts.",
      icon: <Zap className="text-amber" size={20} />,
      accent: "var(--color-amber)",
      logs: [
        { time: "11:15:30", type: "INFO", message: "Databricks cluster spin-up requested..." },
        { time: "11:15:33", type: "SYSTEM", message: "Partition pruning active: date_key IN ('2026-06-02')." },
        { time: "11:15:35", type: "INFO", message: "Shuffling reduction: Broadcast joins configured." },
        { time: "11:15:36", type: "SUCCESS", message: "PySpark execution complete in 6.4s (saved 75% compute cost)." },
        { time: "11:15:37", type: "INFO", message: "Incremental load committed to Snowflake Delta Lake." }
      ]
    },
    {
      title: "Design systems that make trust repeatable.",
      icon: <Database className="text-purple" size={20} />,
      accent: "var(--color-purple)",
      logs: [
        { time: "12:30:00", type: "INFO", message: "Starting file ingestion monitor daemon..." },
        { time: "12:30:01", type: "INFO", message: "Verifying checksum for incoming CSV sales dumps..." },
        { time: "12:30:02", type: "SUCCESS", message: "SHA-256 match confirmed. Safe for processing." },
        { time: "12:30:03", type: "INFO", message: "Triggering automated validation: row count verification." },
        { time: "12:30:04", type: "SUCCESS", message: "Reconciliation verified. Data state: SECURE." }
      ]
    }
  ];

  return (
    <section
      id="philosophy"
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'transparent',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{ marginBottom: '60px' }}>
          <div className="font-mono-tech text-cyan" style={{ marginBottom: '8px' }}>
            ENGINEERING_PRINCIPLES // CORE_ETHOS
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: '600',
            lineHeight: 1.1,
            maxWidth: '600px'
          }}>
            Confident Architecture.
            <br />
            <span style={{ color: 'var(--text-secondary)' }}>Proven Reliability.</span>
          </h2>
        </div>

        {/* Philosophy Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {philosophies.map((phil, index) => {
            const isHovered = activeLogIndex === index;

            return (
              <div
                key={index}
                className="command-card interactive"
                onMouseEnter={() => setActiveLogIndex(index)}
                onMouseLeave={() => setActiveLogIndex(null)}
                style={{
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '340px',
                  backgroundColor: 'var(--bg-surface)',
                  overflow: 'hidden',
                  borderColor: isHovered ? phil.accent : 'var(--border-light)',
                  boxShadow: isHovered ? `0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 10px ${phil.accent}11` : 'none',
                }}
              >
                {/* Visual Top border glow on hover */}
                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '2px',
                    background: phil.accent
                  }} />
                )}

                {/* Top card block */}
                <div>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '32px',
                    borderColor: isHovered ? phil.accent : 'var(--border-light)',
                    transition: 'var(--transition-fast)'
                  }}>
                    {phil.icon}
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.45rem',
                    lineHeight: '1.3',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em'
                  }}>
                    "{phil.title}"
                  </h3>
                </div>

                {/* Bottom interactive card block: Simulated Terminal Log */}
                <div style={{
                  marginTop: '32px',
                  position: 'relative',
                  height: '110px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}>
                  {/* Default State Indicator */}
                  {!isHovered && (
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.05em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span className="glow-pulsing" style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--text-muted)'
                      }} />
                      HOVER TO VERIFY CORE METRICS
                    </div>
                  )}

                  {/* Log stream active on hover */}
                  <div style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.3s var(--transition-fast), transform 0.3s var(--transition-fast)',
                    pointerEvents: 'none',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: '4px',
                    padding: '8px',
                    height: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    gap: '4px'
                  }}>
                    {phil.logs.map((log, logIndex) => (
                      <div
                        key={logIndex}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '8px',
                          lineHeight: 1.2,
                          whiteSpace: 'nowrap',
                          color:
                            log.type === 'WARN' ? 'var(--color-amber)' :
                              log.type === 'SUCCESS' ? 'var(--color-green)' :
                                log.type === 'SYSTEM' ? 'var(--color-cyan)' : 'var(--text-secondary)'
                        }}
                      >
                        <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>[{log.time}]</span>
                        <span style={{ fontWeight: 'bold', marginRight: '4px' }}>{log.type}:</span>
                        {log.message}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
