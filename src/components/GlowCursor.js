"use client";

import { useEffect, useState } from "react";

function GlowCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [rgbColor, setRgbColor] = useState("rgb(255, 0, 0)"); // Valeur initiale de la couleur RGB pour l'ombre
  const [isVisible, setIsVisible] = useState(true); // Nouvel état pour gérer la visibilité

  // Fonction pour générer une couleur RGB aléatoire
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Fonction pour effectuer une transition fluide entre les couleurs
  const interpolateColor = (color1, color2, factor) => {
    const c1 = color1.match(/\d+/g).map(Number);
    const c2 = color2.match(/\d+/g).map(Number);

    const interpolatedColor = c1.map((value, index) => {
      return Math.round(value + (c2[index] - value) * factor);
    });

    return `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]})`;
  };

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.innerWidth >= 768);
    };

    updateVisibility();
    window.addEventListener("resize", updateVisibility);

    return () => window.removeEventListener("resize", updateVisibility);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

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
  }, [position, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      const newColor = getRandomColor();
      setRgbColor((prevColor) => interpolateColor(prevColor, newColor, 0.1)); // Interpolation douce
    }, 100);

    return () => clearInterval(interval); // Nettoyage de l'intervalle lorsque le composant est démonté
  }, [isVisible]);

  if (!isVisible) return null; // Ne pas afficher le curseur si désactivé

  return (
    <div
      className="fixed top-0 left-0 w-12 h-12 bg-black rounded-full opacity-100 pointer-events-none"
      style={{
        transform: `translate(${smoothPosition.x - 24}px, ${smoothPosition.y - 24}px)`,
        boxShadow: `0 0 40px 10px ${rgbColor}`, // Ombre RGB dynamique avec un gradient
        zIndex: 9,
      }}
    />
  );
}

export default GlowCursor;