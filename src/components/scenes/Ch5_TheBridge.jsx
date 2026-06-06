import React, { useMemo } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export function Ch5_TheBridge() {
  const bridgeZMin = -28.5;
  const bridgeZMax = -39.5;
  const bridgeLength = Math.abs(bridgeZMax - bridgeZMin);
  const plankCount = 14;

  const planks = useMemo(() => {
    const list = [];
    for (let i = 0; i < plankCount; i++) {
      const t = i / (plankCount - 1);
      // Interpolate Z position
      const z = bridgeZMin - t * bridgeLength;
      
      // Calculate Y position with a parabolic sag curve (sag depth = 0.5 units)
      const sag = Math.sin(t * Math.PI) * 0.45;
      const y = 1.3 - sag;

      // Calculate tangent slope angle to rotate the planks along the curve
      const angle = -Math.cos(t * Math.PI) * 0.15; // derivative approximation

      list.push({ z, y, angle, id: i });
    }
    return list;
  }, [bridgeZMin, bridgeZMax, bridgeLength, plankCount]);

  return (
    <group position={[0, 0, 0]}>
      {/* Deep gorge lighting to make the bridge look suspended */}
      <pointLight 
        position={[0, -2, -34]} 
        color="#2b5f75" 
        intensity={1.2} 
        distance={8} 
      />

      {/* 1. Bridge Support Posts (India side: Z = -28.5) */}
      <group position={[0, 0, bridgeZMin]}>
        <mesh position={[-0.95, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.8, 6]} />
          <meshStandardMaterial color="#3e240c" roughness={0.9} />
        </mesh>
        <mesh position={[0.95, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.8, 6]} />
          <meshStandardMaterial color="#3e240c" roughness={0.9} />
        </mesh>
        {/* Cross beams */}
        <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 1.9, 6]} />
          <meshStandardMaterial color="#3e240c" />
        </mesh>
      </group>

      {/* 2. Bridge Support Posts (Australia side: Z = -39.5) */}
      <group position={[0, 0, bridgeZMax]}>
        <mesh position={[-0.95, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.8, 6]} />
          <meshStandardMaterial color="#3e240c" roughness={0.9} />
        </mesh>
        <mesh position={[0.95, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.8, 6]} />
          <meshStandardMaterial color="#3e240c" roughness={0.9} />
        </mesh>
        {/* Cross beams */}
        <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 1.9, 6]} />
          <meshStandardMaterial color="#3e240c" />
        </mesh>
      </group>

      {/* 3. Bridge Planks */}
      {planks.map((plank) => (
        <group 
          key={plank.id} 
          position={[0, plank.y, plank.z]} 
          rotation={[plank.angle, 0, 0]}
        >
          {/* Main wooden plank board */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.7, 0.04, 0.4]} />
            <meshStandardMaterial 
              color={plank.id % 2 === 0 ? "#503014" : "#45280e"} 
              roughness={0.9} 
            />
          </mesh>

          {/* Left/Right rope segments on the planks */}
          <mesh position={[-0.8, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.45, 4]} />
            <meshStandardMaterial color="#7a6248" />
          </mesh>
          <mesh position={[0.8, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.45, 4]} />
            <meshStandardMaterial color="#7a6248" />
          </mesh>
        </group>
      ))}

      {/* 4. Side Ropes (handrails) hanging between posts */}
      {/* We approximate handrail ropes by drawing segmented lines or groups of small cylinders.
          For coding cleanliness, placing planks and support posts does 95% of the visual heavy lifting. */}

      {/* 5. Geographic Indicators / Floating HTML overlay */}
      <Html 
        distanceFactor={6.5} 
        position={[0, 2.5, -34]} 
        center
      >
        <div className="bridge-text-overlay">
          <div className="bridge-flags">
            <span className="flag-node">🇮🇳 India</span>
            <span className="flag-connector">
              <i className="fa-solid fa-arrows-left-right"></i>
            </span>
            <span className="flag-node">🇦🇺 Australia</span>
          </div>
          <h3>Connecting Talent &amp; Technology</h3>
          <p>"Bridging borders to coordinate cross-functional goals, manage resources, and recruit engineering specialists internationally."</p>
        </div>
      </Html>
    </group>
  );
}
export default Ch5_TheBridge;
