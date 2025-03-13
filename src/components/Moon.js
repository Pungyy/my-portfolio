"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";

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

export default function MoonScene() {
  return (
    <div className="fixed inset-0 -z-50">
      <Canvas camera={{ position: [0, 0, 20] }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Moon />
      </Canvas>
    </div>
  );
}
