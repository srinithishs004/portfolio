import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { experience } from '../../data/portfolio';

export const Ch3_CampfireStories = () => {
  const groupRef = useRef();
  const progress = useScrollProgress();
  const isVisible = progress > 0.38 && progress < 0.51;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 20]}>
      {/* Campfire */}
      <Campfire isVisible={isVisible} />
      
      {/* Orbiting experience scrolls */}
      {experience.map((job, index) => (
        <ExperienceScroll
          key={index}
          job={job}
          index={index}
          total={experience.length}
          isVisible={isVisible}
        />
      ))}
    </group>
  );
};

function Campfire({ isVisible }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Flickering effect
      meshRef.current.material.emissiveIntensity = 0.7 + Math.sin(clock.getElapsedTime() * 4) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
      <cylinderGeometry args={[1, 1.3, 0.4, 12]} />
      <meshStandardMaterial
        color="#ff6600"
        emissive="#ff3300"
        emissiveIntensity={0.7}
      />
    </mesh>
  );
}

function ExperienceScroll({ job, index, total, isVisible }) {
  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * 8;
  const z = Math.sin(angle) * 8;

  return (
    <group position={[x, 2, z]}>
      {/* Scroll visuals */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 2.2, 0.08]} />
        <meshStandardMaterial
          color="#f5deb3"
          emissive="#d4a574"
          emissiveIntensity={0.2}
          roughness={0.8}
        />
      </mesh>
      
      {/* Experience text overlay wrapped in Html */}
      <Html>
        <div
          style={{
            position: 'fixed',
            left: `calc(10% + ${index * 26}%)`,
            top: '35%',
            backgroundColor: 'rgba(20, 30, 20, 0.95)',
            color: '#f5a623',
            padding: '16px',
            borderRadius: '8px',
            width: '240px',
            border: '2px solid #4a7c59',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.5s ease ${index * 0.15}s`,
            pointerEvents: 'none',
            zIndex: 25,
          }}
        >
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff' }}>{job.company}</h4>
          <p style={{ fontSize: '13px', color: '#4a7c59', marginTop: '4px', fontWeight: 600 }}>{job.role}</p>
          <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '3px', color: '#c2cfc2' }}>{job.period}</p>
          <div style={{ marginTop: '8px', fontSize: '11px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {job.tech.map((t, i) => (
              <span key={i} style={{ backgroundColor: '#4a7c59', color: '#f0f8f0', padding: '2px 6px', borderRadius: '4px' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
export default Ch3_CampfireStories;
