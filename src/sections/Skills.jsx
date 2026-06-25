import React, { useState } from 'react';
import { 
  Award, Terminal, Code, Cpu, Cloud, Database, 
  Network, Layers, Workflow, Zap, Compass, GitBranch, BarChart3, Tv 
} from 'lucide-react';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const renderSkillIcon = (iconName, color, isHovered) => {
    const iconsMap = {
      Code: Code,
      Terminal: Terminal,
      Database: Database,
      Cpu: Cpu,
      Cloud: Cloud,
      Network: Network,
      Layers: Layers,
      Workflow: Workflow,
      Zap: Zap,
      Compass: Compass,
      GitBranch: GitBranch,
      BarChart3: BarChart3,
      Tv: Tv
    };
    
    const IconComponent = iconsMap[iconName] || Code;
    return (
      <IconComponent 
        size={18} 
        style={{
          color: isHovered ? color : 'var(--text-secondary)',
          transform: isHovered ? 'scale(1.2) rotate(8deg)' : 'scale(1) rotate(0)',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s',
          filter: isHovered ? `drop-shadow(0 0 6px ${color})` : 'none'
        }} 
      />
    );
  };

  const skillCategories = [
    {
      id: "languages",
      title: "INGESTION_FUEL // LANGUAGES",
      icon: <Code size={16} />,
      accent: "var(--color-cyan)",
      skills: [
        { name: "Python", icon: "Code", desc: "Core scraping, testing, API builds & PySpark transforms" },
        { name: "Bash", icon: "Terminal", desc: "Orchestration automation & operational scripting" },
        { name: "MySQL", icon: "Database", desc: "Relational modeling, indexing, & schema queries" }
      ]
    },
    {
      id: "engineering",
      title: "TRANSFORM_ENGINES // PIPELINES",
      icon: <Cpu size={16} />,
      accent: "var(--color-green)",
      skills: [
        { name: "Apache Airflow", icon: "Cpu", desc: "DAG orchestration, backfills, & dependency maps" },
        { name: "Azure Data Factory", icon: "Cloud", desc: "Cloud data ingestion pipelines & execution gates" },
        { name: "Azure Databricks", icon: "Network", desc: "Distributed processing clusters & Notebook computations" },
        { name: "Unity Catalog", icon: "Layers", desc: "Databricks unified governance layer for cataloging, security, & column-level lineage" },
        { name: "Lakeflow Designer", icon: "Layers", desc: "Visual Databricks ETL builder for unified data operations" },
        { name: "Lakeflow Declarative Pipelines", icon: "Workflow", desc: "Declarative SQL/Python pipelines with automatic orchestration & recovery" },
        { name: "PySpark", icon: "Zap", desc: "High-scale resilient datasets, partitioning, & ETL workflows" },
        { name: "dbt Core", icon: "Compass", desc: "Sql transformations, modular models, & continuous testing" },
        { name: "Snowflake Cortex", icon: "Cpu", desc: "Native LLM operations & cognitive data modeling" }
      ]
    },
    {
      id: "cloud",
      title: "LAKEHOUSES // CLOUD_INFRA",
      icon: <Cloud size={16} />,
      accent: "var(--color-amber)",
      skills: [
        { name: "Azure Cloud", icon: "Cloud", desc: "ADLS Gen2, Key Vault, Synapse, & storage structures" },
        { name: "AWS Cloud", icon: "Cloud", desc: "S3, EC2 instances, & access credentials" },
        { name: "Snowflake DWH", icon: "Database", desc: "Virtual compute warehouses, zero-copy cloning, & sharing" }
      ]
    },
    {
      id: "tools",
      title: "CONTROL_PANELS // UTILITIES",
      icon: <Database size={16} />,
      accent: "var(--color-purple)",
      skills: [
        { name: "Git & Version Control", icon: "GitBranch", desc: "Branching policies, merge gates, & production CI/CD" },
        { name: "Power BI", icon: "BarChart3", desc: "Star-schema consumption models & analytical charting" },
        { name: "Streamlit", icon: "Tv", desc: "Rapid serverless frontends, metrics dashboards, & tools" }
      ]
    }
  ];

  const certifications = [
    { name: "Databricks Certified Data Engineer Associate", issuer: "Databricks" },
    { name: "Postman API Fundamentals Student Expert", issuer: "Postman API Team" },
    { name: "OCI Foundations Associate Certified", issuer: "Oracle Cloud" }
  ];

  return (
    <section 
      id="skills" 
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
            ENGINEERING_STACK // SYSTEM_CAPABILITIES
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: '600',
            lineHeight: 1.1,
          }}>
            Technical Capability Matrix.
            <br />
            <span style={{ color: 'var(--text-secondary)' }}>Tested tools for highly reliable infrastructure.</span>
          </h2>
        </div>

        {/* Skill Category Selector Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {skillCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <div 
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className="command-card interactive"
                style={{
                  padding: '24px',
                  backgroundColor: isSelected ? 'rgba(255,255,255,0.01)' : 'var(--bg-surface)',
                  borderColor: isSelected ? cat.accent : 'var(--border-light)',
                  boxShadow: isSelected ? `0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 10px ${cat.accent}11` : 'none',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: isSelected ? cat.accent : 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.05em'
                }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderColor: isSelected ? cat.accent : 'var(--border-light)',
                    color: isSelected ? cat.accent : 'var(--text-secondary)',
                    transition: 'var(--transition-fast)'
                  }}>
                    {cat.icon}
                  </div>
                  {cat.title.split(' // ')[1]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Skill Stack Display */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          padding: '40px',
          marginBottom: '60px'
        }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {skillCategories
              .filter(cat => activeCategory === null || activeCategory === cat.id)
              .map((cat) => (
                <React.Fragment key={cat.id}>
                  {cat.skills.map((skill, sIdx) => {
                    const isHovered = hoveredSkill === skill.name;
                    return (
                      <div 
                        key={sIdx}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        style={{
                          backgroundColor: isHovered ? 'var(--bg-surface-elevated)' : 'rgba(0,0,0,0.15)',
                          border: '1px solid',
                          borderColor: isHovered ? cat.accent : 'rgba(255,255,255,0.03)',
                          borderRadius: '6px',
                          padding: '24px',
                          transition: 'var(--transition-fast)',
                          boxShadow: isHovered ? `0 10px 20px rgba(0,0,0,0.4)` : 'none'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '12px'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}>
                            {renderSkillIcon(skill.icon, cat.accent, isHovered)}
                            <h4 style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '1.1rem',
                              fontWeight: '600',
                              color: isHovered ? '#fff' : 'var(--text-primary)',
                              transition: 'color 0.2s'
                            }}>
                              {skill.name}
                            </h4>
                          </div>
                          <span style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: cat.accent,
                            boxShadow: `0 0 8px ${cat.accent}`,
                            opacity: isHovered ? 1 : 0.4,
                            transition: 'opacity 0.2s'
                          }} />
                        </div>
                        <p style={{
                          fontSize: '0.85rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.45',
                          fontWeight: '300'
                        }}>
                          {skill.desc}
                        </p>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
          </div>

        </div>

        {/* Certifications Sub-Section (Compact Cards) */}
        <div>
          <div 
            className="font-mono-tech text-cyan" 
            style={{ 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Award size={14} />
            VERIFIED_CREDENTIALS // CERTIFICATIONS
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {certifications.map((cert, cIdx) => (
              <div 
                key={cIdx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '6px'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 242, 254, 0.05)',
                  border: '1px solid rgba(0, 242, 254, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-cyan)'
                }}>
                  <Award size={14} />
                </div>
                <div>
                  <h4 style={{
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                  }}>
                    {cert.name}
                  </h4>
                  <p style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    ISSUER: {cert.issuer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
