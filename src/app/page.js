"use client";

import { useRef, useEffect } from "react";
import ReactLenis from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Navbar from "../components/navbar"; // Assurez-vous que le chemin est correct

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef();
  const roadmapRef = useRef();
  const educationRef = useRef();

  // Fonction pour générer des valeurs aléatoires
  const randomPosition = (min, max) => Math.random() * (max - min) + min;
  const randomSize = (min, max) => Math.random() * (max - min) + min;
  const randomRotation = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
    const heroText = new SplitType(".hero-section h1", { types: "chars" });
    gsap.set(heroText.chars, { y: 400 });

    gsap.to(heroText.chars, {
      y: 0,
      duration: 1,
      stagger: 0.075,
      ease: "power4.out",
      delay: 1,
    });

    // Animation de la roadmap au scroll
    const roadmapItems = gsap.utils.toArray(".roadmap-item");
    gsap.set(roadmapItems, { opacity: 0, y: 50 });

    gsap.to(roadmapItems, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: roadmapRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reset",
      },
    });

    // Animation de la section éducation
    const educationItems = gsap.utils.toArray(".education-item");
    gsap.set(educationItems, { opacity: 0, y: 50 });

    gsap.to(educationItems, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: educationRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reset",
      },
    });
  }, []);

  return (
    <ReactLenis root>
      {/* Navbar en haut */}
      <Navbar />

      <div className="relative bg-black text-white overflow-hidden min-h-screen">
        {/* Effet de blur dynamique avec des néons ajustés de manière aléatoire */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Néon bleu aléatoire */}
          <div
            className="absolute bg-blue-500 blur-2xl opacity-30 animate-pulse"
            style={{
              top: `${randomPosition(10, 60)}%`,
              left: `${randomPosition(5, 50)}%`,
              width: `${randomSize(50, 100)}px`,
              height: `${randomSize(50, 100)}px`,
              transform: `rotate(${randomRotation(-15, 15)}deg)`,
            }}
          ></div>

          {/* Néon rose aléatoire */}
          <div
            className="absolute bg-pink-500 blur-2xl opacity-30 animate-pulse"
            style={{
              top: `${randomPosition(20, 70)}%`,
              left: `${randomPosition(30, 80)}%`,
              width: `${randomSize(50, 100)}px`,
              height: `${randomSize(50, 100)}px`,
              transform: `rotate(${randomRotation(-15, 15)}deg)`,
            }}
          ></div>

          {/* Néon vert aléatoire */}
          <div
            className="absolute bg-green-500 blur-2xl opacity-30 animate-pulse"
            style={{
              top: `${randomPosition(30, 80)}%`,
              left: `${randomPosition(10, 60)}%`,
              width: `${randomSize(50, 100)}px`,
              height: `${randomSize(50, 100)}px`,
              transform: `rotate(${randomRotation(-15, 15)}deg)`,
            }}
          ></div>

          {/* Néon teal aléatoire */}
          <div
            className="absolute bg-teal-400 blur-2xl opacity-30 animate-pulse"
            style={{
              top: `${randomPosition(15, 75)}%`,
              left: `${randomPosition(20, 70)}%`,
              width: `${randomSize(50, 100)}px`,
              height: `${randomSize(50, 100)}px`,
              transform: `rotate(${randomRotation(-15, 15)}deg)`,
            }}
          ></div>

          {/* Néon violet aléatoire */}
          <div
            className="absolute bg-purple-400 blur-2xl opacity-30 animate-pulse"
            style={{
              top: `${randomPosition(25, 85)}%`,
              left: `${randomPosition(10, 50)}%`,
              width: `${randomSize(50, 100)}px`,
              height: `${randomSize(50, 100)}px`,
              transform: `rotate(${randomRotation(-15, 15)}deg)`,
            }}
          ></div>

          {/* Néon jaune aléatoire */}
          <div
            className="absolute bg-yellow-400 blur-2xl opacity-30 animate-pulse"
            style={{
              top: `${randomPosition(5, 60)}%`,
              left: `${randomPosition(30, 80)}%`,
              width: `${randomSize(50, 100)}px`,
              height: `${randomSize(50, 100)}px`,
              transform: `rotate(${randomRotation(-15, 15)}deg)`,
            }}
          ></div>

          {/* Néon orange aléatoire */}
          <div
            className="absolute bg-orange-400 blur-2xl opacity-30 animate-pulse"
            style={{
              top: `${randomPosition(10, 80)}%`,
              left: `${randomPosition(10, 70)}%`,
              width: `${randomSize(50, 100)}px`,
              height: `${randomSize(50, 100)}px`,
              transform: `rotate(${randomRotation(-15, 15)}deg)`,
            }}
          ></div>

          {/* Néon indigo aléatoire */}
          <div
            className="absolute bg-indigo-400 blur-2xl opacity-30 animate-pulse"
            style={{
              top: `${randomPosition(15, 70)}%`,
              left: `${randomPosition(20, 75)}%`,
              width: `${randomSize(50, 100)}px`,
              height: `${randomSize(50, 100)}px`,
              transform: `rotate(${randomRotation(-15, 15)}deg)`,
            }}
          ></div>

          {/* Néon cyan aléatoire */}
          <div
            className="absolute bg-cyan-400 blur-2xl opacity-30 animate-pulse"
            style={{
              top: `${randomPosition(5, 50)}%`,
              left: `${randomPosition(30, 85)}%`,
              width: `${randomSize(50, 100)}px`,
              height: `${randomSize(50, 100)}px`,
              transform: `rotate(${randomRotation(-15, 15)}deg)`,
            }}
          ></div>

          {/* Néon violet clair aléatoire */}
          <div
            className="absolute bg-violet-300 blur-2xl opacity-30 animate-pulse"
            style={{
              top: `${randomPosition(25, 75)}%`,
              left: `${randomPosition(40, 90)}%`,
              width: `${randomSize(50, 100)}px`,
              height: `${randomSize(50, 100)}px`,
              transform: `rotate(${randomRotation(-15, 15)}deg)`,
            }}
          ></div>
        </div>

        {/* Première section */}
        <div className="hero-section h-screen flex flex-col items-center justify-center relative z-10" ref={container}>
          <h1 className="text-8xl md:text-9xl font-extrabold tracking-wide">Ibrahim</h1>
        </div>

        {/* Deuxième section - Roadmap */}
        <div className="roadmap-section h-screen flex flex-col items-center justify-center relative z-10" ref={roadmapRef}>
          <ul className="space-y-4 text-xl">
            <li className="roadmap-item">🎓 Études en développement web</li>
            <li className="roadmap-item">💼 Premier stage en entreprise</li>
            <li className="roadmap-item">🚀 Lancement de projets personnels</li>
            <li className="roadmap-item">📚 Apprentissage avancé en Next.js et animations</li>
            <li className="roadmap-item">🌍 Création de mon portfolio et networking</li>
          </ul>
        </div>

        {/* Troisième section - Parcours scolaire */}
        <div className="education-section h-screen flex flex-col items-center justify-center relative z-10" ref={educationRef}>
          <h2 className="text-6xl font-bold mb-6">Mon Parcours Scolaire</h2>
          <ul className="space-y-4 text-xl">
            <li className="education-item">🏫 Lycée Scientifique - Bac en sciences</li>
            <li className="education-item">💻 Formation en Développement Web</li>
            <li className="education-item">🎓 Diplôme en Informatique</li>
            <li className="education-item">🚀 Spécialisation en Next.js et animations web</li>
          </ul>
        </div>
      </div>
    </ReactLenis>
  );
}
