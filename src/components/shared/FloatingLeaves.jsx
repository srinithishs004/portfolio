import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingLeaves = ({ count = 30 }) => {
  const meshRef = useRef();
  const leavesRef = useRef([]);
  
  const leaves = useMemo(() => {
    const leafArray = [];
    for (let i = 0; i < count; i++) {
      leafArray.push({
        x: (Math.random() - 0.5) * 120,
        y: Math.random() * 40,
        z: (Math.random() - 0.5) * 120,
        rotation: Math.random() * Math.PI * 2,
        fallSpeed: 0.05 + Math.random() * 0.1, // Adjusted speeds to be more visible and smooth
        swaySpeed: 0.5 + Math.random() * 1.5,
      });
    }
    leavesRef.current = leafArray;
    return leafArray;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    
    // In React Three Fiber, if we are animating a group's children directly,
    // we iterate through the children array and update their positions.
    if (meshRef.current.children) {
      leavesRef.current.forEach((leaf, i) => {
        const child = meshRef.current.children[i];
        if (!child) return;
        
        // Gentle falling
        child.position.y -= leaf.fallSpeed * 0.1;
        
        // Swaying side to side
        child.position.x += Math.sin(time * leaf.swaySpeed + i) * 0.01;
        
        // Rotation
        child.rotation.z += 0.01;
        child.rotation.y += 0.005;

        // Reset when falling off screen
        if (child.position.y < -5) {
          child.position.y = 40;
          child.position.x = (Math.random() - 0.5) * 120;
        }
      });
    }
  });

  return (
    <group ref={meshRef}>
      {leaves.map((leaf, i) => (
        <mesh key={i} position={[leaf.x, leaf.y, leaf.z]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshStandardMaterial
            color="#4a7c59"
            emissive="#2d5a27"
            emissiveIntensity={0.3}
            opacity={0.7}
            transparent={true}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};
export default FloatingLeaves;
