"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";  // Utilisation de Image de Next.js pour le chargement optimisé des images
import { gsap } from "gsap";  // Importation de GSAP pour les animations

const projects = [
  { 
    id: 1, 
    title: "Mercadie Project", 
    description: "Languages : HTML, CSS, JavaScript, jQuery, PHP", 
    images: ["/mercadie/mercadie1.png", "/mercadie/mercadie2.png", "/mercadie/mercadie3.png", "/mercadie/mercadie4.png", "/mercadie/mercadie5.png" , "/mercadie/mercadie6.png" ,"/mercadie/mercadie8.png",
          "/mercadie/mercadie9.png", "/mercadie/mercadie10.png", "/mercadie/mercadie11.png", "/mercadie/mercadie12.png"]
  },
  { 
    id: 2, 
    title: "Pizza Project", 
    description: "Description du projet 2.", 
    images: ["/pizza/pizza.png", "/pizza/pizza2.png", "/pizza/pizza3.png", "/pizza/pizza4.png", "/pizza/pizza5.png"]
  },
  { 
    id: 3, 
    title: "Projet 3", 
    description: "Description du projet 3.", 
    images: ["/escape/escape.png"]
  },
  { 
    id: 4, 
    title: "Projet 3", 
    description: "Description du projet 3.", 
    images: ["/escape/escape.png"]
  },
  { 
    id: 5, 
    title: "Projet 3", 
    description: "Description du projet 3.", 
    images: ["/traiteur.png"]
  },
  { 
    id: 6, 
    title: "Projet 3", 
    description: "Description du projet 3.", 
    images: ["/escape/escape.png"]
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
    <div className="mt-8 min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-8">MY PROJECTS</h1>
      
      {/* Grille de projets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer rounded-lg shadow-lg hover:scale-105 transition-transform"
            onClick={() => handleProjectClick(project)}
          >
            {/* Image de la grille avec largeur et hauteur fixes */}
            <Image 
              src={project.images[0]} 
              alt={project.title} 
              width={500} 
              height={300} 
              className="w-full h-[200px] object-cover rounded-lg" // Fixe la taille, responsive et garde le ratio
              priority
            />
          </div>
        ))}
      </div>

      {selectedProject && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/80"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-black p-14 rounded-lg shadow-lg text-center relative w-full max-w-5xl h-auto max-h-[80vh] overflow-hidden"  // Augmentation du padding
            onClick={(e) => e.stopPropagation()}
          >
            <div ref={imageRef} className="relative">
              {/* Image dans la modal avec une taille un peu plus petite pour ajouter de l'espace autour */}
              <Image 
                src={selectedProject.images[currentImageIndex]} 
                alt={selectedProject.title} 
                width={800} 
                height={500} 
                className="w-[80%] h-[350px] object-cover mx-auto"  // Réduit l'image et ajoute du padding avec "mx-auto" pour la centrer
                priority 
              />
            </div>
            
            <h2 className="text-3xl font-semibold mt-4">{selectedProject.title}</h2>
            <p className="text-white mt-2">{selectedProject.description}</p>
            
            {/* Flèches avec un cercle autour et positionnement ajusté pour éviter les chevauchements */}
            <div 
              className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer bg-white text-black p-3 rounded-full shadow-lg z-10"  // z-10 pour que les flèches soient au-dessus de l'image
              onClick={handlePrevImage}
            >
              <span className="text-4xl">‹</span>
            </div>
            <div 
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer bg-white text-black p-3 rounded-full shadow-lg z-10"  // z-10 pour que les flèches soient au-dessus de l'image
              onClick={handleNextImage}
            >
              <span className="text-4xl">›</span>
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
