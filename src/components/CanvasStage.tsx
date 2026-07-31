'use client';

import React, { useEffect, useRef } from 'react';

interface CanvasStageProps {
  state: 'NEUTRAL' | 'AI' | 'BACKEND' | 'FRONTEND' | 'ROBOTICS';
}

export const CanvasStage: React.FC<CanvasStageProps> = ({ state }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track Mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize particles for NEUTRAL / AI states
    const particleCount = 100;
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseSize: number;
      size: number;
      color: string;
      originalColor: string;
      // Morphing properties
      targetX?: number;
      targetY?: number;
    }

    const particles: Particle[] = [];
    const colors = ['#58cdd1', '#eb196e', '#a855f7', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        baseSize: Math.random() * 2 + 1,
        size: 0,
        color: color,
        originalColor: color,
      });
    }

    // Backend Matrix streams setup
    const fontSize = 14;
    const columns = Math.floor(width / fontSize) + 1;
    const matrixDrops: number[] = Array(columns).fill(0).map(() => Math.random() * -100);

    // Frontend waves parameters
    let wavePhase = 0;

    // Robotics gears variables
    let gearAngle = 0;

    // Smooth color state transitions
    let bgRed = 5;
    let bgGreen = 5;
    let bgBlue = 5;

    // Main animation loop
    const render = () => {
      const currentState = stateRef.current;

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Setup Background Colors based on State
      let targetBg = { r: 5, g: 5, b: 5 }; // Neutral Dark
      if (currentState === 'AI') {
        targetBg = { r: 12, g: 8, b: 24 }; // Deep Purple/Violet Space
      } else if (currentState === 'BACKEND') {
        targetBg = { r: 2, g: 8, b: 5 }; // Matrix Deep Green
      } else if (currentState === 'FRONTEND') {
        targetBg = { r: 20, g: 6, b: 15 }; // Deep warm magenta
      } else if (currentState === 'ROBOTICS') {
        targetBg = { r: 0, g: 27, b: 58 }; // Blueprint deep blue
      }

      // Smoothly interpolate background color
      bgRed += (targetBg.r - bgRed) * 0.05;
      bgGreen += (targetBg.g - bgGreen) * 0.05;
      bgBlue += (targetBg.b - bgBlue) * 0.05;

      ctx.fillStyle = `rgb(${Math.floor(bgRed)}, ${Math.floor(bgGreen)}, ${Math.floor(bgBlue)})`;
      ctx.fillRect(0, 0, width, height);

      // Render States
      switch (currentState) {
        case 'NEUTRAL':
          drawNeutralState(ctx, particles, width, height, mouse);
          break;
        case 'AI':
          drawAIState(ctx, particles, width, height, mouse);
          break;
        case 'BACKEND':
          drawBackendState(ctx, width, height, matrixDrops, fontSize);
          break;
        case 'FRONTEND':
          wavePhase += 0.02;
          drawFrontendState(ctx, width, height, wavePhase, mouse);
          break;
        case 'ROBOTICS':
          gearAngle += 0.005;
          drawRoboticsState(ctx, width, height, gearAngle);
          break;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // --- STATE 0: NEUTRAL ---
    const drawNeutralState = (
      ctx: CanvasRenderingContext2D,
      parts: Particle[],
      w: number,
      h: number,
      mouse: { x: number; y: number }
    ) => {
      // Draw a subtle starry background
      parts.forEach((p) => {
        // Star movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Interactivity: gentle repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
        }

        // Draw particle
        p.size += (p.baseSize - p.size) * 0.1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
      });
    };

    // --- STATE 1: AI (Neural Network) ---
    const drawAIState = (
      ctx: CanvasRenderingContext2D,
      parts: Particle[],
      w: number,
      h: number,
      mouse: { x: number; y: number }
    ) => {
      // Draw nodes and synapses
      const maxConnectDist = 120;

      parts.forEach((p, idx) => {
        p.x += p.vx * 1.5;
        p.y += p.vy * 1.5;

        // Wrap around
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Repel from mouse
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          const force = (150 - mdist) / 150;
          p.x += (mdx / mdist) * force * 2;
          p.y += (mdy / mdist) * force * 2;
        }

        p.size += ((p.baseSize * 1.5) - p.size) * 0.1;

        // Draw synapses
        for (let j = idx + 1; j < parts.length; j++) {
          const p2 = parts[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (maxConnectDist - dist) / maxConnectDist;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            // Pulse traveling along connections
            const time = Date.now() * 0.002;
            const isPulse = (idx + j) % 15 === 0;

            if (isPulse) {
              const grad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
              const offset = (Math.sin(time + idx) + 1) / 2;
              grad.addColorStop(0, `rgba(88, 205, 209, ${alpha * 0.2})`);
              grad.addColorStop(offset, `rgba(235, 25, 110, ${alpha})`);
              grad.addColorStop(1, `rgba(168, 85, 247, ${alpha * 0.2})`);
              ctx.strokeStyle = grad;
              ctx.lineWidth = 1.5;
            } else {
              ctx.strokeStyle = `rgba(88, 205, 209, ${alpha * 0.25})`;
              ctx.lineWidth = 0.5;
            }

            ctx.stroke();
          }
        }

        // Draw glowing Node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + 1, 0, Math.PI * 2);
        ctx.fillStyle = p.originalColor;
        ctx.shadowColor = p.originalColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      });
    };

    // --- STATE 2: BACKEND (Matrix / Data Topography) ---
    const drawBackendState = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      drops: number[],
      fSize: number
    ) => {
      // Draw grid
      ctx.strokeStyle = 'rgba(0, 255, 127, 0.04)';
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Matrix Rain
      ctx.fillStyle = 'rgba(0, 255, 127, 0.6)';
      ctx.font = `bold ${fSize}px monospace`;

      const chars = '01ABCDEFUX<>[]{}+=-*';

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fSize;

        // Draw character
        // Occasional highlighted glowing character
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#58cdd1';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = 'rgba(88, 205, 209, 0.55)';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        // Update coordinate
        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += fSize * 0.8;
        }
      });
      ctx.shadowBlur = 0;
    };

    // --- STATE 3: FRONTEND (Fluid Waves) ---
    const drawFrontendState = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      phase: number,
      mouse: { x: number; y: number }
    ) => {
      // Waves setup
      const waveCount = 3;
      const waveColors = [
        'rgba(235, 25, 110, 0.35)',  // Neon Pink
        'rgba(249, 115, 22, 0.25)',  // Orange
        'rgba(88, 205, 209, 0.15)',  // Neon Cyan
      ];

      for (let i = 0; i < waveCount; i++) {
        ctx.fillStyle = waveColors[i];
        ctx.beginPath();

        const amplitude = 40 + i * 20 + (mouse.y * 0.1); // reactive amplitude
        const frequency = 0.003 - i * 0.0005;

        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 10) {
          const y = h - 250 - (i * 50) + Math.sin(x * frequency + phase + i) * amplitude;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
      }

      // Draw floating bubbles that follow the waves
      for (let i = 0; i < 15; i++) {
        const bubbleX = (w / 15) * i + Math.sin(phase + i) * 20;
        const bubbleY = h - 300 + Math.cos(phase * 0.5 + i) * 80;
        ctx.beginPath();
        ctx.arc(bubbleX, bubbleY, 3 + (i % 5), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(235, 25, 110, 0.25)';
        ctx.strokeStyle = 'rgba(235, 25, 110, 0.6)';
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
      }
    };

    // --- STATE 4: ROBOTICS (Blueprint & Wireframes) ---
    const drawRoboticsState = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      angle: number
    ) => {
      // Blueprint grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      const grid = 50;
      for (let x = 0; x < w; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Technical crosshairs
      ctx.strokeStyle = 'rgba(88, 205, 209, 0.15)';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 200, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(w / 2 - 250, h / 2);
      ctx.lineTo(w / 2 + 250, h / 2);
      ctx.moveTo(w / 2, h / 2 - 250);
      ctx.lineTo(w / 2, h / 2 + 250);
      ctx.stroke();

      // Rotating Mechanical Gears (Draw at Bottom-Right and Top-Left)
      drawWireframeGear(ctx, w - 180, h - 180, 100, 12, angle, 'rgba(88, 205, 209, 0.3)');
      drawWireframeGear(ctx, w - 180, h - 180, 50, 8, -angle * 2 + 0.5, 'rgba(235, 25, 110, 0.3)');
      drawWireframeGear(ctx, 150, 150, 80, 10, -angle * 0.8, 'rgba(88, 205, 209, 0.2)');

      // Draw kinematic robotic link in wireframe
      drawRoboticArm(ctx, w / 2, h / 2 + 100, angle);
    };

    const drawWireframeGear = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number,
      teeth: number,
      rotation: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const theta1 = (i / teeth) * Math.PI * 2;
        const theta2 = ((i + 0.3) / teeth) * Math.PI * 2;
        const theta3 = ((i + 0.5) / teeth) * Math.PI * 2;
        const theta4 = ((i + 0.8) / teeth) * Math.PI * 2;

        const innerR = r - 12;
        const outerR = r + 8;

        ctx.lineTo(Math.cos(theta1) * innerR, Math.sin(theta1) * innerR);
        ctx.lineTo(Math.cos(theta2) * outerR, Math.sin(theta2) * outerR);
        ctx.lineTo(Math.cos(theta3) * outerR, Math.sin(theta3) * outerR);
        ctx.lineTo(Math.cos(theta4) * innerR, Math.sin(theta4) * innerR);
      }
      ctx.closePath();
      ctx.stroke();

      // Outer circle rim
      ctx.beginPath();
      ctx.arc(0, 0, r - 6, 0, Math.PI * 2);
      ctx.stroke();

      // Inner axle circle
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.stroke();

      // Spokes
      for (let i = 0; i < 4; i++) {
        const spokeAngle = (i / 4) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(spokeAngle) * 15, Math.sin(spokeAngle) * 15);
        ctx.lineTo(Math.cos(spokeAngle) * (r - 6), Math.sin(spokeAngle) * (r - 6));
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawRoboticArm = (ctx: CanvasRenderingContext2D, bx: number, by: number, angle: number) => {
      ctx.strokeStyle = 'rgba(88, 205, 209, 0.25)';
      ctx.lineWidth = 2;

      // Joints angles calculations
      const shoulderAngle = -Math.PI / 4 + Math.sin(angle * 1.5) * 0.3;
      const elbowAngle = Math.PI / 3 + Math.cos(angle) * 0.4;

      const link1Length = 140;
      const link2Length = 100;

      // Base joint
      ctx.beginPath();
      ctx.arc(bx, by, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Elbow joint position
      const ex = bx + Math.cos(shoulderAngle) * link1Length;
      const ey = by + Math.sin(shoulderAngle) * link1Length;

      // Link 1 (Shoulder to Elbow)
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      // Elbow circle
      ctx.beginPath();
      ctx.arc(ex, ey, 8, 0, Math.PI * 2);
      ctx.stroke();

      // Tool position
      const tx = ex + Math.cos(shoulderAngle + elbowAngle) * link2Length;
      const ty = ey + Math.sin(shoulderAngle + elbowAngle) * link2Length;

      // Link 2 (Elbow to Tool)
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(tx, ty);
      ctx.stroke();

      // Tool end effector (Claw)
      ctx.beginPath();
      ctx.arc(tx, ty, 6, 0, Math.PI * 2);
      ctx.stroke();

      // Draw technical blueprint dimension lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + 160, by);
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex + 120, ey);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Start Loop
    render();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none transition-colors duration-1000 ease-in-out"
      style={{ zIndex: -1 }}
    />
  );
};
