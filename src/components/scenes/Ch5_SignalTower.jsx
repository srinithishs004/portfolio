import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const Ch5_SignalTower = () => {
  const groupRef = useRef();
  const progress = useScrollProgress();
  const isVisible = progress > 0.64 && progress < 0.77;

  return (
    <group ref={groupRef} position={[0, 0, 10]}>
      {/* Title Overlay wrapped in Html */}
      <Html>
        <div
          style={{
            position: 'fixed',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#00e5ff',
            fontSize: '36px',
            fontWeight: 700,
            fontFamily: '"Playfair Display", serif',
            textShadow: '0 0 20px rgba(0, 229, 255, 0.8)',
            zIndex: 25,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s',
            pointerEvents: 'none',
            width: '80vw',
            textAlign: 'center',
          }}
        >
          ⚡ The Signal Tower
        </div>
      </Html>

      {/* Tower structure in 3D */}
      <SignalTower isVisible={isVisible} />

      {/* Description Overlay wrapped in Html */}
      <Html>
        <div
          style={{
            position: 'fixed',
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#00e5ff',
            fontSize: '18px',
            fontFamily: '"DM Sans", sans-serif',
            textAlign: 'center',
            maxWidth: '600px',
            textShadow: '0 0 10px rgba(0, 229, 255, 0.6)',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s',
            pointerEvents: 'none',
            backgroundColor: 'rgba(5, 10, 15, 0.9)',
            padding: '16px 24px',
            borderRadius: '8px',
            border: '1px solid #00e5ff',
            zIndex: 25,
            width: '85vw',
          }}
        >
          Connecting Edge Devices to the Cloud
          <br />
          <span style={{ fontSize: '13px', color: '#8cd7e2', marginTop: '10px', display: 'block', lineHeight: 1.6 }}>
            Architecting real-time communication systems using MQTT &amp; CoAP protocols. Bridging hardware telemetry pipelines with serverless AWS databases.
          </span>
        </div>
      </Html>
    </group>
  );
};

function SignalTower({ isVisible }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Tower base */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.9, 10, 12]} />
        <meshStandardMaterial
          color="#444444"
          roughness={0.6}
          metalness={0.2}
          emissive="#111111"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Glowing signal rings */}
      {[0, 1, 2, 3, 4].map((i) => (
        <SignalRing key={i} index={i} />
      ))}
      
      {/* Top glow */}
      <mesh position={[0, 7.2, 0]} castShadow>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00ffff"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

function SignalRing({ index }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      // Animate rings rising up the tower
      meshRef.current.position.y = -3 + ((time * 1.5 + index * 1.8) % 10);
      meshRef.current.material.opacity = 1.0 - (meshRef.current.position.y / 7);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[1.5, 0.05, 8, 24]} />
      <meshBasicMaterial
        color="#00e5ff"
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
}
export default Ch5_SignalTower;
