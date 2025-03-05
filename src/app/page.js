"use client";

import { useRef, useState, useEffect } from "react";
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

  // État pour stocker les valeurs de position, taille et rotation des néons
  const [neonStyles, setNeonStyles] = useState([]);

  // Fonction pour générer des valeurs aléatoires
  const randomPosition = (min, max) => Math.random() * (max - min) + min;
  const randomSize = (min, max) => Math.random() * (max - min) + min;
  const randomRotation = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
    // Générer les néons et leur position une seule fois lors du montage du composant côté client
    const newNeonStyles = Array.from({ length: 12 }).map(() => ({
      top: `${randomPosition(5, 80)}%`,
      left: `${randomPosition(5, 80)}%`,
      width: `${randomSize(50, 100)}px`,
      height: `${randomSize(50, 100)}px`,
      transform: `rotate(${randomRotation(-15, 15)}deg)`,
    }));

    setNeonStyles(newNeonStyles);

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
          {/* Néons générés avec les styles calculés */}
          {neonStyles.map((style, index) => (
            <div
              key={index}
              className={`absolute blur-2xl opacity-30 animate-pulse 
                ${index % 7 === 0 ? "bg-blue-500" : ""}
                ${index % 7 === 1 ? "bg-pink-500" : ""}
                ${index % 7 === 2 ? "bg-green-500" : ""}
                ${index % 7 === 3 ? "bg-teal-400" : ""}
                ${index % 7 === 4 ? "bg-purple-400" : ""}
                ${index % 7 === 5 ? "bg-yellow-400" : ""}
                ${index % 7 === 6 ? "bg-red-500" : ""}`}
              style={style}
            ></div>
          ))}
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
