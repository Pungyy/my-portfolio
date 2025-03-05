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

export default function Home() {
  const container = useRef();
  const roadmapRef = useRef();
  const educationRef = useRef();
  const scrollIconRef = useRef();
  const [neonStyles, setNeonStyles] = useState([]);
  const [scrolling, setScrolling] = useState(false);
  const [showScrollIcon, setShowScrollIcon] = useState(false);

  const randomPosition = (min, max) => Math.random() * (max - min) + min;
  const randomSize = (min, max) => Math.random() * (max - min) + min;
  const randomRotation = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
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
      duration: 0.6,
      stagger: 0.05,
      ease: "power4.out",
      delay: 1,
      onComplete: () => {
        setShowScrollIcon(true);
      },
    });

    const heroSubText = new SplitType(".hero-section p", { types: "chars" });
    gsap.set(heroSubText.chars, { y: 400 });

    gsap.to(heroSubText.chars, {
      y: 0,
      duration: 0.001,
      stagger: 0.05,
      ease: "power4.out",
      delay: 1.4,
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

    gsap.fromTo(
      scrollIconRef.current,
      { y: 0 },
      {
        y: 20,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      }
    );

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <ReactLenis root>
      <Navbar />
      <GlowCursor />

      <div className="relative bg-black text-white overflow-hidden min-h-screen">
        <div className="absolute inset-0 pointer-events-none">
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

        <div className="hero-section h-screen flex flex-col items-center justify-center relative z-10" ref={container}>
          <h1 className="text-8xl md:text-9xl font-extrabold tracking-wide text-center">Ibrahim</h1>
          <p className="text-2xl mt-4">Full-Stack Developer | Web Enthusiast</p>
        </div>

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

        <div className="skills-section h-screen flex flex-col items-center justify-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Technical Skills</h2>
          <div className="flex flex-wrap justify-center gap-6 px-4 md:px-0">
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-html5 text-orange-500 text-4xl mr-2"></i> HTML
            </div>
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-css3-alt text-blue-500 text-4xl mr-2"></i> CSS
            </div>
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-js-square text-yellow-500 text-4xl mr-2"></i> JavaScript
            </div>
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-react text-cyan-400 text-4xl mr-2"></i> React
            </div>
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-node-js text-green-500 text-4xl mr-2"></i> Node.js (Express)
            </div>
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-php text-purple-600 text-4xl mr-2"></i> PHP
            </div>
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <i className="fab fa-bootstrap text-purple-500 text-4xl mr-2"></i> Bootstrap
            </div>
            <div className="text-xl flex items-center p-4 w-1/2 sm:w-1/4 md:w-1/4 justify-center">
              <SiTailwindcss className="text-blue-400 text-4xl mr-2" />
              Tailwind
            </div>
          </div>
        </div>

        {/* Icône de scroll */}
        {showScrollIcon && !scrolling && (
          <div
            ref={scrollIconRef}
            onClick={scrollToBottom}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-white text-3xl w-16 h-16 flex items-center justify-center border-4 border-white rounded-full cursor-pointer"
          >
            <i className="fas fa-chevron-down"></i>
          </div>
        )}
      </div>
    </ReactLenis>
  );
}
