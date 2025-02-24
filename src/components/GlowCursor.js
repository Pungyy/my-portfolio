"use client";

import { useEffect, useState } from "react";

function GlowCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrame;

    const smoothMove = () => {
      setSmoothPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.05,
          y: prev.y + dy * 0.05,
        };
      });

      animationFrame = requestAnimationFrame(smoothMove);
    };

    smoothMove();

    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  return (
    <div
      className="fixed top-0 left-0 w-12 h-12 bg-blue rounded-full opacity-100 pointer-events-none"
      style={{
        transform: `translate(${smoothPosition.x - 24}px, ${smoothPosition.y - 24}px)`,
        boxShadow: "0 0 40px 3px rgba(255, 255, 255, 0.8)",
      }}
    />
  );
}

export default GlowCursor;