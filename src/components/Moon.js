"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";

// Lune
function Moon() {
  const moonRef = useRef();
  const texture = useTexture("/textures/moon.jpg");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.0005;
      const scale = Math.max(1, 20 - scrollY * 0.009);
      moonRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={moonRef} scale={50} position={[0, 0, -50]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// Étoiles fixes
function Stars() {
  const pointsRef = useRef();
  const starPositions = useRef(new Float32Array(3000 * 3).map(() => (Math.random() - 0.5) * 200));

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0005;
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
      <pointsMaterial size={0.5} color="white" transparent opacity={0.9} />
    </points>
  );
}

// Planète lointaine
function FarPlanet() {
  const texture = useTexture("/textures/jupiter.jpg");
  const planetRef = useRef();

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <mesh ref={planetRef} position={[30, -10, -100]}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// Satellite en orbite
function Satellite() {
  const satRef = useRef();
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (satRef.current) {
      const radius = 20;
      satRef.current.position.x = Math.cos(timeRef.current) * radius;
      satRef.current.position.z = -50 + Math.sin(timeRef.current) * radius;
    }
  });

  return (
    <mesh ref={satRef} scale={0.5}>
      <boxGeometry args={[1, 0.5, 0.5]} />
      <meshStandardMaterial color="silver" />
    </mesh>
  );
}

// Étoile filante aléatoire
function ShootingStar() {
  const starRef = useRef();
  const [startTime] = useState(() => Math.random() * 10);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() - startTime;
    if (starRef.current && t > 0 && t < 2) {
      starRef.current.position.x = -50 + t * 50;
      starRef.current.position.y = 30 - t * 15;
    }
  });

  return (
    <mesh ref={starRef} position={[-100, 100, -80]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1.5} />
    </mesh>
  );
}

// Nébuleuse
function Nebula() {
  const texture = useTexture("/textures/nebula.png");
  return (
    <mesh position={[0, 0, -150]}>
      <planeGeometry args={[300, 200]} />
      <meshBasicMaterial map={texture} transparent opacity={0.3} />
    </mesh>
  );
}

// Scène principale
export default function MoonScene() {
  return (
    <div className="fixed inset-0 -z-50">
      <Canvas camera={{ position: [0, 0, 20] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Moon />
        <Stars />
        <FarPlanet />
        <Satellite />
        <ShootingStar />
        <Nebula />
      </Canvas>
    </div>
  );
}
