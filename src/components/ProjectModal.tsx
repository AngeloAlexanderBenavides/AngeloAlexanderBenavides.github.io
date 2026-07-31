'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, Terminal, BookOpen, HardDrive, LayoutTemplate, Bot } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // Dynamic styling based on project category
  const getModalFontClass = () => {
    switch (project.category) {
      case 'AI': return 'font-outfit text-slate-100';
      case 'BACKEND': return 'font-mono text-green-400 crt-flicker';
      case 'FRONTEND': return 'font-jakarta text-slate-100';
      case 'ROBOTICS': return 'font-sharetech text-cyan-200';
      default: return 'font-mono';
    }
  };

  const getModalClass = () => {
    const base = 'relative w-full max-w-2xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl flex flex-col z-10 border transition-all duration-300 pointer-events-auto';
    switch (project.category) {
      case 'AI':
        return `${base} rounded-2xl bg-slate-950/90 border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.1)]`;
      case 'BACKEND':
        return `${base} rounded-none bg-black border-2 border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.2)]`;
      case 'FRONTEND':
        return `${base} rounded-[2.5rem] bg-[#0c0512]/90 border-white/10 frontend-glow`;
      case 'ROBOTICS':
        return `${base} rounded-none bg-[#030a16]/95 border-2 border-dashed border-cyan-500/40 shadow-[inset_0_0_45px_rgba(6,182,212,0.12)]`;
      default:
        return `${base} rounded-2xl bg-slate-950/90 border-slate-800`;
    }
  };

  const getTitleClass = () => {
    switch (project.category) {
      case 'AI':
        return 'text-2xl md:text-3xl font-extrabold tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 mb-2';
      case 'BACKEND':
        return 'text-2xl md:text-3xl font-bold tracking-tight text-green-500 text-shadow-[0_0_10px_rgba(34,197,94,0.6)] mb-2';
      case 'FRONTEND':
        return 'text-2xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-amber-300 mb-2';
      case 'ROBOTICS':
        return 'text-2xl md:text-3xl font-bold tracking-widest text-cyan-400 mb-2';
      default:
        return 'text-2xl font-bold text-white font-mono mb-2';
    }
  };

  const getSectionHeaderIcon = () => {
    switch (project.category) {
      case 'AI': return <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />;
      case 'BACKEND': return <HardDrive className="w-4 h-4 text-green-500" />;
      case 'FRONTEND': return <LayoutTemplate className="w-4 h-4 text-pink-400" />;
      case 'ROBOTICS': return <Bot className="w-4 h-4 text-cyan-400" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getBoxClass = () => {
    switch (project.category) {
      case 'AI':
        return 'bg-purple-950/10 border border-purple-900/30 p-4 rounded-xl text-slate-300';
      case 'BACKEND':
        return 'bg-black border border-green-950/80 p-4 rounded-none text-green-500 font-mono';
      case 'FRONTEND':
        return 'bg-white/5 border border-white/10 p-4 rounded-[1.5rem] text-slate-300';
      case 'ROBOTICS':
        return 'bg-[#041226]/80 border border-cyan-900/40 p-4 rounded-md text-cyan-300';
      default:
        return 'bg-slate-900/30 border border-slate-900 p-4 rounded-lg';
    }
  };

  const getTagClass = () => {
    switch (project.category) {
      case 'AI': return 'text-xs bg-purple-950/20 border border-purple-900/30 text-purple-300 px-3 py-1 rounded-md';
      case 'BACKEND': return 'text-xs bg-black border border-green-950 text-green-500 px-2 py-0.5 rounded-none';
      case 'FRONTEND': return 'text-xs bg-white/5 border border-white/10 text-slate-300 px-3 py-1 rounded-full';
      case 'ROBOTICS': return 'text-xs bg-[#041226] border border-cyan-900/30 text-cyan-400 px-3 py-1 rounded-sm';
      default: return 'text-xs bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md';
    }
  };

  const getCloseButtonClass = () => {
    const base = 'absolute top-4 right-4 p-1.5 border transition-all duration-200';
    switch (project.category) {
      case 'AI': return `${base} rounded-full border-purple-950 text-purple-400 hover:text-purple-200 bg-purple-950/20`;
      case 'BACKEND': return `${base} rounded-none border-green-950 text-green-500 hover:text-green-300 bg-black`;
      case 'FRONTEND': return `${base} rounded-full border-white/5 text-slate-400 hover:text-white bg-white/5`;
      case 'ROBOTICS': return `${base} rounded-md border-cyan-950 text-cyan-400 hover:text-cyan-200 bg-cyan-950/20`;
      default: return `${base} rounded-full border-slate-800 text-slate-400 hover:text-white`;
    }
  };

  const getActionButtons = () => {
    switch (project.category) {
      case 'AI':
        return {
          github: 'flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-outfit text-xs uppercase tracking-wider text-slate-300 hover:text-white bg-purple-950/20 hover:bg-purple-950/40 border border-purple-900/40 transition-all duration-200',
          live: 'flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-outfit text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-300 hover:to-indigo-300 transition-all duration-200 shadow-md shadow-purple-500/10'
        };
      case 'BACKEND':
        return {
          github: 'flex items-center justify-center gap-2 px-5 py-2.5 rounded-none font-mono text-xs uppercase tracking-wide text-green-500 hover:text-green-300 bg-black border-2 border-green-950 hover:border-green-500 transition-all duration-200',
          live: 'flex items-center justify-center gap-2 px-5 py-2.5 rounded-none font-mono text-xs uppercase tracking-wide text-black bg-green-500 hover:bg-green-400 transition-all duration-200 font-bold shadow-md shadow-green-500/20'
        };
      case 'FRONTEND':
        return {
          github: 'flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-jakarta text-xs uppercase font-bold tracking-wider text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-200',
          live: 'flex items-center justify-center gap-2 px-6 py-3 rounded-full font-jakarta text-xs uppercase font-bold tracking-wider text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:scale-105 transition-all duration-200 shadow-lg shadow-pink-500/20'
        };
      case 'ROBOTICS':
        return {
          github: 'flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-sharetech text-xs uppercase tracking-widest text-cyan-300 hover:text-cyan-100 bg-[#030a16] border border-cyan-900 hover:border-cyan-500 transition-all duration-200',
          live: 'flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-sharetech text-xs uppercase tracking-widest text-[#030a16] bg-cyan-400 hover:bg-cyan-300 font-bold transition-all duration-200'
        };
      default:
        return {
          github: 'flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-widest text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all duration-200',
          live: 'flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-widest text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-200'
        };
    }
  };

  const renderCorners = () => {
    if (project.category === 'ROBOTICS') {
      return (
        <>
          <div className="absolute -top-3.5 -left-1.5 text-cyan-500/40 font-sans text-xl select-none">+</div>
          <div className="absolute -top-3.5 -right-2 text-cyan-500/40 font-sans text-xl select-none">+</div>
          <div className="absolute -bottom-1 -left-1.5 text-cyan-500/40 font-sans text-xl select-none">+</div>
          <div className="absolute -bottom-1 -right-2 text-cyan-500/40 font-sans text-xl select-none">+</div>
        </>
      );
    }
    if (project.category === 'AI') {
      return (
        <>
          <div className="absolute top-2 left-2 w-1 h-1 bg-purple-500/30 rounded-full" />
          <div className="absolute top-2 right-2 w-1 h-1 bg-purple-500/30 rounded-full" />
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-500/30 rounded-full" />
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-purple-500/30 rounded-full" />
        </>
      );
    }
    if (project.category === 'BACKEND') {
      return (
        <>
          <div className="absolute top-1 left-2 text-[8px] text-green-500/20 select-none">[SYS_DIAG_MOD]</div>
        </>
      );
    }
    return (
      <>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg" />
      </>
    );
  };

  const actionStyle = getActionButtons();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', duration: 0.45 }}
        className={`${getModalClass()} ${getModalFontClass()}`}
      >
        {renderCorners()}

        {/* Close Button */}
        <button
          onClick={onClose}
          className={getCloseButtonClass()}
          title="Cerrar Diagnóstico (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Diagnostic Header */}
        <div className={`flex items-center gap-2 mb-6 text-[10px] sm:text-xs uppercase tracking-[0.2em] border-b ${project.category === 'BACKEND' ? 'border-green-950 text-green-600' : project.category === 'AI' ? 'border-purple-950 text-purple-400/80' : project.category === 'FRONTEND' ? 'border-white/5 text-slate-400' : 'border-cyan-950 text-cyan-400/80'} pb-3`}>
          {getSectionHeaderIcon()}
          <span>
            {project.category === 'BACKEND' ? (
              `SYS_LOG // READ_OK // SECTOR_BACKEND`
            ) : project.category === 'ROBOTICS' ? (
              `// SCHEMATIC_LOG // DIAGNOSTIC_OK // SECTOR_IoT`
            ) : (
              `REGISTRO_DIAGNÓSTICO // MODULO_${project.category}`
            )}
          </span>
        </div>

        {/* Project Title */}
        <h2 className={getTitleClass()}>
          {project.title}
        </h2>

        {/* Category & Status badges */}
        <div className="flex flex-wrap gap-2 mb-6 select-none">
          <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase border ${project.category === 'BACKEND' ? 'rounded-none border-green-500/30 text-green-400' : project.category === 'ROBOTICS' ? 'rounded-sm border-cyan-500/30 text-cyan-400' : project.category === 'AI' ? 'rounded-md border-purple-500/30 text-purple-300' : 'rounded-full border-pink-500/30 text-pink-400'}`}>
            SECTOR: {project.category}
          </span>
          <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase bg-slate-900 border border-slate-800 text-slate-400 ${project.category === 'BACKEND' ? 'rounded-none' : project.category === 'ROBOTICS' ? 'rounded-sm' : 'rounded-full'}`}>
            ESTADO: {project.status}
          </span>
        </div>

        {/* Project Content */}
        <div className="space-y-6 flex-1 overflow-y-auto pr-1 max-h-[58vh]">
          {/* Objective/Description Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold tracking-wider opacity-60 uppercase flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Descripción del Sistema
            </h3>
            <p className={`${getBoxClass()} text-xs sm:text-sm leading-relaxed`}>
              {project.description}
            </p>
          </div>

          {/* Personal Contribution Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold tracking-wider opacity-60 uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              Aporte Personal & Aprendizaje
            </h3>
            <div className={`${getBoxClass()} border text-xs sm:text-sm leading-relaxed ${project.category === 'BACKEND' ? 'border-green-500/40 text-green-300' : project.category === 'AI' ? 'border-purple-500/30 text-purple-300/90 bg-purple-500/5' : project.category === 'FRONTEND' ? 'border-pink-500/20 text-pink-300/95 bg-pink-500/5' : 'border-cyan-500/30 text-cyan-300/90 bg-cyan-500/5'}`}>
              {project.contribution}
            </div>
          </div>

          {/* Technologies Tag Cloud */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold tracking-wider opacity-60 uppercase">
              Arsenal Utilizado
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className={getTagClass()}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className={`flex flex-col sm:flex-row gap-3 justify-end items-stretch sm:items-center mt-8 pt-4 border-t ${project.category === 'BACKEND' ? 'border-green-950' : project.category === 'AI' ? 'border-purple-950' : project.category === 'FRONTEND' ? 'border-white/5' : 'border-cyan-950'}`}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={actionStyle.github}
          >
            <Github className="w-4 h-4" />
            <span>Código Fuente</span>
          </a>
          
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={actionStyle.live}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Acceder al Sistema</span>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};
