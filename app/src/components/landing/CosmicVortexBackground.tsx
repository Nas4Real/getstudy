import React, { useEffect, useRef } from 'react';

interface CosmicVortexBackgroundProps {
  inverted?: boolean;
}

export const CosmicVortexBackground: React.FC<CosmicVortexBackgroundProps> = ({
  inverted = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate random stars
    const numStars = 120;
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.0004 + 0.0001,
      angle: Math.random() * Math.PI * 2,
    }));

    let rotationAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = inverted ? height * 0.85 : height * 0.15;
      const maxRadius = Math.max(width, height) * 0.95;

      // 1. Base dark background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // 2. Deep radial glow of the vortex
      const baseGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        maxRadius * 0.1,
        centerX,
        centerY,
        maxRadius
      );
      baseGradient.addColorStop(0, '#02050b');
      baseGradient.addColorStop(0.2, '#0c1e38');
      baseGradient.addColorStop(0.4, '#153358');
      baseGradient.addColorStop(0.65, '#0a1a2e');
      baseGradient.addColorStop(0.85, '#080d16');
      baseGradient.addColorStop(1, '#050505');

      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);

      // 3. Render swirling spiral vortex arms
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(1.3, 0.65); // Elliptical distortion to match the perspective in the reference

      rotationAngle += 0.0018;

      const numRings = 24;
      for (let i = 0; i < numRings; i++) {
        const ringProgress = i / numRings;
        const currentRadius = maxRadius * 0.15 + ringProgress * maxRadius * 0.75;
        const ringAlpha = Math.sin(ringProgress * Math.PI) * 0.38;

        ctx.save();
        ctx.rotate(rotationAngle * (i % 2 === 0 ? 1 : -0.7) + (i * Math.PI) / 8);

        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle =
          i % 3 === 0
            ? `rgba(137, 170, 204, ${ringAlpha * 1.2})`
            : i % 3 === 1
            ? `rgba(78, 133, 191, ${ringAlpha * 0.9})`
            : `rgba(40, 85, 140, ${ringAlpha * 0.6})`;
        ctx.lineWidth = 1.5 + Math.sin(ringProgress * 4) * 1.5;
        ctx.setLineDash([
          15 + Math.random() * 20,
          10 + Math.random() * 15,
          40 + Math.random() * 40,
          15,
        ]);
        ctx.stroke();
        ctx.restore();
      }

      // Center dark void of the vortex
      const voidGradient = ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        maxRadius * 0.22
      );
      voidGradient.addColorStop(0, 'rgba(5, 5, 5, 0.98)');
      voidGradient.addColorStop(0.5, 'rgba(8, 12, 20, 0.92)');
      voidGradient.addColorStop(0.8, 'rgba(12, 25, 45, 0.6)');
      voidGradient.addColorStop(1, 'rgba(12, 25, 45, 0)');

      ctx.fillStyle = voidGradient;
      ctx.beginPath();
      ctx.arc(0, 0, maxRadius * 0.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 4. Stars and particles drifting
      stars.forEach((star) => {
        star.angle += star.speed;
        const starX = star.x * width;
        const starY = star.y * height;
        const twinkle = Math.sin(Date.now() * 0.002 + star.angle * 10) * 0.25 + 0.75;

        ctx.beginPath();
        ctx.arc(starX, starY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 235, 255, ${star.alpha * twinkle})`;
        ctx.shadowColor = 'rgba(137, 170, 204, 0.8)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [inverted]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      aria-hidden="true"
    />
  );
};
