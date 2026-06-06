import React, { useRef } from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

export const Ch1_ThePath = () => {
  const groupRef = useRef();
  const progress = useScrollProgress();
  const isVisible = progress > 0.12 && progress < 0.25;
  
  const stones = [
    '🪨 Cloud Infrastructure Engineer based in India',
    '🪨 Building scalable systems on AWS',
    '🪨 Full-Stack Developer — from database to UI',
    '🪨 Connecting devices, clouds, and people through code',
  ];

  return (
    <group ref={groupRef}>
      {stones.map((stone, i) => (
        <StoneTablet
          key={i}
          text={stone}
          position={i * 15 - 22.5}
          isVisible={isVisible}
          index={i}
        />
      ))}
    </group>
  );
};

function StoneTablet({ text, position, isVisible, index }) {
  return (
    <group position={[position, 0, 15]}>
      {/* Stone base */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2.5, 0.4]} />
        <meshStandardMaterial
          color="#5a5a5a"
          roughness={0.8}
          metalness={0}
          emissive="#2a2a2a"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Text on stone wrapped in Html */}
      <Html>
        <div
          style={{
            position: 'fixed',
            left: `calc(15% + ${index * 20}%)`,
            top: '40%',
            transform: 'translateY(-50%)',
            color: '#2d5a27',
            fontSize: '15px',
            fontWeight: '700',
            fontFamily: '"DM Sans", sans-serif',
            backgroundColor: 'rgba(240, 248, 240, 0.9)',
            padding: '16px',
            borderRadius: '8px',
            width: '180px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.5s ease ${index * 0.1}s`,
            pointerEvents: 'none',
            zIndex: 25,
          }}
        >
          {text}
        </div>
      </Html>
    </group>
  );
}
export default Ch1_ThePath;
