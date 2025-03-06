"use client";

import { useRef, useState, useEffect } from "react";
import ReactLenis from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Navbar from "../components/navbar";
import { SiTailwindcss } from "react-icons/si";
import GlowCursor from "../components/GlowCursor"; // Import du composant GlowCursor

gsap.registerPlugin(ScrollTrigger);

const roadmapData = [
  { year: "2021 - 2023", title: "Institut G4", company: "Web Application Design & Development" },
  { year: "2021 - 2023", title: "Web Developer", company: "Novances IT" },
  { year: "2024 - Present", title: "Full-Stack Developer", company: "One System" },
  { year: "2024 - 2027", title: "My Digital School Lyon", company: "Full-Stack Web Developer" },
];

export default function Home() {
  const container = useRef();
  const roadmapRef = useRef();
  const skillsRef = useRef();
  const scrollIconRef = useRef();
  const [neonStyles, setNeonStyles] = useState([]);
  const [scrolling, setScrolling] = useState(false);
  const [showScrollIcon, setShowScrollIcon] = useState(false);

  useEffect(() => {
    const newNeonStyles = Array.from({ length: 12 }).map(() => ({
      top: `${Math.random() * 75 + 5}%`,
      left: `${Math.random() * 75 + 5}%`,
      width: `${Math.random() * 50 + 50}px`,
      height: `${Math.random() * 50 + 50}px`,
      transform: `rotate(${Math.random() * 30 - 15}deg)`,
    }));
  
    setNeonStyles(newNeonStyles);
  
    // Animation du texte "Ibrahim"
    const heroText = new SplitType(".hero-section h1", { types: "chars" });
    gsap.set(heroText.chars, { y: 400, opacity: 0 }); // Définit l'opacité initiale à 0
    gsap.to(heroText.chars, {
      y: 0,
      opacity: 1, // Transition de l'opacité de 0 à 1
      duration: 0.6,
      stagger: 0.05,
      ease: "power4.out",
      delay: 1,
      onComplete: () => setShowScrollIcon(true),
    });
  
    // Animation du texte "Full-Stack Developer | Web Enthusiast"
    const descriptionText = new SplitType(".hero-section p", { types: "chars" });
    gsap.set(descriptionText.chars, { y: 50, opacity: 0 }); // Définit l'opacité initiale à 0
    gsap.to(descriptionText.chars, {
      y: 0,
      opacity: 1, // Transition de l'opacité de 0 à 1
      duration: 0.6,
      stagger: 0.05,
      ease: "power4.out",
      delay: 1.5, // Un léger délai pour que cela commence après le titre
    });
  
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
  
    const skillsItems = gsap.utils.toArray(".skills-item");
    gsap.set(skillsItems, { opacity: 0, y: 50 });
  
    gsap.to(skillsItems, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reset",
      },
    });
  
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <ReactLenis root>
      <Navbar />
      <GlowCursor />

      <div className="relative bg-black text-white overflow-hidden min-h-screen">
        {/* Effet néon */}
        <div className="absolute inset-0 pointer-events-none">
          {neonStyles.map((style, index) => (
            <div
              key={index}
              className={`absolute blur-2xl opacity-30 animate-pulse ${["bg-blue-500", "bg-pink-500", "bg-green-500", "bg-teal-400", "bg-purple-400", "bg-yellow-400", "bg-red-500"][index % 7]}`}
              style={style}
            ></div>
          ))}
        </div>

        {/* Section Hero */}
        <div className="hero-section h-screen flex flex-col items-center justify-center relative z-10" ref={container}>
          <h1 className="text-8xl md:text-9xl font-extrabold tracking-wide text-center">Ibrahim</h1>
          <p className="text-2xl mt-4">Full-Stack Developer | Web Enthusiast</p>
        </div>

        {/* Section Roadmap */}
        <div className="relative text-white min-h-screen p-10" ref={roadmapRef}>
          <h2 className="text-4xl font-bold text-center mb-10">My Career Path</h2>
          <div className="relative flex flex-col items-center">
            <div className="w-1 bg-gray-500 absolute h-full left-1/2 transform -translate-x-1/2"></div>
            {roadmapData.map((item, index) => (
              <div key={index} className="roadmap-item flex flex-col items-center mb-10 w-full max-w-3xl relative">
                <div className={`${index % 2 === 0 ? "mr-auto text-right" : "ml-auto text-left"} p-4 rounded-lg w-64 shadow-lg`}>
                  <p className="text-sm text-gray-400">{item.year}</p>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm">{item.company}</p>
                </div>
                <div className="w-4 h-4 bg-white rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Skills */}
        <div className="skills-section h-screen flex flex-col items-center justify-center relative z-10" ref={skillsRef}>
          <h2 className="text-4xl font-bold mb-6">Technical Skills</h2>
          <div className="flex flex-wrap justify-center gap-6 px-4 md:px-0">
            {[{ icon: "fab fa-html5 text-orange-500", label: "HTML" }, { icon: "fab fa-css3-alt text-blue-500", label: "CSS" }, { icon: "fab fa-js-square text-yellow-500", label: "JavaScript" }, { icon: "fab fa-react text-cyan-400", label: "React" }, { icon: "fab fa-node-js text-green-500", label: "Node.js (Express)" }, { icon: "fab fa-php text-purple-600", label: "PHP" }, { icon: "fab fa-bootstrap text-purple-500", label: "Bootstrap" }, { icon: <SiTailwindcss className="text-blue-400 mr-2.5" />, label: "Tailwind" }].map((skill, index) => (
              <div key={index} className="skills-item text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
                {typeof skill.icon === "string" ? <i className={`${skill.icon} text-4xl mr-2.5`}></i> : skill.icon}
                {skill.label}
              </div>
            ))}
          </div>
        </div>

        {/* Icône de scroll */}
        {showScrollIcon && !scrolling && (
          <div
            ref={scrollIconRef}
            onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-white text-3xl w-16 h-16 flex items-center justify-center border-4 border-white rounded-full cursor-pointer"
          >
            <i className="fas fa-chevron-down"></i>
          </div>
        )}
      </div>
    </ReactLenis>
  );
}
