import React, { useRef } from 'react';
import { Float, Html } from '@react-three/drei';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { skills } from '../../data/portfolio';

export const Ch2_CloudGrove = () => {
  const progress = useScrollProgress();
  const isVisible = progress > 0.25 && progress < 0.38;

  return (
    <group>
      {/* Cloud Islands */}
      {skills.map((skill, index) => (
        <CloudIsland
          key={index}
          skill={skill}
          index={index}
          isVisible={isVisible}
          progress={progress}
        />
      ))}
    </group>
  );
};

function CloudIsland({ skill, index, isVisible, progress }) {
  const position = index * 24 - 36;
  return (
    <group position={[position, 6 + index * 1.5, 8]}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        {/* Cloud puffs (visual) */}
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[3, 16, 16]} />
          <meshStandardMaterial
            color="#f0f8f0"
            emissive="#ffffff"
            emissiveIntensity={0.2}
            transparent={true}
            opacity={0.85}
          />
        </mesh>
        
        {/* Island base */}
        <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[3, 2, 1.2, 12]} />
          <meshStandardMaterial
            color="#2d5a27"
            roughness={0.85}
          />
        </mesh>
      </Float>

      {/* Skills info overlay wrapped in Html */}
      <Html>
        <div
          style={{
            position: 'fixed',
            left: `calc(10% + ${index * 22}%)`,
            top: `calc(22% + ${index * 12}px)`,
            color: '#ffffff',
            backgroundColor: 'rgba(13, 30, 13, 0.9)',
            padding: '18px',
            border: '1.5px solid #f5a623',
            borderRadius: '8px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            width: '210px',
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.6s ease ${index * 0.1}s`,
            pointerEvents: 'none',
            zIndex: 25,
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#f5a623' }}>
            {skill.icon} {skill.island}
          </h3>
          <div style={{ fontSize: '12px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px' }}>
            {skill.items.map((item, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: '#4a7c59',
                  color: '#f0f8f0',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
export default Ch2_CloudGrove;
