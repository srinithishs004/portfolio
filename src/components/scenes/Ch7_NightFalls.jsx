import React from 'react';
import { Html } from '@react-three/drei';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const Ch7_NightFalls = () => {
  const progress = useScrollProgress();
  const isVisible = progress > 0.90;

  return (
    <group>
      {/* Night sky background */}
      <mesh scale={500} position={[0, 0, -250]}>
        <planeGeometry args={[1000, 1000]} />
        <meshBasicMaterial color="#0a0d14" />
      </mesh>
      {/* Stars */}
      <Stars />
      {/* Closing message wrapped in Html */}
      <Html>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#f5a623',
            textAlign: 'center',
            fontSize: '32px',
            fontFamily: '"Playfair Display", serif',
            textShadow: '0 0 20px rgba(245, 166, 35, 0.6)',
            zIndex: 25,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s',
            pointerEvents: 'none',
            width: '80vw',
          }}
        >
          <h2>Thanks for walking through the forest with me.</h2>
          <p style={{ fontSize: '20px', marginTop: '20px', color: '#4a7c59', fontFamily: '"DM Sans", sans-serif', fontWeight: 700 }}>
            — Sri Nithish S
          </p>
        </div>
      </Html>
    </group>
  );
};

function Stars() {
  const stars = Array.from({ length: 200 }, (_, i) => ({
    x: (Math.random() - 0.5) * 400,
    y: (Math.random() - 0.5) * 400,
    z: (Math.random() - 0.5) * 200 - 100,
    size: 0.1 + Math.random() * 0.25,
  }));
  return (
    <group>
      {stars.map((star, i) => (
        <mesh key={i} position={[star.x, star.y, star.z]}>
          <sphereGeometry args={[star.size, 6, 6]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}
export default Ch7_NightFalls;
