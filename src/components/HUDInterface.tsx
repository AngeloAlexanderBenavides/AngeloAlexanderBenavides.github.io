'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, HardDrive, LayoutTemplate, Bot, RefreshCw } from 'lucide-react';

interface HUDInterfaceProps {
  activeState: 'NEUTRAL' | 'AI' | 'BACKEND' | 'FRONTEND' | 'ROBOTICS';
  onStateChange: (state: 'NEUTRAL' | 'AI' | 'BACKEND' | 'FRONTEND' | 'ROBOTICS') => void;
}

const statusMessages = {
  NEUTRAL: 'SISTEMA INICIALIZADO. SECTOR NEUTRAL ACTIVO.',
  AI: 'RED NEURONAL CONECTADA. ANALIZANDO MODELOS DE LENGUAJE Y RAG.',
  BACKEND: 'CONEXIÓN WEBSOCKET ESTABLECIDA. CARGANDO NÚCLEO RUST/PYTHON.',
  FRONTEND: 'RENDERIZANDO INTERFAZ DE USUARIO. OPTIMIZANDO RENDERIZADO FLUIDO.',
  ROBOTICS: 'CINEMÁTICA Y SENSORES IoT ONLINE. PROTOCOLO BIOSTRIDE ACTIVO.',
};

const subTitles = {
  NEUTRAL: 'Software Engineer in Training | Robotics Developer | AI Integrator',
  AI: 'Especialista en Inteligencia Artificial aplicada & Machine Learning',
  BACKEND: 'Desarrollador de Sistemas de Alto Rendimiento, Backend & Ciberseguridad',
  FRONTEND: 'Creador de Interfaces Modernas, Estética Premium & UX/UI Interactiva',
  ROBOTICS: 'Maker e Ingeniero de Sistemas IoT, Biónica & Cinemática de Hardware',
};

export const HUDInterface: React.FC<HUDInterfaceProps> = ({ activeState, onStateChange }) => {
  const [terminalLogs, setTerminalLogs] = useState<string[]>(['[SYSTEM]: Booting Angelo.dev v2.0...']);

  useEffect(() => {
    // Add logs dynamically when state changes
    const timeStr = new Date().toLocaleTimeString();
    const newLog = `[${timeStr}] STATUS_CHANGE -> ${activeState}: ${statusMessages[activeState]}`;
    setTerminalLogs((prev) => [...prev.slice(-3), newLog]); // Keep last 4 logs
  }, [activeState]);

  const getWrapperClass = () => {
    const base = 'w-full flex flex-col items-center justify-between min-h-screen p-6 sm:p-8 select-none z-10 relative pointer-events-none transition-all duration-700';
    switch (activeState) {
      case 'AI': return `${base} font-outfit text-slate-100`;
      case 'BACKEND': return `${base} font-mono text-green-400 crt-flicker`;
      case 'FRONTEND': return `${base} font-jakarta text-slate-100`;
      case 'ROBOTICS': return `${base} font-sharetech text-cyan-200 blueprint-grid`;
      default: return `${base} font-mono text-slate-100`;
    }
  };

  const getPanelClass = () => {
    const base = 'relative px-6 py-10 backdrop-blur-xl transition-all duration-500 max-w-3xl w-full text-center pointer-events-auto';
    switch (activeState) {
      case 'AI': 
        return `${base} rounded-2xl bg-slate-950/45 border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.05)]`;
      case 'BACKEND': 
        return `${base} rounded-none bg-black border-2 border-green-500/60 shadow-[0_0_20px_rgba(34,197,94,0.15)]`;
      case 'FRONTEND': 
        return `${base} rounded-[2.2rem] bg-white/5 border border-white/10 shadow-2xl frontend-glow`;
      case 'ROBOTICS': 
        return `${base} rounded-none bg-[#030a16]/95 border-2 border-dashed border-cyan-500/30 shadow-[inset_0_0_30px_rgba(6,182,212,0.08)]`;
      default: 
        return `${base} rounded-2xl bg-slate-950/65 border border-slate-800/80 shadow-2xl`;
    }
  };

  const renderCorners = () => {
    switch (activeState) {
      case 'NEUTRAL':
        return (
          <>
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 rounded-tr" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 rounded-bl" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br" />
          </>
        );
      case 'AI':
        return (
          <>
            <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-purple-500 rounded-full" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-purple-500 rounded-full" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-purple-500 rounded-full" />
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-purple-500 rounded-full" />
          </>
        );
      case 'BACKEND':
        return (
          <>
            <div className="absolute top-1 left-2 text-[9px] text-green-500/30 select-none">[SYS_CONF]</div>
            <div className="absolute top-1 right-2 text-[9px] text-green-500/30 select-none">[IO_OK]</div>
          </>
        );
      case 'ROBOTICS':
        return (
          <>
            <div className="absolute -top-3.5 -left-2 w-5 h-5 text-cyan-500/50 font-sans text-xl font-light select-none">+</div>
            <div className="absolute -top-3.5 -right-2 w-5 h-5 text-cyan-500/50 font-sans text-xl font-light select-none">+</div>
            <div className="absolute -bottom-2 -left-2 w-5 h-5 text-cyan-500/50 font-sans text-xl font-light select-none">+</div>
            <div className="absolute -bottom-2 -right-2 w-5 h-5 text-cyan-500/50 font-sans text-xl font-light select-none">+</div>
          </>
        );
      default:
        return null;
    }
  };

  const getTitleClass = () => {
    switch (activeState) {
      case 'AI':
        return 'text-4xl md:text-5xl font-extrabold tracking-normal font-outfit mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300';
      case 'BACKEND':
        return 'text-4xl md:text-5xl font-bold tracking-tight font-mono mb-4 text-green-500 text-shadow-[0_0_10px_rgba(34,197,94,0.6)]';
      case 'FRONTEND':
        return 'text-4xl md:text-5xl font-black tracking-tight font-jakarta mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-amber-300';
      case 'ROBOTICS':
        return 'text-4xl md:text-5xl font-bold tracking-widest font-sharetech mb-4 text-cyan-400';
      default:
        return 'text-4xl md:text-5xl font-extrabold tracking-tight font-mono mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500';
    }
  };

  const getButtonClass = (state: 'NEUTRAL' | 'AI' | 'BACKEND' | 'FRONTEND' | 'ROBOTICS') => {
    const isActive = activeState === state;
    
    switch (activeState) {
      case 'AI': {
        const baseClass = 'flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl font-outfit text-sm uppercase tracking-wider border transition-all duration-300 backdrop-blur-md relative';
        return isActive
          ? `${baseClass} bg-purple-500/20 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-105`
          : `${baseClass} bg-slate-950/45 border-slate-900 text-slate-400 hover:border-purple-500/40 hover:text-purple-300`;
      }
      case 'BACKEND': {
        const baseClass = 'flex items-center justify-center gap-3 px-5 py-3.5 rounded-none font-mono text-sm uppercase tracking-wide border-2 transition-all duration-300 relative';
        return isActive
          ? `${baseClass} bg-green-950/30 border-green-500 text-green-300 shadow-[0_0_10px_rgba(34,197,94,0.4)] scale-105`
          : `${baseClass} bg-black border-green-950 text-green-800 hover:border-green-500/50 hover:text-green-500`;
      }
      case 'FRONTEND': {
        const baseClass = 'flex items-center justify-center gap-3 px-6 py-4 rounded-full font-jakarta text-sm uppercase font-bold tracking-wider border transition-all duration-300 backdrop-blur-lg relative';
        return isActive
          ? `${baseClass} bg-gradient-to-r from-pink-500/20 to-orange-500/20 border-pink-400 text-white shadow-lg shadow-pink-500/20 scale-105`
          : `${baseClass} bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/10 hover:text-white`;
      }
      case 'ROBOTICS': {
        const baseClass = 'flex items-center justify-center gap-3 px-5 py-3.5 rounded-md font-sharetech text-sm uppercase tracking-widest border-2 border-dashed transition-all duration-300 relative';
        return isActive
          ? `${baseClass} bg-cyan-950/20 border-cyan-400 text-cyan-300 scale-105`
          : `${baseClass} bg-[#030a16] border-cyan-950 text-cyan-700 hover:border-cyan-500/40 hover:text-cyan-400`;
      }
      default: {
        const baseClass = 'flex items-center justify-center gap-3 px-5 py-3.5 rounded-lg font-mono text-xs uppercase tracking-widest border transition-all duration-300 backdrop-blur-md relative';
        return isActive
          ? `${baseClass} bg-slate-500/20 border-slate-400 text-slate-200`
          : `${baseClass} bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-500/50 hover:text-slate-300`;
      }
    }
  };

  const getHeaderBorderClass = () => {
    switch (activeState) {
      case 'AI': return 'border-purple-950';
      case 'BACKEND': return 'border-green-900';
      case 'FRONTEND': return 'border-white/5';
      case 'ROBOTICS': return 'border-cyan-950';
      default: return 'border-slate-800';
    }
  };

  return (
    <>
      {activeState === 'BACKEND' && <div className="crt-scanlines" />}
      <div className={getWrapperClass()}>
        
        {/* Top Banner: Diagnostics & System Logo */}
        <header className={`w-full max-w-6xl flex justify-between items-center border-b ${getHeaderBorderClass()} pb-4 backdrop-blur-sm pointer-events-auto`}>
          <div className="flex items-center gap-3">
            <Terminal className={`w-5 h-5 ${activeState === 'BACKEND' ? 'text-green-500' : activeState === 'AI' ? 'text-purple-400' : activeState === 'FRONTEND' ? 'text-pink-400' : 'text-cyan-400'} animate-pulse`} />
            <span className="text-sm tracking-wider opacity-85">
              SYS_OPERATIONAL // <span className={activeState === 'BACKEND' ? 'text-green-400' : activeState === 'AI' ? 'text-purple-400' : activeState === 'FRONTEND' ? 'text-pink-400' : 'text-cyan-400'}>ANGELO.DEV_V2</span>
            </span>
          </div>
        </header>

        {/* Main Centered Panel HUD */}
        <main className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={getPanelClass()}
          >
            {renderCorners()}

            {/* Glitch styled title */}
            <h1 className={getTitleClass()}>
              ANGELO BENAVIDES
            </h1>

            <div className="h-6 flex items-center justify-center text-xs md:text-sm opacity-85 tracking-wide mb-6">
              <span className={`mr-2 ${activeState === 'BACKEND' ? 'text-green-500' : activeState === 'AI' ? 'text-purple-400' : activeState === 'FRONTEND' ? 'text-pink-400' : 'text-cyan-400'}`}>&gt;</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeState}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="font-semibold"
                >
                  {subTitles[activeState]}
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="opacity-70 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              {activeState === 'NEUTRAL' && (
                'Estudiante apasionado de la Universidad Politécnica Estatal del Carchi (UPEC). Explora las categorías de abajo para mutar el canvas interactivo, cargar stylesheets dinámicos y proyectar mis proyectos.'
              )}
              {activeState === 'AI' && (
                'Desarrollo e integración de Large Language Models (LLM), aplicaciones de búsqueda contextual inteligente con RAG, y bases de datos vectoriales.'
              )}
              {activeState === 'BACKEND' && (
                'Creación de APIs REST, servidores con flujo bidireccional mediante WebSockets, criptografía y programación de sistemas asíncronos y robustos.'
              )}
              {activeState === 'FRONTEND' && (
                'Interfaces web responsivas premium con estéticas futuristas fluidas, componentes estructurados y optimización visual meticulosa.'
              )}
              {activeState === 'ROBOTICS' && (
                'Construcción de hardware inteligente, robótica biónica adaptativa (BIOSTRIDE), cinemática directa/inversa y firmware para microcontroladores.'
              )}
            </p>
          </motion.div>

          {/* Categories navigation overlay button grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full mt-10 max-w-4xl px-4 pointer-events-auto">
            <button
              onClick={() => onStateChange('AI')}
              className={getButtonClass('AI')}
            >
              <Cpu className="w-5 h-5 text-purple-400/80" />
              <span>I.A. & Datos</span>
            </button>
            
            <button
              onClick={() => onStateChange('BACKEND')}
              className={getButtonClass('BACKEND')}
            >
              <HardDrive className="w-5 h-5 text-emerald-400/80" />
              <span>Sistemas / Back</span>
            </button>

            <button
              onClick={() => onStateChange('FRONTEND')}
              className={getButtonClass('FRONTEND')}
            >
              <LayoutTemplate className="w-5 h-5 text-pink-400/80" />
              <span>Frontend</span>
            </button>

            <button
              onClick={() => onStateChange('ROBOTICS')}
              className={getButtonClass('ROBOTICS')}
            >
              <Bot className="w-5 h-5 text-cyan-400/80" />
              <span>Robótica / IoT</span>
            </button>
          </div>

          {activeState !== 'NEUTRAL' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onStateChange('NEUTRAL')}
              className={`mt-6 flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 border border-slate-800 rounded-full backdrop-blur-sm transition-all duration-300 pointer-events-auto ${activeState === 'BACKEND' ? 'hover:border-green-500 hover:text-green-300 rounded-none' : activeState === 'AI' ? 'hover:border-purple-500 hover:text-purple-300' : activeState === 'FRONTEND' ? 'hover:bg-white/10' : 'hover:border-cyan-500 hover:text-cyan-300'}`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resetear Sistema</span>
            </motion.button>
          )}
        </main>

        {/* Bottom Panel: Dynamic terminal diagnostics logs */}
        <footer className={`w-full max-w-6xl mt-4 border-t ${getHeaderBorderClass()} pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 backdrop-blur-sm pointer-events-auto`}>
          <div className="flex-1 w-full">
            <div className="text-xs opacity-50 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${activeState === 'BACKEND' ? 'bg-green-500' : activeState === 'AI' ? 'bg-purple-500' : activeState === 'FRONTEND' ? 'bg-pink-500' : 'bg-cyan-500'} animate-pulse`}></span>
              Diagnóstico Terminal en Tiempo Real
            </div>
            <div className={`p-3 rounded-lg border font-mono text-[10px] sm:text-xs leading-normal overflow-hidden h-20 flex flex-col justify-end ${activeState === 'BACKEND' ? 'bg-black border-green-500/30 text-green-400' : activeState === 'AI' ? 'bg-slate-950/70 border-purple-500/10 text-purple-300/80' : activeState === 'FRONTEND' ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-[#030a16]/80 border-cyan-500/20 text-cyan-300/80'}`}>
              {terminalLogs.map((log, index) => (
                <div key={index} className="truncate">
                  <span className="opacity-60">&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col text-right opacity-40 self-end md:self-center w-full md:w-auto text-xs">
            <div>CONNECTIVITY: SECURE</div>
            <div>STATUS: ACTIVE</div>
            <div>© {new Date().getFullYear()} ANGELO BENAVIDES</div>
          </div>
        </footer>
      </div>
    </>
  );
};
