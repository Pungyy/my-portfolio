"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";

// Composant Moon pour la lune
function Moon() {
  const moonRef = useRef();
  const texture = useTexture("/textures/moon.jpg");

  // État pour gérer le décalage au scroll
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.0005; // Rotation légère
      moonRef.current.position.y = -scrollY * 0.01; // Déplacement en Y au scroll
      moonRef.current.position.x = Math.sin(scrollY * 0.002) * 5; // Légère oscillation
    }
  });

  return (
    <mesh ref={moonRef} scale={25} position={[0, 0, -50]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// Composant Stars pour créer un ciel étoilé
function Stars() {
  const pointsRef = useRef();

  // Génération des positions aléatoires des étoiles
  const starPositions = useRef(new Float32Array(3000 * 3).map(() => (Math.random() - 0.5) * 200));

  // Animation des étoiles
  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.00005; // Rotation subtile
      pointsRef.current.rotation.x += 0.00002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={starPositions.current}
          count={500}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.5} color="white" transparent opacity={0.8} />
    </points>
  );
}

// Scene de la Lune avec l'effet étoilé
export default function MoonScene() {
  return (
    <div className="fixed inset-0 -z-50">
      <Canvas camera={{ position: [0, 0, 20] }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        {/* Ajouter les étoiles à la scène */}
        <Stars />
        
        {/* Ajouter la lune à la scène */}
        <Moon />
      </Canvas>
    </div>
  );
}
