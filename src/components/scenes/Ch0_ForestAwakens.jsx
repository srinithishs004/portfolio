import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const Ch0_ForestAwakens = () => {
  const groupRef = useRef();
  const progress = useScrollProgress();
  
  // Show only when in this chapter (0-12% scroll)
  const isVisible = progress < 0.12;

  useFrame(() => {
    if (!groupRef.current) return;
    // Fade in/out based on chapter visibility
    const opacity = isVisible ? 1 : 0;
    groupRef.current.children.forEach((child) => {
      if (child.material) {
        child.material.opacity = opacity;
        child.material.transparent = true;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Hero firefly (glowing orb) */}
      <mesh position={[0, 5, -10]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#fffacd"
          emissive="#ffff00"
          emissiveIntensity={1}
          transparent={true}
        />
      </mesh>
      {/* Text overlay wrapped in Html */}
      <Html>
        <HeroText isVisible={isVisible} />
      </Html>
    </group>
  );
};

function HeroText({ isVisible }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: '#f5a623',
        fontSize: '48px',
        fontWeight: '700',
        fontFamily: '"Playfair Display", serif',
        textShadow: '0 4px 20px rgba(0,0,0,0.9)',
        zIndex: 30,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
        width: '80vw',
      }}
    >
      <h1>Hi, I'm Sri Nithish S</h1>
      <p style={{ fontSize: '24px', marginTop: '20px', color: '#4a7c59', fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>
        Cloud Infrastructure Engineer · Full-Stack Developer
      </p>
      <p style={{ fontSize: '18px', marginTop: '40px', opacity: 0.8, color: '#f5a623', fontFamily: '"DM Sans", sans-serif' }}>
        Scroll to begin the journey ↓
      </p>
    </div>
  );
}
export default Ch0_ForestAwakens;
