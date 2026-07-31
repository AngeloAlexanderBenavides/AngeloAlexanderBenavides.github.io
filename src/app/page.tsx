'use client';

import React, { useState } from 'react';
import { CanvasStage } from '../components/CanvasStage';
import { HUDInterface } from '../components/HUDInterface';
import { ProjectPanel } from '../components/ProjectPanel';
import { ProjectModal } from '../components/ProjectModal';
import { Project } from '../data/projects';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TIMING MAP
//
//   0ms  → overlay fades in (350ms), unique animation begins
//          simultaneously → components fade OUT (450ms)
//  480ms → setActiveState fires (components already fully invisible — 0 opacity)
//          simultaneously → components fade back IN (600ms)
//  950ms → overlay starts fading out (500ms)
// 1450ms → overlay unmounted. Components are already fully back in at new theme.
//
// The state swap at 480ms is INVISIBLE because both the HUD and ProjectPanel
// have opacity:0 at that exact moment. No snap, no jump — ever.
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeState, setActiveState] = useState<'NEUTRAL' | 'AI' | 'BACKEND' | 'FRONTEND' | 'ROBOTICS'>('NEUTRAL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<'NEUTRAL' | 'AI' | 'BACKEND' | 'FRONTEND' | 'ROBOTICS'>('NEUTRAL');
  // Controls whether the UI components are faded out during the swap
  const [uiFading, setUiFading] = useState(false);

  const handleStateChange = (newState: 'NEUTRAL' | 'AI' | 'BACKEND' | 'FRONTEND' | 'ROBOTICS') => {
    if (newState === activeState || isTransitioning) return;
    setTransitionTarget(newState);
    setIsTransitioning(true);
    setUiFading(true);          // begin fading components out

    // At 480ms the components have zero opacity → safe to swap state silently
    setTimeout(() => {
      setActiveState(newState);
      setUiFading(false);       // immediately start fading back in with new theme
    }, 480);

    // Overlay exits at 950ms (500ms exit fade → fully gone at ~1450ms)
    setTimeout(() => setIsTransitioning(false), 950);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden">

      {/* Canvas morphs alongside the theme independently */}
      <CanvasStage state={activeState} />

      {/* ── UI LAYER — fades out before state swap, fades in after ─────────── */}
      <motion.div
        className="contents"
        animate={{ opacity: uiFading ? 0 : 1 }}
        transition={{
          duration: uiFading ? 0.45 : 0.6,   // fast fade-out, slow fade-in
          ease: uiFading ? 'easeIn' : 'easeOut',
        }}
      >
        <HUDInterface activeState={activeState} onStateChange={handleStateChange} />
        <ProjectPanel activeState={activeState} onProjectSelect={setSelectedProject} />
      </motion.div>

      {/* Project detail modal is unaffected by the theme transition */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* ── THEME TRANSITION OVERLAYS ──────────────────────────────────────── */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, exit: { duration: 0.5, ease: 'easeOut' } } as any}
            className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden"
          >

            {/* ── BACKEND — "System Breach" ───────────────────────────────── */}
            {transitionTarget === 'BACKEND' && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.88, opacity: 0, y: 10 }}
                  animate={{ scale: [0.88, 1.02, 1], opacity: [0, 1, 1, 0], y: [10, 0, 0, -8] }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], times: [0, 0.2, 0.7, 1] }}
                  className="z-10 bg-black border border-green-500/60 px-6 py-5 text-center max-w-xs sm:max-w-sm font-mono text-green-500 shadow-[0_0_40px_rgba(34,197,94,0.2)]"
                >
                  <div className="text-[9px] font-bold tracking-[0.3em] text-red-400 mb-2 uppercase animate-pulse">
                    !! Security Override !!
                  </div>
                  <div className="text-[10px] text-green-400/80 leading-relaxed uppercase tracking-wider">
                    direct node access established
                  </div>
                </motion.div>
                {/* Matrix rain */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.2, 0.2, 0] }}
                  transition={{ duration: 1.1, times: [0, 0.15, 0.75, 1] }}
                  className="absolute inset-0 grid grid-cols-6 sm:grid-cols-12 text-[9px] font-mono text-green-500 overflow-hidden"
                >
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: '-100%' }}
                      animate={{ y: '100%' }}
                      transition={{ duration: 1.1, delay: i * 0.06, ease: 'linear' }}
                      className="flex flex-col items-center"
                    >
                      {[...Array(18)].map((_, j) => (
                        <span key={j} className="block leading-tight">
                          {String.fromCharCode(33 + Math.floor(Math.random() * 93))}
                        </span>
                      ))}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* ── FRONTEND — "Liquid Wave" ───────────────────────────────── */}
            {transitionTarget === 'FRONTEND' && (
              <div className="absolute inset-0 bg-slate-950/10">
                {[...Array(28)].map((_, i) => {
                  const size = 50 + Math.random() * 90;
                  const top = Math.random() * 100;
                  const delay = 0.04 + (i / 28) * 0.45;
                  return (
                    <motion.div
                      key={i}
                      initial={{ x: '-120vw', opacity: 0, scale: 0.6 }}
                      animate={{
                        x: ['-120vw', '0vw', '120vw'],
                        opacity: [0, 0.7, 0.7, 0],
                        scale: [0.6, 1.15, 1.15, 0.7],
                      }}
                      transition={{
                        duration: 1.1,
                        delay,
                        ease: [0.4, 0, 0.2, 1],
                        times: [0, 0.4, 0.75, 1],
                      }}
                      className="absolute rounded-full bg-gradient-to-r from-pink-500/15 via-rose-400/30 to-amber-400/15 border border-white/10"
                      style={{ width: size, height: size, top: `${top}%`, filter: 'blur(2px)' }}
                    />
                  );
                })}
              </div>
            )}

            {/* ── ROBOTICS — "Scanner Sweep + Falling Bot" ──────────────── */}
            {transitionTarget === 'ROBOTICS' && (
              <div className="absolute inset-0 bg-slate-950/10">
                <motion.div
                  initial={{ x: '-110vw' }}
                  animate={{ x: '120vw' }}
                  transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute top-0 bottom-0 w-56 bg-gradient-to-r from-cyan-950/20 via-cyan-900/50 to-cyan-950/20 border-x border-cyan-400/60 flex items-center justify-center"
                  style={{ boxShadow: '0 0 30px rgba(6,182,212,0.2)' }}
                >
                  <span className="font-sharetech text-cyan-300/60 text-[9px] tracking-[0.35em] uppercase -rotate-90 whitespace-nowrap">
                    ASSEMBLY_SCAN
                  </span>
                </motion.div>
                <motion.div
                  initial={{ y: '-8vh', x: '44vw', rotate: -15, opacity: 0.9 }}
                  animate={{
                    y: ['-8vh', '72vh', '62vh', '74vh', '115vh'],
                    x: ['44vw', '47vw', '50vw', '53vw', '70vw'],
                    rotate: [-15, 160, 240, 340, 510],
                    opacity: [0.9, 1, 1, 0.9, 0],
                  }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], times: [0, 0.42, 0.58, 0.72, 1] }}
                  className="absolute text-cyan-400/90"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(6,182,212,0.5))' }}
                >
                  <Bot className="w-12 h-12" />
                </motion.div>
              </div>
            )}

            {/* ── AI & DATA — "Sonar Pulse" ──────────────────────────────── */}
            {transitionTarget === 'AI' && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/10">
                {[
                  { delay: 0,    color: 'border-purple-500/50' },
                  { delay: 0.2,  color: 'border-purple-400/30' },
                  { delay: 0.38, color: 'border-indigo-400/20' },
                ].map((ring, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.1, opacity: 0.9 }}
                    animate={{ scale: 3.5, opacity: 0 }}
                    transition={{ duration: 1.1, delay: ring.delay, ease: 'easeOut' }}
                    className={`absolute w-48 h-48 rounded-full border ${ring.color}`}
                  />
                ))}
                <div className="absolute opacity-[0.05] pointer-events-none">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-screen bg-purple-400" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-screen bg-purple-400" />
                </div>
                {[
                  { top: '28%', left: '22%', label: 'LORA_NODE' },
                  { top: '22%', left: '72%', label: 'VECTOR_DB' },
                  { top: '68%', left: '18%', label: 'RAG_SYNC' },
                  { top: '72%', left: '78%', label: 'LLM_TEMP' },
                  { top: '48%', left: '50%', label: 'CORE_SYNC' },
                ].map((node, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.85, 0.85, 0], scale: [0.5, 1.05, 1.05, 0.5] }}
                    transition={{ duration: 1.1, delay: 0.08 + i * 0.09, ease: 'easeInOut', times: [0, 0.25, 0.75, 1] }}
                    className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
                    style={{ top: node.top, left: node.left }}
                  >
                    <div className="w-3 h-3 rounded-full border border-purple-400 bg-slate-950/80 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                      <div className="w-1 h-1 bg-purple-300 rounded-full" />
                    </div>
                    <span className="mt-1 font-mono text-[8px] text-purple-300/90 tracking-widest bg-slate-950/70 px-1 py-0.5 rounded border border-purple-900/50 select-none">
                      {node.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
