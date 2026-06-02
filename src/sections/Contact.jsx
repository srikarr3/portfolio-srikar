import React, { useState } from 'react';
import { Mail, Shield, ArrowUpRight, Terminal, Lock, Check, Loader2 } from 'lucide-react';

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

export default function Contact() {
  const [activeTunnel, setActiveTunnel] = useState(null); // null, 'email', 'linkedin', 'github'
  const [tunnelStatus, setTunnelStatus] = useState({
    email: 'IDLE', // IDLE, SECURING, ESTABLISHED
    linkedin: 'IDLE',
    github: 'IDLE'
  });
  const [tunnelLogs, setTunnelLogs] = useState({
    email: [],
    linkedin: [],
    github: []
  });

  const establishSecureTunnel = (type, url) => {
    if (tunnelStatus[type] !== 'IDLE') return;

    setTunnelStatus(prev => ({ ...prev, [type]: 'SECURING' }));
    setActiveTunnel(type);
    
    const steps = {
      email: [
        "SYS_INIT: Resolving target SMTP node...",
        "VALIDATOR: Checking address integrity... PASS",
        "SECURITY: Wrapping target in secure SHA-256 layer...",
        "SMTP: Establishing encrypted tunnel on port 587...",
        "SUCCESS: SMTP tunnel established. Dispatching secure mail client!"
      ],
      linkedin: [
        "SYS_INIT: Initializing API handshake connection...",
        "NET: Resolving linkedin.com/in/srikar-mandava...",
        "HANDSHAKE: Sending SYN packet... Received SYN-ACK",
        "SECURITY: Establishing OAuth secure channel session...",
        "SUCCESS: Handshake complete. Routing to destination node!"
      ],
      github: [
        "SYS_INIT: Instantiating git core environment...",
        "NET: Pinging remote origin srikarr3...",
        "GIT: Resolving delta compression objects... 100%",
        "SECURITY: Verifying SSH key token authorization... GRANTED",
        "SUCCESS: Git stream ready. Fetching repository index!"
      ]
    };

    setTunnelLogs(prev => ({ ...prev, [type]: [] }));

    steps[type].forEach((log, idx) => {
      setTimeout(() => {
        setTunnelLogs(prev => ({
          ...prev,
          [type]: [...(prev[type] || []), log]
        }));

        if (idx === steps[type].length - 1) {
          setTimeout(() => {
            setTunnelStatus(prev => ({ ...prev, [type]: 'ESTABLISHED' }));
            
            // Trigger actual secure routing redirect
            if (type === 'email') {
              window.location.href = `mailto:${url}`;
            } else {
              window.open(url, '_blank', 'noopener,noreferrer');
            }

            // Auto-reset state back to locked screen after short timeout
            setTimeout(() => {
              setTunnelStatus(prev => ({ ...prev, [type]: 'IDLE' }));
              setTunnelLogs(prev => ({ ...prev, [type]: [] }));
              setActiveTunnel(null);
            }, 3000);
          }, 800);
        }
      }, (idx + 1) * 350);
    });
  };

  return (
    <section 
      id="contact" 
      className="section-padding" 
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'transparent',
        borderTop: '1px solid var(--border-light)',
        paddingBottom: '140px'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '60px' }}>
          <div className="font-mono-tech text-cyan" style={{ marginBottom: '8px' }}>
            SECURE_EXIT_NODES // ENCRYPTED_TUNNELS
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: '600',
            lineHeight: 1.1,
          }}>
            Initiate Secure Connection.
            <br />
            <span style={{ color: 'var(--text-secondary)' }}>Zero plain-text details exposed. Connect via encrypted exit terminals.</span>
          </h2>
        </div>

        {/* Technical Explanation */}
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.65',
          fontWeight: '300',
          maxWidth: '800px',
          marginBottom: '48px',
          borderLeft: '2px solid rgba(0, 242, 254, 0.25)',
          paddingLeft: '20px'
        }}>
          To prevent scraping, data mining, and plain-text harvesting, all communication endpoints are fully wrapped inside modern transport gateways. Select a portal node below to execute a secure handshake tunnel and establish link tunnels.
        </p>

        {/* 3-Column Secure Tunnel Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          
          {/* Email Exit Node */}
          <div 
            className="command-card interactive"
            style={{
              padding: '32px',
              backgroundColor: 'var(--bg-surface)',
              borderColor: activeTunnel === 'email' ? 'var(--color-cyan)' : 'var(--border-light)',
              boxShadow: activeTunnel === 'email' ? '0 10px 30px rgba(0, 242, 254, 0.1)' : 'none',
              transition: 'var(--transition-smooth)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '380px'
            }}
          >
            <div>
              {/* Card Header Info */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '28px',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.1em'
              }}>
                <span style={{ color: 'var(--color-cyan)' }}>GATEWAY_NODE // 01</span>
                <span style={{ color: 'var(--text-muted)' }}>SSL_SMTP_TLS</span>
              </div>

              {/* Node Main Icon & Masked Target */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(0, 242, 254, 0.05)',
                  border: '1px solid rgba(0, 242, 254, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-cyan)'
                }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: '600' }}>
                    Secure Mail Gateway
                  </h4>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    ENDPOINT: SMTP://msaisrikar***@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-Terminal Screen showing simulated logs during connection */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginBottom: '24px' }}>
              {tunnelStatus.email !== 'IDLE' ? (
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  backgroundColor: '#040406',
                  padding: '16px',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 242, 254, 0.15)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  maxHeight: '140px',
                  overflowY: 'auto'
                }}>
                  {tunnelLogs.email.map((log, idx) => (
                    <div key={idx} style={{ 
                      color: log.startsWith("SUCCESS") ? 'var(--color-green)' : 'var(--text-secondary)',
                      lineHeight: '1.3'
                    }}>
                      {log}
                    </div>
                  ))}
                  {tunnelStatus.email === 'SECURING' && (
                    <div className="flicker" style={{ color: 'var(--color-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Loader2 size={8} style={{ animation: 'spin 1s linear infinite' }} />
                      CONNECTING_SECURE_TUNNEL...
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', fontWeight: '300' }}>
                  Establishes a cryptographically secure transport tunnel directly to his mailbox using standard SMTP/TLS layers.
                </p>
              )}
            </div>

            {/* Ingress Tunnel Action Button */}
            <button
              onClick={() => establishSecureTunnel('email', 'msaisrikar333@gmail.com')}
              disabled={tunnelStatus.email !== 'IDLE'}
              className="btn-premium btn-cyan interactive"
              style={{
                width: '100%',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.05em'
              }}
            >
              {tunnelStatus.email === 'IDLE' && (
                <>
                  <Lock size={12} />
                  ESTABLISH_SMTP_TUNNEL
                </>
              )}
              {tunnelStatus.email === 'SECURING' && (
                <>
                  <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />
                  SECURING_CONNECTION...
                </>
              )}
              {tunnelStatus.email === 'ESTABLISHED' && (
                <>
                  <Check size={12} style={{ color: 'var(--color-green)' }} />
                  TUNNEL_ACTIVE_ROUTING
                </>
              )}
            </button>
          </div>

          {/* LinkedIn Exit Node */}
          <div 
            className="command-card interactive"
            style={{
              padding: '32px',
              backgroundColor: 'var(--bg-surface)',
              borderColor: activeTunnel === 'linkedin' ? 'var(--color-green)' : 'var(--border-light)',
              boxShadow: activeTunnel === 'linkedin' ? '0 10px 30px rgba(0, 255, 135, 0.1)' : 'none',
              transition: 'var(--transition-smooth)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '380px'
            }}
          >
            <div>
              {/* Card Header Info */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '28px',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.1em'
              }}>
                <span style={{ color: 'var(--color-green)' }}>GATEWAY_NODE // 02</span>
                <span style={{ color: 'var(--text-muted)' }}>OAUTH_HANDSHAKE</span>
              </div>

              {/* Node Main Icon & Masked Target */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(0, 255, 135, 0.05)',
                  border: '1px solid rgba(0, 255, 135, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-green)'
                }}>
                  <LinkedinIcon size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: '600' }}>
                    Professional Portal
                  </h4>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    ENDPOINT: HTTPS://linkedin.com/in/srikar***
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-Terminal Screen showing simulated logs during connection */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginBottom: '24px' }}>
              {tunnelStatus.linkedin !== 'IDLE' ? (
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  backgroundColor: '#040406',
                  padding: '16px',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 255, 135, 0.15)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  maxHeight: '140px',
                  overflowY: 'auto'
                }}>
                  {tunnelLogs.linkedin.map((log, idx) => (
                    <div key={idx} style={{ 
                      color: log.startsWith("SUCCESS") ? 'var(--color-green)' : 'var(--text-secondary)',
                      lineHeight: '1.3'
                    }}>
                      {log}
                    </div>
                  ))}
                  {tunnelStatus.linkedin === 'SECURING' && (
                    <div className="flicker" style={{ color: 'var(--color-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Loader2 size={8} style={{ animation: 'spin 1s linear infinite' }} />
                      ESTABLISHING_HANDSHAKE...
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', fontWeight: '300' }}>
                  Resolves professional routing credentials via an active API handshake, opening a secure redirect bridge to his LinkedIn network profile.
                </p>
              )}
            </div>

            {/* Ingress Tunnel Action Button */}
            <button
              onClick={() => establishSecureTunnel('linkedin', 'https://www.linkedin.com/in/srikar-mandava-60b4bb24b/')}
              disabled={tunnelStatus.linkedin !== 'IDLE'}
              className="btn-premium interactive"
              style={{
                width: '100%',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.05em',
                borderColor: tunnelStatus.linkedin === 'SECURING' ? 'var(--color-green)' : 'var(--border-medium)'
              }}
            >
              {tunnelStatus.linkedin === 'IDLE' && (
                <>
                  <Shield size={12} style={{ color: 'var(--color-green)' }} />
                  INITIALIZE_HANDSHAKE
                </>
              )}
              {tunnelStatus.linkedin === 'SECURING' && (
                <>
                  <Loader2 size={12} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-green)' }} />
                  COMMITTING_SYN_ACK...
                </>
              )}
              {tunnelStatus.linkedin === 'ESTABLISHED' && (
                <>
                  <Check size={12} style={{ color: 'var(--color-green)' }} />
                  HANDSHAKE_ESTABLISHED
                </>
              )}
            </button>
          </div>

          {/* GitHub Exit Node */}
          <div 
            className="command-card interactive"
            style={{
              padding: '32px',
              backgroundColor: 'var(--bg-surface)',
              borderColor: activeTunnel === 'github' ? 'var(--color-purple)' : 'var(--border-light)',
              boxShadow: activeTunnel === 'github' ? '0 10px 30px rgba(161, 140, 209, 0.1)' : 'none',
              transition: 'var(--transition-smooth)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '380px'
            }}
          >
            <div>
              {/* Card Header Info */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '28px',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.1em'
              }}>
                <span style={{ color: 'var(--color-purple)' }}>GATEWAY_NODE // 03</span>
                <span style={{ color: 'var(--text-muted)' }}>GIT_SSH_PULL</span>
              </div>

              {/* Node Main Icon & Masked Target */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(161, 140, 209, 0.05)',
                  border: '1px solid rgba(161, 140, 209, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-purple)'
                }}>
                  <GithubIcon size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: '600' }}>
                    Open-Source Hub
                  </h4>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    ENDPOINT: GIT://github.com/srikar***
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-Terminal Screen showing simulated logs during connection */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginBottom: '24px' }}>
              {tunnelStatus.github !== 'IDLE' ? (
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  backgroundColor: '#040406',
                  padding: '16px',
                  borderRadius: '4px',
                  border: '1px solid rgba(161, 140, 209, 0.15)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  maxHeight: '140px',
                  overflowY: 'auto'
                }}>
                  {tunnelLogs.github.map((log, idx) => (
                    <div key={idx} style={{ 
                      color: log.startsWith("SUCCESS") ? 'var(--color-green)' : 'var(--text-secondary)',
                      lineHeight: '1.3'
                    }}>
                      {log}
                    </div>
                  ))}
                  {tunnelStatus.github === 'SECURING' && (
                    <div className="flicker" style={{ color: 'var(--color-purple)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Loader2 size={8} style={{ animation: 'spin 1s linear infinite' }} />
                      SYNCING_REPOSITORY_INDEX...
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', fontWeight: '300' }}>
                  Resolves and securely connects to his public developer workspace repositories containing ETL templates, data structures, and scrappers.
                </p>
              )}
            </div>

            {/* Ingress Tunnel Action Button */}
            <button
              onClick={() => establishSecureTunnel('github', 'https://github.com/srikarr3')}
              disabled={tunnelStatus.github !== 'IDLE'}
              className="btn-premium interactive"
              style={{
                width: '100%',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.05em',
                borderColor: tunnelStatus.github === 'SECURING' ? 'var(--color-purple)' : 'var(--border-medium)'
              }}
            >
              {tunnelStatus.github === 'IDLE' && (
                <>
                  <Terminal size={12} style={{ color: 'var(--color-purple)' }} />
                  CLONE_REPOSITORIES
                </>
              )}
              {tunnelStatus.github === 'SECURING' && (
                <>
                  <Loader2 size={12} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-purple)' }} />
                  PULLING_PACKETS...
                </>
              )}
              {tunnelStatus.github === 'ESTABLISHED' && (
                <>
                  <Check size={12} style={{ color: 'var(--color-green)' }} />
                  REPOSITORY_PULL_COMPLETE
                </>
              )}
            </button>
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </section>
  );
}
