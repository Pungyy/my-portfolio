"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";  // Utilisation de Image de Next.js pour le chargement optimisé des images
import { gsap } from "gsap";  // Importation de GSAP pour les animations

const projects = [
  { 
    id: 1, 
    title: "Projet 1", 
    description: "Description du projet 1.", 
    images: ["/mercadie/mercadie1.png", "/mercadie/mercadie2.png", "/mercadie/mercadie3.png"]
  },
  { 
    id: 2, 
    title: "Projet 2", 
    description: "Description du projet 2.", 
    images: ["/pizza/pizza.png", "/pizza/pizza2.png", "/pizza/pizza3.png"]
  },
  { 
    id: 3, 
    title: "Projet 3", 
    description: "Description du projet 3.", 
    images: ["/escape/escape.png", "/escape/escape2.png", "/escape/escape3.png"]
  },
  { 
    id: 4, 
    title: "Projet 3", 
    description: "Description du projet 3.", 
    images: ["/escape/escape.png", "/escape/escape2.png", "/escape/escape3.png"]
  },
  { 
    id: 5, 
    title: "Projet 3", 
    description: "Description du projet 3.", 
    images: ["/escape/escape.png", "/escape/escape2.png", "/escape/escape3.png"]
  },
  { 
    id: 6, 
    title: "Projet 3", 
    description: "Description du projet 3.", 
    images: ["/escape/escape.png", "/escape/escape2.png", "/escape/escape3.png"]
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const imageRef = useRef(null);  // Référence à l'image pour l'animation GSAP

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); 
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1));
  };

  // Animer l'image à chaque fois que l'index de l'image change
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 }, // état initial de l'animation
        { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" } // état final de l'animation
      );
    }
  }, [currentImageIndex]);  // L'animation se déclenche chaque fois que l'index de l'image change

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-6">MY PROJECTS</h1>
      
      {/* Grille de projets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer rounded-lg shadow-lg hover:scale-105 transition-transform"
            onClick={() => handleProjectClick(project)}
          >
            <Image 
              src={project.images[0]} 
              alt={project.title} 
              width={500} 
              height={300} 
              priority
            />
          </div>
        ))}
      </div>

      {/* Modal d'affichage du projet sélectionné */}
      {selectedProject && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/80"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-gray-900 p-10 rounded-lg shadow-lg text-center relative w-full max-w-5xl h-auto max-h-[80vh] overflow-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image du carousel avec référence pour l'animation */}
            <div ref={imageRef}>
              <Image 
                src={selectedProject.images[currentImageIndex]} 
                alt={selectedProject.title} 
                width={800} 
                height={500} 
                priority 
              />
            </div>
            
            {/* Informations du projet */}
            <h2 className="text-3xl font-semibold mt-4">{selectedProject.title}</h2>
            <p className="text-gray-300 mt-2">{selectedProject.description}</p>
            
            {/* Boutons de navigation du carousel */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer" onClick={handlePrevImage}>
              <span className="text-white text-3xl">‹</span>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer" onClick={handleNextImage}>
              <span className="text-white text-3xl">›</span>
            </div>

            <button
              className="mt-6 px-6 py-3 bg-red-600 rounded-lg"
              onClick={handleCloseModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
