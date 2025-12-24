"use client";

import { useEffect, useRef } from "react";

export function ThreeJSBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Particles array
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    // Festival colors
    const colors = [
      "#ff6b6b", // Red
      "#feca57", // Yellow
      "#48dbfb", // Blue
      "#ff9ff3", // Pink
      "#54a0ff", // Light blue
      "#5f27cd", // Purple
      "#00d2d3", // Cyan
      "#ff9f43", // Orange
    ];

    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    // Connection lines
    const connections: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
    }> = [];

    function animate() {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        width
      );
      gradient.addColorStop(0, "rgba(75, 0, 130, 0.1)"); // Purple center
      gradient.addColorStop(0.5, "rgba(25, 25, 112, 0.05)"); // Midnight blue
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)"); // Black edges

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Clear old connections
      connections.length = 0;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.3;
            connections.push({
              x1: particle.x,
              y1: particle.y,
              x2: other.x,
              y2: other.y,
              opacity,
            });
          }
        }

        // Draw particle with glow effect
        if (!ctx) return;
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;

        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Draw connections
      connections.forEach((connection) => {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = connection.opacity;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(connection.x1, connection.y1);
        ctx.lineTo(connection.x2, connection.y2);
        ctx.stroke();
        ctx.restore();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    />
  );
}
