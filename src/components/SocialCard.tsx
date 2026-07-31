'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

interface SocialCardProps {
  activeState: 'NEUTRAL' | 'AI' | 'BACKEND' | 'FRONTEND' | 'ROBOTICS';
}

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/AngeloAlexanderBenavides', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/angelo-benavides-4421b126a/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/xaander___', label: 'Instagram' },
  { icon: Mail, href: 'mailto:angelobenavides.dev@gmail.com', label: 'Email' },
];

export const SocialCard: React.FC<SocialCardProps> = ({ activeState }) => {
  const getCardClass = () => {
    const base = 'relative flex flex-col items-center gap-3 px-6 py-5 w-full max-w-xs mx-auto backdrop-blur-xl pointer-events-auto transition-all duration-500';
    switch (activeState) {
      case 'AI':
        return `${base} rounded-2xl bg-purple-950/20 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.08)]`;
      case 'BACKEND':
        return `${base} rounded-none bg-black border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.1)]`;
      case 'FRONTEND':
        return `${base} rounded-[2rem] bg-white/5 border border-white/10 shadow-xl`;
      case 'ROBOTICS':
        return `${base} rounded-none bg-[#030a16]/90 border border-dashed border-cyan-500/30`;
      default:
        return `${base} rounded-2xl bg-slate-950/60 border border-slate-800/80`;
    }
  };

  const getNameClass = () => {
    switch (activeState) {
      case 'AI': return 'font-outfit font-bold text-base text-purple-200';
      case 'BACKEND': return 'font-mono font-bold text-base text-green-400';
      case 'FRONTEND': return 'font-jakarta font-black text-base text-white';
      case 'ROBOTICS': return 'font-sharetech font-bold text-base tracking-widest text-cyan-300';
      default: return 'font-mono font-bold text-base text-slate-100';
    }
  };

  const getTitleClass = () => {
    switch (activeState) {
      case 'AI': return 'text-[11px] text-purple-400/70 font-outfit';
      case 'BACKEND': return 'text-[10px] text-green-600 font-mono uppercase tracking-widest';
      case 'FRONTEND': return 'text-[11px] text-pink-400/80 font-jakarta';
      case 'ROBOTICS': return 'text-[10px] text-cyan-500/70 font-sharetech tracking-wider uppercase';
      default: return 'text-[11px] text-slate-400 font-mono';
    }
  };

  const getStatClass = () => {
    const base = 'flex-1 text-center px-3 py-2 text-[10px] font-bold uppercase tracking-wider';
    switch (activeState) {
      case 'AI': return `${base} rounded-lg bg-purple-950/20 border border-purple-900/30 text-purple-300`;
      case 'BACKEND': return `${base} rounded-none bg-black border border-green-950 text-green-500`;
      case 'FRONTEND': return `${base} rounded-full bg-white/5 border border-white/10 text-slate-300`;
      case 'ROBOTICS': return `${base} rounded-sm bg-cyan-950/20 border border-cyan-900/30 text-cyan-400`;
      default: return `${base} rounded-lg bg-slate-900/50 border border-slate-800 text-slate-400`;
    }
  };

  const getSocialButtonClass = () => {
    const base = 'p-2.5 rounded-full border transition-all duration-200 hover:scale-110';
    switch (activeState) {
      case 'AI':
        return `${base} border-purple-900/40 text-purple-400 hover:bg-purple-500/15 hover:border-purple-500/50 hover:text-purple-200`;
      case 'BACKEND':
        return `${base} rounded-none border-green-950 text-green-500 hover:bg-green-950 hover:border-green-500 hover:text-green-300`;
      case 'FRONTEND':
        return `${base} border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20 hover:text-white`;
      case 'ROBOTICS':
        return `${base} rounded-md border-cyan-900/40 text-cyan-400 hover:bg-cyan-950/30 hover:border-cyan-400/50 hover:text-cyan-200`;
      default:
        return `${base} border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-white`;
    }
  };

  const getContactButtonClass = () => {
    const base = 'w-full py-2 text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-200';
    switch (activeState) {
      case 'AI':
        return `${base} rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400`;
      case 'BACKEND':
        return `${base} rounded-none bg-black border-2 border-green-500/40 text-green-400 hover:bg-green-950 hover:border-green-400`;
      case 'FRONTEND':
        return `${base} rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30 text-pink-300 hover:from-pink-500/30 hover:to-orange-500/30`;
      case 'ROBOTICS':
        return `${base} rounded-md bg-cyan-950/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/40 hover:border-cyan-400`;
      default:
        return `${base} rounded-xl bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-700/50`;
    }
  };

  const getImgRingClass = () => {
    switch (activeState) {
      case 'AI': return 'ring-2 ring-purple-500/30 ring-offset-2 ring-offset-transparent';
      case 'BACKEND': return 'ring-2 ring-green-500/40 ring-offset-0';
      case 'FRONTEND': return 'ring-2 ring-pink-500/30 ring-offset-2 ring-offset-transparent';
      case 'ROBOTICS': return 'ring-2 ring-cyan-500/30 ring-offset-0 rounded-none';
      default: return 'ring-2 ring-slate-600/50 ring-offset-2 ring-offset-transparent';
    }
  };

  const getRoboticsScanLine = () => {
    if (activeState !== 'ROBOTICS') return null;
    return (
      <div className="absolute top-1 right-2 text-[8px] text-cyan-500/30 font-sharetech select-none">
        ID:ABD_v2
      </div>
    );
  };

  const titleMap = {
    NEUTRAL: 'Developer & Maker',
    AI: 'AI Engineer & LLM Integrator',
    BACKEND: 'Systems & Backend Dev',
    FRONTEND: 'Frontend & UI/UX Creator',
    ROBOTICS: 'Robotics & IoT Maker',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={getCardClass()}
    >
      {getRoboticsScanLine()}

      {/* Avatar */}
      <img
        src="https://github.com/AngeloAlexanderBenavides.png"
        alt="Angelo Benavides"
        className={`w-16 h-16 object-cover ${activeState === 'ROBOTICS' ? 'rounded-md' : 'rounded-full'} ${getImgRingClass()}`}
      />

      {/* Name & Title */}
      <div className="text-center">
        <p className={getNameClass()}>Angelo Benavides</p>
        <p className={getTitleClass()}>{titleMap[activeState]}</p>
      </div>

      {/* Stats */}
      <div className="flex gap-2 w-full">
        <div className={getStatClass()}>15+ Proyectos</div>
        <div className={getStatClass()}>UPEC Student</div>
      </div>

      {/* Social Icons */}
      <div className="flex gap-2">
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            className={getSocialButtonClass()}
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>

      {/* Contact Button */}
      <a
        href="mailto:angelobenavides.dev@gmail.com"
        className={getContactButtonClass()}
      >
        Contactar
      </a>
    </motion.div>
  );
};
