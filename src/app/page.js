"use client";

import { useRef, useState, useEffect } from "react";
import ReactLenis from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Navbar from "../components/navbar";
import { SiTailwindcss } from "react-icons/si"; // Importation de l'icône Tailwind CSS

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
          <h1 className="text-8xl md:text-9xl font-extrabold tracking-wide text-center">Ibrahim</h1>
          <p className="text-2xl mt-4">Full-Stack Developer | Web Enthusiast</p>
        </div>

        {/* Deuxième section - Expérience professionnelle */}
        <div className="roadmap-section h-screen flex flex-col items-center justify-center relative z-10" ref={roadmapRef}>
          <h2 className="text-4xl font-bold mb-6">Professional Experience</h2>
          <div className="space-y-4 text-xl max-w-3xl">
            <div className="roadmap-item">
              <strong>Full-Stack Developer</strong> at One System (Oct 2024 - Aug 2025)
            </div>
            <div className="roadmap-item">
              <strong>Web Developer</strong> at Novances IT (Nov 2021 - Jun 2023)
            </div>
          </div>
        </div>

        {/* Troisième section - Parcours scolaire */}
        <div className="education-section h-screen flex flex-col items-center justify-center relative z-10" ref={educationRef}>
          <h2 className="text-4xl font-bold mb-6">Education</h2>
          <div className="space-y-4 text-xl max-w-3xl">
            <div className="education-item">
              <strong>My Digital School Lyon</strong> - Full-Stack Web Developer (Sept 2024 - Oct 2025)
            </div>
            <div className="education-item">
              <strong>Institut G4</strong> - Web Application Design & Development (Sept 2021 - May 2023)
            </div>
          </div>
        </div>

        {/* Quatrième section - Compétences techniques avec icônes */}
        <div className="skills-section h-screen flex flex-col items-center justify-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Technical Skills</h2>
          <div className="flex flex-wrap justify-center gap-6 px-4 md:px-0">
            {/* HTML */}
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-html5 text-orange-500 text-4xl mr-2"></i> HTML
            </div>
            {/* CSS */}
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-css3-alt text-blue-500 text-4xl mr-2"></i> CSS
            </div>
            {/* JavaScript */}
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-js-square text-yellow-500 text-4xl mr-2"></i> JavaScript
            </div>
            {/* React */}
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-react text-cyan-400 text-4xl mr-2"></i> React
            </div>
            {/* Node.js */}
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-node-js text-green-500 text-4xl mr-2"></i> Node.js (Express)
            </div>
            {/* PHP */}
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-php text-purple-600 text-4xl mr-2"></i> PHP
            </div>
            {/* Bootstrap */}
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-bootstrap text-purple-500 text-4xl mr-2"></i> Bootstrap
            </div>
            {/* Tailwind */}
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <SiTailwindcss className="text-blue-400 text-4xl mr-2" />
              Tailwind
            </div>
          </div>
        </div>



      </div>
    </ReactLenis>
  );
}
