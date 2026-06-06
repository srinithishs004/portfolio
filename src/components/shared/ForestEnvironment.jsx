import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

export const ForestEnvironment = () => {
  // Generate random tree positions
  const treePositions = useMemo(() => {
    const positions = [];
    const count = 45;
    for (let i = 0; i < count; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 120,
        y: 0,
        z: (Math.random() - 0.5) * 120,
        scale: 0.8 + Math.random() * 0.6,
        rotation: Math.random() * Math.PI * 2,
      });
    }
    return positions;
  }, []);

  return (
    <>
      {/* ========== LIGHTING ========== */}
      {/* Hemisphere Light: Sky and ground ambient */}
      <hemisphereLight 
        skyColor="#87ceeb" 
        groundColor="#3d2b1f" 
        intensity={0.65} 
      />
      {/* Directional Light: Golden hour sun */}
      <directionalLight
        position={[15, 20, 10]}
        intensity={1.4}
        color="#ffd4a3"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-camera-far={200}
      />
      {/* Ambient light for fill */}
      <ambientLight intensity={0.3} color="#ffffff" />

      {/* ========== ATMOSPHERE ========== */}
      {/* Fog for depth and mystery */}
      <fog attach="fog" args={['#1a3a1a', 20, 200]} />

      {/* ========== GROUND ========== */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial
          color="#2d5a27"
          roughness={1}
          metalness={0}
          emissive="#1a3a1a"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* ========== TREES (Instanced) ========== */}
      {treePositions.map((tree, idx) => (
        <group key={idx} position={[tree.x, tree.y, tree.z]} scale={tree.scale}>
          {/* Tree trunk */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.7, 12, 8]} />
            <meshStandardMaterial
              color="#3a2f1f"
              roughness={0.9}
              metalness={0}
            />
          </mesh>
          {/* Tree foliage (main cone) */}
          <mesh position={[0, 6, 0]} castShadow receiveShadow>
            <coneGeometry args={[6, 10, 8]} />
            <meshStandardMaterial
              color="#1a4d1a"
              roughness={0.8}
              metalness={0.05}
              emissive="#0d2d0d"
              emissiveIntensity={0.08}
            />
          </mesh>
          {/* Tree foliage (second cone) */}
          <mesh position={[0, 10, 0]} castShadow receiveShadow>
            <coneGeometry args={[4.5, 7, 8]} />
            <meshStandardMaterial
              color="#2d5a27"
              roughness={0.85}
              metalness={0}
              emissive="#1a3a1a"
              emissiveIntensity={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* ========== SKY DOME ========== */}
      <mesh scale={500}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ffd4a3"
          side={THREE.BackSide}
          fog={false}
        />
      </mesh>

      {/* ========== MOSS ROCKS (scattered detail) ========== */}
      {[...Array(12)].map((_, i) => (
        <mesh
          key={`rock-${i}`}
          position={[
            Math.cos((i * Math.PI) / 6) * 50 + (Math.random() - 0.5) * 20,
            0.5,
            Math.sin((i * Math.PI) / 6) * 50 + (Math.random() - 0.5) * 20,
          ]}
          castShadow
          receiveShadow
          scale={[0.8 + Math.random() * 0.4, 0.6 + Math.random() * 0.3, 0.8 + Math.random() * 0.4]}
        >
          <sphereGeometry args={[1, 4, 4]} />
          <meshStandardMaterial
            color="#2d5a27"
            roughness={1}
            metalness={0}
            emissive="#1a3a1a"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </>
  );
};
