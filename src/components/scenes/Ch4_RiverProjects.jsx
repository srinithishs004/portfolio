import React, { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { projects } from '../../data/portfolio';

export const Ch4_RiverProjects = () => {
  const progress = useScrollProgress();
  const isVisible = progress > 0.51 && progress < 0.64;

  return (
    <group>
      {/* Project boats */}
      {projects.map((project, index) => (
        <ProjectBoat
          key={index}
          project={project}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </group>
  );
};

function ProjectBoat({ project, index, isVisible }) {
  const [hovered, setHovered] = useState(false);
  const position = index * 12 - 24;

  return (
    <group position={[position, 1.2, 12]}>
      {/* Boat shape */}
      <mesh 
        castShadow 
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.5, 0.6, 2.5]} />
        <meshStandardMaterial
          color="#8b7355"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Project card wrapped in Html */}
      <Html>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: 'fixed',
            left: `calc(10% + ${index * 16}%)`,
            top: '40%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(20, 30, 20, 0.95)',
            color: '#f5a623',
            padding: '16px',
            borderRadius: '10px',
            width: '240px',
            border: hovered ? '2px solid #f5a623' : '2px solid #4a7c59',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            cursor: 'pointer',
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.3s`,
            transform: `translateY(-50%) scale(${hovered ? 1.05 : 1})`,
            pointerEvents: 'auto',
            zIndex: hovered ? 45 : 24,
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#ffffff' }}>
            {project.image} {project.name}
          </h3>
          <p style={{ fontSize: '12px', lineHeight: '1.5', color: '#c2cfc2', marginBottom: '10px' }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {project.tech.slice(0, 3).map((t, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: '#4a7c59',
                  color: '#f0f8f0',
                  fontSize: '10px',
                  padding: '3px 8px',
                  borderRadius: '10px',
                  fontWeight: 600,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {project.github && (
              <a
                href={`https://${project.github}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#f5a623', textDecoration: 'none', fontSize: '11px', fontWeight: '700' }}
              >
                Code <i className="fa-brands fa-github"></i>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#4a7c59', textDecoration: 'none', fontSize: '11px', fontWeight: '700' }}
              >
                Live Demo <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
}
export default Ch4_RiverProjects;
