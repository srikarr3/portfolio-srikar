import React, { useState } from 'react';
import LiveDataLab from '../components/LiveDataLab';
import PipelineOverlord from '../components/PipelineOverlord';
import TerminalQuest from '../components/TerminalQuest';
import { Shield, Gamepad2, Terminal as CliIcon } from 'lucide-react';

export default function Playground({ onToggleCrt }) {
  const [activeTab, setActiveTab] = useState('lab');

  return (
    <section 
      id="playground" 
      className="section-padding" 
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'transparent',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div className="font-mono-tech text-cyan" style={{ marginBottom: '8px' }}>
            INTERACTIVE_SANDBOX // CONTROL_PANELS
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: '600',
            lineHeight: 1.1,
            marginBottom: '12px'
          }}>
            Data Engineering Command Center
          </h2>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            maxWidth: '550px',
            margin: '0 auto',
            lineHeight: '1.5',
            fontWeight: '300'
          }}>
            Deploy diagnostics, analyze latency loads in real-time simulations, or type CLI instructions in the embedded developer shell.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          {/* Live Data Lab Tab */}
          <button
            onClick={() => setActiveTab('lab')}
            className="interactive"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '30px',
              border: '1px solid',
              borderColor: activeTab === 'lab' ? 'var(--color-cyan)' : 'rgba(255, 255, 255, 0.05)',
              backgroundColor: activeTab === 'lab' ? 'rgba(0, 242, 254, 0.05)' : 'var(--bg-surface)',
              color: activeTab === 'lab' ? 'var(--color-cyan)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            <Shield size={14} />
            01. Live Data Lab
          </button>

          {/* Pipeline Overlord Tab */}
          <button
            onClick={() => setActiveTab('game')}
            className="interactive"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '30px',
              border: '1px solid',
              borderColor: activeTab === 'game' ? 'var(--color-green)' : 'rgba(255, 255, 255, 0.05)',
              backgroundColor: activeTab === 'game' ? 'rgba(0, 255, 135, 0.05)' : 'var(--bg-surface)',
              color: activeTab === 'game' ? 'var(--color-green)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            <Gamepad2 size={14} />
            02. Pipeline Overlord
          </button>

          {/* Terminal Tab */}
          <button
            onClick={() => setActiveTab('terminal')}
            className="interactive"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '30px',
              border: '1px solid',
              borderColor: activeTab === 'terminal' ? 'var(--color-amber)' : 'rgba(255, 255, 255, 0.05)',
              backgroundColor: activeTab === 'terminal' ? 'rgba(255, 159, 67, 0.05)' : 'var(--bg-surface)',
              color: activeTab === 'terminal' ? 'var(--color-amber)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            <CliIcon size={14} />
            03. Terminal Quest
          </button>
        </div>

        {/* Tab Viewport */}
        <div style={{ minHeight: '440px' }}>
          {activeTab === 'lab' && <LiveDataLab />}
          {activeTab === 'game' && <PipelineOverlord />}
          {activeTab === 'terminal' && <TerminalQuest onToggleCrt={onToggleCrt} />}
        </div>

      </div>
    </section>
  );
}
