"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const projects = [
  { 
    id: 1, 
    title: "Mercadie Project", 
    description: "Languages : HTML, CSS, JavaScript, jQuery, PHP", 
    images: ["/mercadie/mercadie1.png", "/mercadie/mercadie2.png", "/mercadie/mercadie3.png"]
  },
  { 
    id: 2, 
    title: "English Game", 
    description: "For our English Game competition, we ranked first in Lyon among 26 groups and made it to the national top 6. Our project consisted of creating an educational board game that combined both a physical and a digital component. We also had to showcase our game in a trailer.", 
    images: ["/hakked/hakked.mp4"]
  },
  { 
    id: 3, 
    title: "Stars Project", 
    description: "As part of a group project in class, we worked on designing a 'Pole des Étoiles' in Lyon. We created various elements, including a store, a contact page, and articles, to bring the concept to life.", 
    images: ["/etoile/etoile1.png", "/etoile/etoile2.png", "/etoile/etoile3.png", "/etoile/etoile4.png", "/etoile/etoile5.png", "/etoile/etoile6.png", "/etoile/etoile7.png"]
  },
  { 
    id: 4, 
    title: "C# Project", 
    description: "Description of project 4.", 
    images: ["/c/c1.PNG", "/c/c2.png", "/c/c3.png", "/c/c4.png", "/c/c5.png", "/c/c6.png"]
  },
  { 
    id: 5, 
    title: "Project 5", 
    description: "Description of project 5.", 
    images: ["/pizza/pizza2.png", "/pizza/pizza3.png", "/pizza/pizza4.png", "/pizza/pizza5.png"]
  },
  { 
    id: 6, 
    title: "Project 6", 
    description: "Description of project 5.", 
    images: ["/arthur/traiteur.png"]
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const imageRef = useRef(null);

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [currentImageIndex]);

  return (
    <div className="mt-20 sm:mt-8 min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-8">MY PROJECTS</h1>
      
      {/* Grille de projets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer rounded-lg shadow-lg hover:scale-105 transition-transform"
            onClick={() => handleProjectClick(project)}
          >
            {/* Affichage de la première image ou vidéo en miniature */}
            {project.images[0].endsWith('.mp4') ? (
              <video 
                className="w-full h-[200px] object-cover rounded-lg"
                muted
                loop
                autoPlay
              >
                <source src={project.images[0]} type="video/mp4" />
              </video>
            ) : (
              <Image 
                src={project.images[0]} 
                alt={project.title} 
                width={500} 
                height={300} 
                className="w-full h-[200px] object-cover rounded-lg"
                priority
              />
            )}
          </div>
        ))}
      </div>

      {selectedProject && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/80"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-black p-14 rounded-lg shadow-lg text-center relative w-full max-w-5xl h-auto max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div ref={imageRef} className="relative">
              {/* Vérification si l'élément est une vidéo ou une image */}
              {selectedProject.images[currentImageIndex].endsWith('.mp4') ? (
                <video 
                  className="w-full h-[350px] object-cover mx-auto"
                  controls
                  autoPlay
                >
                  <source src={selectedProject.images[currentImageIndex]} type="video/mp4" />
                </video>
              ) : (
                <Image 
                  src={selectedProject.images[currentImageIndex]} 
                  alt={selectedProject.title} 
                  width={800} 
                  height={500} 
                  className="w-full h-[350px] object-cover mx-auto"
                  priority 
                />
              )}
            </div>
            
            <h2 className="text-3xl font-semibold mt-4">{selectedProject.title}</h2>
            <p className="text-white mt-2">{selectedProject.description}</p>
            
            {/* Boutons pour naviguer entre les médias */}
            {selectedProject.images.length > 1 && (
              <>
                <div 
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer bg-white text-black p-1.5 rounded-full shadow-lg z-10"
                  onClick={handlePrevImage}
                >
                  <span className="text-4xl">‹</span>
                </div>
                <div 
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer bg-white text-black p-1.5 rounded-full shadow-lg z-10"
                  onClick={handleNextImage}
                >
                  <span className="text-4xl">›</span>
                </div>
              </>
            )}

            <button
              className="mt-6 px-6 py-3 bg-red-600 rounded-lg"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
