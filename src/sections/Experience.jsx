import React, { useState } from 'react';
import { ArrowRight, Database, ShieldAlert, Cpu, Terminal, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Experience() {
  const [activeStep, setActiveStep] = useState(0);

  const pipelineSteps = [
    {
      title: "INGESTION LAYER",
      role: "Asynchronous API Ingestion",
      impact: "1.4Cr+ Records Processed",
      status: "SUCCESS",
      icon: <Database size={18} />,
      details: [
        "Redesigned the core ETL pipeline processing over 1.4Cr+ records from source endpoints.",
        "Built automated execution tracking and file-ingestion monitoring subsystems to ensure absolute stream synchronization.",
        "Created custom dependency-handling structures that automatically pause downstream loads until file arrivals are verified."
      ]
    },
    {
      title: "PROCESSING LAYER",
      role: "Distributed Transformation Engine",
      impact: "Optimal Resource Partitioning",
      status: "SUCCESS",
      icon: <Cpu size={18} />,
      details: [
        "Implemented high-throughput workload partitioning and distributed computing schemas on Databricks clusters.",
        "Developed asynchronous API processing engines and customized incremental loading strategies to limit compute costs.",
        "Managed large-scale schema migrations and bulk inserts, optimizing storage layer overheads."
      ]
    },
    {
      title: "RELIABILITY LAYER",
      role: "Adaptive Exception & Throttling Guards",
      impact: "Zero-Downtime Resilience",
      status: "ACTIVE",
      icon: <ShieldAlert size={18} />,
      details: [
        "Improved overall pipeline reliability by engineering adaptive throttling frameworks to handle sudden vendor API limits.",
        "Created smart self-healing retry mechanisms that recover from transient connection drops automatically.",
        "Structured automated data validation tests checking for duplicate entries, key constraints, and Null values before ingestion."
      ]
    },
    {
      title: "REPORTING & ALERTS",
      role: "Execution Logs & Reporting Subsystem",
      impact: "Automated Operational Awareness",
      status: "SUCCESS",
      icon: <Terminal size={18} />,
      details: [
        "Built automatic incident notification processes dispatching high-priority HTML emails on pipeline bottlenecks or fatal errors.",
        "Programmed a centralized orchestration tracking system capturing task run times, data volume processed, and system performance.",
        "Structured analytical lineage reporting to give data consumers full transparency on source-to-report processing times."
      ]
    }
  ];

  return (
    <section
      id="work"
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
          <div className="font-mono-tech text-green" style={{ marginBottom: '8px' }}>
            WORK_EXPERIENCE // PROD_DAG_LINEAGE
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: '600',
            lineHeight: 1.1,
          }}>
            LTM, Bangalore
            <br />
            <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
              Data Engineer (Aug'25 - Now)
            </span>
          </h2>
        </div>

        {/* The DAG Pipeline Diagram */}
        <div style={{
          position: 'relative',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          padding: '40px',
          overflow: 'hidden',
          marginBottom: '32px'
        }}>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            paddingBottom: '12px'
          }}>
            <span>DAG_ID: ltm_production_etl_v2.0</span>
            <span style={{ color: 'var(--color-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="glow-pulsing" style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-green)', borderRadius: '50%' }} />
              STATUS: SUCCESS (RUN_TIME: 14M_RECORDS / 33MIN)
            </span>
          </div>

          {/* Graphical Pipeline Nodes */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            position: 'relative',
            padding: '20px 0',
            zIndex: 2
          }}>
            {/* SVG Background Connecting Lines */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              width: '90%',
              height: '2px',
              background: 'linear-gradient(90deg, var(--color-green) 50%, var(--color-cyan) 80%, rgba(255, 255, 255, 0.05) 100%)',
              zIndex: 1,
              transform: 'translateY(-50%)',
              opacity: 0.3
            }} />

            {pipelineSteps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className="interactive"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 2,
                    flex: '1 1 200px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? 'rgba(0, 242, 254, 0.1)' : 'var(--bg-surface-elevated)',
                    border: '2px solid',
                    borderColor: isActive ? 'var(--color-cyan)' : 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? 'var(--color-cyan)' : 'var(--text-secondary)',
                    boxShadow: isActive ? '0 0 20px rgba(0, 242, 254, 0.3)' : 'none',
                    transition: 'var(--transition-fast)',
                    marginBottom: '16px',
                    position: 'relative'
                  }}>
                    {step.icon}

                    {/* Small success check indicator */}
                    <div style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: '50%',
                      padding: '1px',
                    }}>
                      <CheckCircle2 size={14} style={{ color: 'var(--color-green)' }} />
                    </div>
                  </div>

                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: isActive ? 'var(--color-cyan)' : 'var(--text-muted)',
                    letterSpacing: '0.05em',
                    textAlign: 'center',
                    transition: 'var(--transition-fast)'
                  }}>
                    {step.title}
                  </span>

                  <span style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    marginTop: '4px',
                    textAlign: 'center'
                  }}>
                    {step.impact}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Selected Step Description Console */}
        <div style={{
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-medium)',
          borderRadius: '8px',
          padding: '40px',
          position: 'relative'
        }}>
          {/* Border highlight based on selected layer */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0,
            bottom: 0, width: '4px',
            background: 'var(--color-cyan)',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px'
          }} />

          {/* Heading */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span className="font-mono-tech text-cyan" style={{ fontSize: '10px' }}>
                STAGE_SPECIFICATION // ACTIVE_LAYER
              </span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: '500',
                color: '#fff',
                marginTop: '4px'
              }}>
                {pipelineSteps[activeStep].role}
              </h3>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              backgroundColor: 'rgba(0, 255, 135, 0.05)',
              border: '1px solid rgba(0, 255, 135, 0.2)',
              color: 'var(--color-green)',
              padding: '6px 12px',
              borderRadius: '4px',
            }}>
              METRIC: {pipelineSteps[activeStep].impact}
            </div>
          </div>

          {/* Bullet points */}
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {pipelineSteps[activeStep].details.map((bullet, idx) => (
              <li
                key={idx}
                style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.5',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <ChevronRight
                  size={16}
                  style={{
                    color: 'var(--color-cyan)',
                    marginTop: '4px',
                    flexShrink: 0
                  }}
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

        </div>

      </div>
    </section>
  );
}
