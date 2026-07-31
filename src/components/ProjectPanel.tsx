'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal, Cpu, HardDrive, LayoutTemplate, Bot } from 'lucide-react';
import { Project, projects } from '../data/projects';

interface ProjectPanelProps {
  activeState: 'NEUTRAL' | 'AI' | 'BACKEND' | 'FRONTEND' | 'ROBOTICS';
  onProjectSelect: (project: Project) => void;
}

export const ProjectPanel: React.FC<ProjectPanelProps> = ({ activeState, onProjectSelect }) => {
  if (activeState === 'NEUTRAL') return null;

  // Filter projects by category
  const filteredProjects = projects.filter((p) => p.category === activeState);

  // Fonts and layouts based on theme
  const getPanelWrapperFont = () => {
    switch (activeState) {
      case 'AI': return 'font-outfit text-slate-100';
      case 'BACKEND': return 'font-mono text-green-400';
      case 'FRONTEND': return 'font-jakarta text-slate-100';
      case 'ROBOTICS': return 'font-sharetech text-cyan-200';
      default: return 'font-mono';
    }
  };

  const getHeaderIcon = () => {
    switch (activeState) {
      case 'AI': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'BACKEND': return <HardDrive className="w-5 h-5 text-green-500 animate-pulse" />;
      case 'FRONTEND': return <LayoutTemplate className="w-5 h-5 text-pink-400" />;
      case 'ROBOTICS': return <Bot className="w-5 h-5 text-cyan-400" />;
      default: return <Terminal className="w-5 h-5" />;
    }
  };

  const getCardClass = () => {
    const base = 'group relative p-5 backdrop-blur-md transition-all duration-300 shadow-xl flex flex-col justify-between min-h-[230px] border pointer-events-auto';
    switch (activeState) {
      case 'AI':
        return `${base} rounded-xl bg-slate-950/45 border-slate-900 hover:border-purple-500/40 hover:shadow-purple-500/5`;
      case 'BACKEND':
        return `${base} rounded-none bg-black border-green-950 hover:border-green-500 hover:shadow-green-500/10`;
      case 'FRONTEND':
        return `${base} rounded-[2rem] bg-white/5 border-white/5 hover:border-pink-500/30 hover:scale-[1.02] hover:shadow-2xl frontend-glow`;
      case 'ROBOTICS':
        return `${base} rounded-none bg-[#030a16]/90 border-cyan-950 hover:border-cyan-500/50 hover:shadow-cyan-500/5 border-2 border-dashed`;
      default:
        return `${base} rounded-xl bg-slate-950/70 border-slate-900`;
    }
  };

  const getTitleClass = () => {
    switch (activeState) {
      case 'AI': return 'font-outfit text-base font-semibold text-slate-100 group-hover:text-purple-300 transition-colors mb-2';
      case 'BACKEND': return 'font-mono text-base font-bold tracking-tight text-green-400 group-hover:text-green-300 transition-colors mb-2';
      case 'FRONTEND': return 'font-jakarta text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-orange-400 transition-all duration-300 mb-2';
      case 'ROBOTICS': return 'font-sharetech text-base font-bold tracking-widest text-cyan-300 group-hover:text-cyan-200 transition-colors mb-2';
      default: return 'font-mono text-base font-bold text-white';
    }
  };

  const getTagClass = () => {
    switch (activeState) {
      case 'AI': return 'font-outfit text-[10px] bg-purple-950/20 border border-purple-900/30 text-purple-300 px-2 py-0.5 rounded-md';
      case 'BACKEND': return 'font-mono text-[10px] bg-black border border-green-950 text-green-600 px-1.5 py-0.5 rounded-none';
      case 'FRONTEND': return 'font-jakarta text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2 py-0.5 rounded-full';
      case 'ROBOTICS': return 'font-sharetech text-[10px] bg-[#041226] border border-cyan-900/30 text-cyan-400 px-2 py-0.5 rounded-sm';
      default: return 'font-mono text-[9px] bg-slate-900 border border-slate-800 text-slate-500 px-1.5 py-0.5 rounded';
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Live':
      case 'Online':
        return activeState === 'BACKEND' ? 'bg-green-500 text-green-300 border-green-500/30' : 'bg-emerald-500 text-emerald-400 border-emerald-500/30';
      case 'Active':
        return 'bg-cyan-500 text-cyan-400 border-cyan-500/30';
      case 'Prototype':
        return 'bg-amber-500 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-500 text-slate-400 border-slate-700/30';
    }
  };

  const renderCorners = () => {
    if (activeState === 'BACKEND') {
      return (
        <>
          <div className="absolute top-1.5 left-1.5 text-[8px] text-green-500/30 select-none">[OBJ]</div>
        </>
      );
    }
    if (activeState === 'ROBOTICS') {
      return (
        <>
          <div className="absolute -top-2.5 -left-1 text-cyan-500/30 font-sans text-xs select-none">+</div>
          <div className="absolute -top-2.5 -right-1.5 text-cyan-500/30 font-sans text-xs select-none">+</div>
          <div className="absolute -bottom-1 -left-1 text-cyan-500/30 font-sans text-xs select-none">+</div>
          <div className="absolute -bottom-1 -right-1.5 text-cyan-500/30 font-sans text-xs select-none">+</div>
        </>
      );
    }
    if (activeState === 'AI') {
      return (
        <>
          <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-purple-500/40 rounded-full" />
          <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-purple-500/40 rounded-full" />
        </>
      );
    }
    return null;
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 16 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      key={activeState} // force re-animation when state changes
      className={`w-full max-w-6xl px-6 sm:px-8 pb-16 z-20 pointer-events-auto ${getPanelWrapperFont()}`}
    >
      {/* Category Header */}
      <div className={`flex items-center gap-3 mb-8 border-b ${activeState === 'BACKEND' ? 'border-green-950' : activeState === 'AI' ? 'border-purple-950' : activeState === 'FRONTEND' ? 'border-white/5' : 'border-cyan-950'} pb-3`}>
        {getHeaderIcon()}
        <h2 className="text-sm tracking-[0.2em] opacity-75 uppercase">
          {activeState === 'BACKEND' ? (
            `[ LOCALHOST_DATABASE: ${filteredProjects.length} STACKS_FOUND ]`
          ) : activeState === 'ROBOTICS' ? (
            `// BLUEPRINT_SECTOR: ${filteredProjects.length} ENG_SCHEMATICS`
          ) : (
            `[ REPOSITORIOS_SECTOR: ${activeState} // ${filteredProjects.length} REGISTROS ]`
          )}
        </h2>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            className={getCardClass()}
          >
            {renderCorners()}

            <div>
              {/* Header inside Card */}
              <div className="flex justify-between items-start gap-2 mb-3">
                <span className="text-[10px] opacity-40 uppercase font-mono">
                  ID_{project.id.slice(0, 8)}
                </span>
                
                {/* Status indicator */}
                <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-bold bg-opacity-10 ${getStatusColor(project.status)} ${activeState === 'BACKEND' ? 'rounded-none border-green-500/40' : activeState === 'ROBOTICS' ? 'rounded-sm' : ''}`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${project.status === 'Prototype' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  {project.status}
                </div>
              </div>

              {/* Title */}
              <h3 className={getTitleClass()}>
                {project.title}
              </h3>

              {/* Description */}
              <p className="opacity-60 text-[11px] sm:text-xs leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>
            </div>

            <div>
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className={getTagClass()}>
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-[9px] opacity-40 self-center font-mono ml-0.5">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              {/* Actions Footer */}
              <div className={`flex justify-between items-center border-t ${activeState === 'BACKEND' ? 'border-green-950' : activeState === 'AI' ? 'border-purple-950' : activeState === 'FRONTEND' ? 'border-white/5' : 'border-cyan-950'} pt-3 mt-auto`}>
                <button
                  onClick={() => onProjectSelect(project)}
                  className={`text-[10px] tracking-wider uppercase flex items-center gap-1.5 transition-colors ${activeState === 'BACKEND' ? 'text-green-400 hover:text-green-200' : activeState === 'AI' ? 'text-purple-400 hover:text-purple-200' : activeState === 'FRONTEND' ? 'text-pink-400 hover:text-orange-400' : 'text-cyan-400 hover:text-cyan-200'}`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Ver Detalle</span>
                </button>

                <div className="flex gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-55 hover:opacity-100 text-slate-100 hover:text-white transition-opacity p-1"
                    title="Código en GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-55 hover:opacity-100 text-slate-100 hover:text-white transition-opacity p-1"
                      title="Ver Sitio"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
