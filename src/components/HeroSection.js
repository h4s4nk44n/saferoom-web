import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  // Canvas-based animated particles background
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = 400;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // Particle system
    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.5 + Math.random() * 2.5,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      opacity: 0.3 + Math.random() * 0.5,
      color: `hsl(${200 + Math.random() * 60}, 90%, 60%)`
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
      // Animate
      for (let p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero-particles-bg" />
      <div className="hero-content">
        <h1 className="hero-title">The Next Era of Communication is Here</h1>
        <div className="hero-tagline">Serverless. Encrypted. AI-Powered.</div>
        <p>
          SafeRoom delivers a military-grade, serverless communication platform built for the demands of the modern world.
          <br />
          Zero servers. Zero compromise. Total privacy.
        </p>
        <div className="hero-cta-container">
          <a href="#technologies" className="cta-btn"><span>Explore the Architecture</span></a>
        </div>
      </div>
      <div className="hero-bg-gradient" />
    </section>
  );
};

export default HeroSection;