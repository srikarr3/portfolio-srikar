import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, ArrowRight } from 'lucide-react';

export default function TerminalQuest({ onToggleCrt }) {
  const [history, setHistory] = useState([
    { text: "=== SRIKAR MANDAVA CLI PORTFOLIO SHELL v1.0 ===", type: "system" },
    { text: "Type 'help' to view available system diagnostic commands.", type: "info" }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const consoleBottomRef = useRef(null);

  const commandShortcuts = ['help', 'about', 'skills', 'projects', 'experience', 'optimize', 'clear'];

  useEffect(() => {
    // Auto scroll to bottom
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (!trimmedCmd) return;

    // Add to prompt history
    const newHistory = [...history, { text: `srikarde@command_center:~$ ${cmd}`, type: "prompt" }];
    
    // Track execution history
    setCmdHistory([trimmedCmd, ...cmdHistory]);
    setHistoryIndex(-1);

    switch (trimmedCmd) {
      case 'help':
        newHistory.push({
          text: `AVAILABLE DIAGNOSTIC COMMANDS:
  help       - Display this assistance list.
  about      - Display Srikar's background and technical philosophy.
  skills     - Print technical core capabilities in ASCII.
  projects   - Output architectural active build details.
  experience - Print production DAG logs for LTM.
  contact    - Print communications endpoint configurations.
  optimize   - Toggle visual CRT scanline matrix enhancement.
  clear      - Wipe terminal buffer logs.`,
          type: "success"
        });
        break;

      case 'about':
        newHistory.push({
          text: `PORTFOLIO_IDENTITY:
  Name: Srikar Mandava
  Role: Data Engineer
  Objective: Ingestion, transformation, processing, storage, and recovery systems.
  
STATEMENT: "Good pipelines do not just run. They recover. I engineer high-throughput data highways built on resilient validation and self-healing mechanisms."`,
          type: "info"
        });
        break;

      case 'skills':
        newHistory.push({
          text: `CORE_CAPABILITY_MATRIX (ASCII_BAR):
  PYTHON     [████████████████████] 100% (ETL, PySpark, APIs)
  PYSPARK    [██████████████████░░] 90% (Dist Compute, Databricks)
  DBT_CORE   [██████████████████░░] 90% (Sql Transform, Tests)
  AIRFLOW    [████████████████░░░░] 80% (DAG Orchestration)
  AZURE_ADF  [██████████████████░░] 90% (Cloud Pipelines)
  SNOWFLAKE  [████████████████░░░░] 80% (Delta DWH, Cortex)
  SQL        [████████████████████] 100% (MySQL, Postgres Modeling)`,
          type: "success"
        });
        break;

      case 'projects':
        newHistory.push({
          text: `ARCHITECTURAL_BUILDS:
  01: RETAIL_SALES_ANALYTICS
      Stack: Azure ADF, Databricks, PySpark, Key Vault, Power BI
      Specs: Processing large-scale retail sales in star-schema dimensions.
  
  02: FUEL_PRICE_ANALYTICS
      Stack: Python (Async), PostgreSQL, dbt Core, Actions, Streamlit
      Specs: Zero-overhead Daily pipeline covering 97+ Indian cities with 26+ tests.`,
          type: "info"
        });
        break;

      case 'experience':
        newHistory.push({
          text: `PRODUCTION_RUNS (LTM, BANGALORE - AUG 2025 TO PRESENT):
  [08:15:00] Ingestion_Monitor checking ADLS Storage buckets... CSV detected.
  [08:15:02] SHA-256 validation verified. Transferring 1.4Cr+ records...
  [08:16:04] Workload Partitioning triggers on Databricks clusters...
  [08:21:12] Running incremental load pipelines with async PySpark operations...
  [08:23:40] Running 26+ validation gates... OK.
  [08:25:01] Load committed to Snowflake warehouse. Latency: 10m. SUCCESS.`,
          type: "info"
        });
        break;

      case 'contact':
        newHistory.push({
          text: `COMMUNICATIONS_ENDPOINTS:
  GITHUB   : https://github.com/srikarr3
  LINKEDIN : https://www.linkedin.com/in/srikar-mandava-60b4bb24b/
  EMAIL    : msaisrikar***@gmail.com (Secure tunnel active - use page exit portal to dispatch)
  RESUME   : /Srikar-Mandava-DE.pdf (Downloadable system asset)`,
          type: "success"
        });
        break;

      case 'optimize':
        onToggleCrt();
        newHistory.push({
          text: "SYSTEM_ALERT: Visual CRT retro-graphics mode state toggled successfully.",
          type: "system"
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          text: `Command not found: '${trimmedCmd}'. Type 'help' to review configuration.`,
          type: "error"
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div style={{
      backgroundColor: '#0a0a0e',
      border: '1px solid var(--border-medium)',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '420px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
    }}>
      {/* Terminal Title Bar */}
      <div style={{
        backgroundColor: '#121218',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={14} className="text-cyan animate-pulse" />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.05em'
          }}>
            srikarde@diagnostic_shell:~
          </span>
        </div>
        
        {/* Terminal buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>
      </div>

      {/* Terminal logs viewport */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        scrollbarWidth: 'thin'
      }}>
        {history.map((log, idx) => (
          <div 
            key={idx}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              lineHeight: '1.45',
              whiteSpace: 'pre-wrap',
              color: 
                log.type === 'error' ? 'var(--color-red)' :
                log.type === 'success' ? 'var(--color-green)' :
                log.type === 'system' ? 'var(--color-cyan)' :
                log.type === 'info' ? 'var(--color-amber)' : 'var(--text-primary)'
            }}
          >
            {log.text}
          </div>
        ))}
        <div ref={consoleBottomRef} />
      </div>

      {/* Shortcuts bar */}
      <div style={{
        padding: '8px 16px',
        backgroundColor: '#0c0c12',
        borderTop: '1px solid rgba(255, 255, 255, 0.03)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px'
      }}>
        {commandShortcuts.map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="interactive"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              padding: '2px 8px',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
              color: 'var(--color-cyan)',
              cursor: 'pointer'
            }}
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Input prompt */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: '#121218',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--color-green)'
        }}>
          $
        </span>
        <input 
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter command... (e.g. 'help')"
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px'
          }}
        />
        <Send 
          size={14} 
          onClick={() => executeCommand(inputVal)}
          className="interactive text-secondary hover:text-cyan"
          style={{ cursor: 'pointer' }}
        />
      </div>

    </div>
  );
}
