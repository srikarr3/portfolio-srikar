import React, { useState } from 'react';
import { ExternalLink, Cpu, Layout, Server, Database } from 'lucide-react';

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

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);

  // Easily expandable project schema list
  const projectList = [
    {
      id: 1,
      title: "Retail Sales Analytics & Dimension Tracking",
      stack: ["Azure Data Factory", "Azure Databricks", "PySpark", "Azure Storage", "Azure Key Vault", "Power BI"],
      description: "An end-to-end retail analytics pipeline for ingesting and transforming large-scale sales datasets using Azure Data Factory for orchestration and Azure Databricks for distributed processing. Includes PySpark ETL workflows, star schema dimensional modeling, cleansing, validation, secure Azure storage, Key Vault integration, and Power BI dashboards.",
      impact: "Designed highly structured, secure dimensional data warehouses processing large-scale transactions.",
      github: "https://github.com/srikarr3",
      live: null,
      architecture: [
        { label: "Ingest", name: "ADF Orchestration", type: "orchestrator" },
        { label: "Store", name: "Azure Blob Storage", type: "storage" },
        { label: "Compute", name: "Databricks Spark", type: "compute" },
        { label: "Secure", name: "Key Vault", type: "security" },
        { label: "Consume", name: "Power BI", type: "analytics" }
      ]
    },
    {
      id: 2,
      title: "Fuel Price Analytics Pipeline",
      stack: ["Python", "PostgreSQL", "dbt Core", "GitHub Actions", "Streamlit", "Plotly"],
      description: "A zero-infrastructure serverless ETL pipeline that automates daily fuel price ingestion across 97+ Indian cities. Uses async Python scraping, transaction-safe PostgreSQL bulk upserts, dbt Core transformations, 26+ data quality tests, Streamlit/Plotly dashboarding, GitHub Actions automation, and HTML email reporting.",
      impact: "Completed zero-overhead ingestion with 100% data quality test coverages.",
      github: "https://github.com/srikarr3/fuel_prices_tracker",
      live: "https://srikar-fueltracker97.streamlit.app/",
      architecture: [
        { label: "Trigger", name: "GitHub Actions", type: "orchestrator" },
        { label: "Fetch", name: "Async Python Scraping", type: "compute" },
        { label: "Load", name: "PostgreSQL Upsert", type: "storage" },
        { label: "Validate", name: "dbt Core (26+ Tests)", type: "compute" },
        { label: "Visualize", name: "Streamlit / Plotly", type: "analytics" }
      ]
    },
    {
      id: 3,
      title: "IPL Cricket Database & Transaction System",
      stack: ["SQL", "PostgreSQL", "Database Modeling", "Relational Views", "Triggers", "Data Integrity"],
      description: "A normalized PostgreSQL relational database modeling Matches, Seasons, Player Stats, and Ball-by-Ball delivery logs. Engineered with custom integrity constraints, automated database triggers, transaction-safe query isolation levels, and indexed views to process massive sporting metrics with sub-millisecond querying latency.",
      impact: "Optimized complex sports query routines via targeted database schema indexing.",
      github: "https://github.com/srikarr3/IPL_DATABASE",
      live: "https://ipldatabase-srikarnewv1.streamlit.app/",
      architecture: [
        { label: "Model", name: "Relational Schema", type: "orchestrator" },
        { label: "Ingest", name: "Seasonal Deliveries Logs", type: "storage" },
        { label: "Secure", name: "Integrity Rules & Triggers", type: "security" },
        { label: "Query", name: "Indexed Performance Views", type: "compute" },
        { label: "Extract", name: "Normalized Analytical Reports", type: "analytics" }
      ]
    },
    {
      id: 4,
      title: "Real-Time Typing Performance Engine",
      stack: ["JavaScript", "DOM Engine", "Metrics Logging", "Plotly", "Performance Telemetry"],
      description: "A high-fidelity browser typing speed evaluation engine designed to log real-time keystroke telemetry metrics. Automatically measures word-per-minute (WPM) velocities, raw letter accuracy quotients, error indexing, keypress latencies, and dynamically visualizes instant analytics with zero rendering overhead.",
      impact: "Mapped real-time keyboard event telemetry with sub-millisecond processing speeds.",
      github: "https://github.com/srikarr3/typing-speed-test",
      live: "https://typing-speed-test-one-delta.vercel.app/",
      architecture: [
        { label: "Capture", name: "Keystroke Event Telemetry", type: "orchestrator" },
        { label: "Calculate", name: "WPM / Accuracy Vectors", type: "compute" },
        { label: "Store", name: "Local Performance Logs", type: "storage" },
        { label: "Analyze", name: "Typo Indexing Metrics", type: "security" },
        { label: "Render", name: "Live Plotly / DOM Dashboard", type: "analytics" }
      ]
    }
  ];

  return (
    <section
      id="projects"
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
            PRODUCTION_BUILDS // SYSTEM_ARCHITECTURE
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: '600',
            lineHeight: 1.1,
          }}>
            Data Engineering Builds.
            <br />
            <span style={{ color: 'var(--text-secondary)' }}>Frictionless pipelines, secure stacks.</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          {projectList.map((project, index) => {
            const isHovered = hoveredProject === project.id;
            return (
              <div
                key={project.id}
                className="command-card interactive"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '32px',
                  padding: '40px',
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: isHovered ? 'var(--color-cyan)' : 'var(--border-light)',
                  boxShadow: isHovered ? '0 15px 40px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 242, 254, 0.05)' : 'none',
                  transition: 'var(--transition-smooth)'
                }}
              >

                {/* Left Block: Content */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {/* Index Code */}
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--color-cyan)',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>[PROJECT_0{project.id}]</span>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-cyan)' }} />
                      <span>STACK_ACTIVE</span>
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      fontWeight: '600',
                      lineHeight: '1.25',
                      marginBottom: '16px',
                      color: '#fff'
                    }}>
                      {project.title}
                    </h3>

                    <p style={{
                      fontSize: '0.98rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      marginBottom: '24px',
                      fontWeight: '300'
                    }}>
                      {project.description}
                    </p>

                    <div style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'var(--color-green)',
                      borderLeft: '2px solid var(--color-green)',
                      paddingLeft: '12px',
                      marginBottom: '32px',
                      fontWeight: '500'
                    }}>
                      IMPACT: {project.impact}
                    </div>
                  </div>

                  {/* Actions & Badges */}
                  <div>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '24px'
                    }}>
                      {project.stack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            padding: '4px 10px',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '4px',
                            color: 'var(--text-secondary)',
                            letterSpacing: '0.02em'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-premium interactive"
                        style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                      >
                        <GithubIcon size={14} />
                        Source Code
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-premium btn-cyan interactive"
                          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right Block: Architecture System Visualizer */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.02)',
                  borderRadius: '6px',
                  padding: '32px',
                  position: 'relative',
                  minHeight: '300px'
                }}>

                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: 'var(--text-muted)',
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    letterSpacing: '0.05em'
                  }}>
                    SYSTEM_DIAGRAM_V1
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    position: 'relative'
                  }}>
                    {/* SVG Connector Line */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      bottom: '10px',
                      left: '20px',
                      width: '1px',
                      background: 'linear-gradient(to bottom, var(--color-cyan) 0%, var(--color-green) 70%, rgba(255,255,255,0.05) 100%)',
                      opacity: isHovered ? 0.8 : 0.3,
                      transition: 'var(--transition-fast)',
                      zIndex: 1
                    }} />

                    {project.architecture.map((node, nodeIdx) => (
                      <div
                        key={nodeIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          zIndex: 2,
                          transform: isHovered ? `translateX(${nodeIdx * 8}px)` : 'translateX(0)',
                          opacity: isHovered ? 1 : 0.6,
                          transition: `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${nodeIdx * 0.05}s, opacity 0.3s`
                        }}
                      >
                        {/* Bullet Circle */}
                        <div style={{
                          width: '40px',
                          height: '24px',
                          borderRadius: '12px',
                          backgroundColor: isHovered && nodeIdx === hoveredProject - 1 ? 'rgba(0, 242, 254, 0.15)' : 'var(--bg-surface-elevated)',
                          border: '1px solid',
                          borderColor: isHovered ? 'var(--color-cyan)' : 'rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isHovered ? 'var(--color-cyan)' : 'var(--text-secondary)',
                          fontSize: '8px',
                          fontFamily: 'var(--font-mono)',
                          transition: 'var(--transition-fast)'
                        }}>
                          0{nodeIdx + 1}
                        </div>

                        {/* Node Label Info */}
                        <div>
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '9px',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            {node.label}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: isHovered ? '#fff' : 'var(--text-primary)',
                            fontWeight: '500',
                            transition: 'color 0.2s'
                          }}>
                            {node.name}
                          </div>
                        </div>

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
