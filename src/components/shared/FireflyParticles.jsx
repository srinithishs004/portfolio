import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FireflyParticles = ({ count = 150 }) => {
  const meshRef = useRef();
  const positionsRef = useRef([]);
  
  // Generate random firefly positions
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push({
        x: (Math.random() - 0.5) * 80,
        y: 2 + Math.random() * 20,
        z: (Math.random() - 0.5) * 80,
        speedY: 0.01 + Math.random() * 0.02,
        speedX: (Math.random() - 0.5) * 0.01,
      });
    }
    positionsRef.current = pos;
    return pos;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pArray = new Float32Array(count * 3);
    positions.forEach((pos, i) => {
      pArray[i * 3] = pos.x;
      pArray[i * 3 + 1] = pos.y;
      pArray[i * 3 + 2] = pos.z;
    });
    geo.setAttribute('position', new THREE.BufferAttribute(pArray, 3));
    return geo;
  }, [positions, count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const positionsArr = meshRef.current.geometry.attributes.position.array;
    const time = clock.getElapsedTime();
    positionsRef.current.forEach((pos, i) => {
      // Floating animation
      positionsArr[i * 3] += pos.speedX;
      positionsArr[i * 3 + 1] += Math.sin(time * 0.5 + i * 0.7) * 0.01;
      positionsArr[i * 3 + 2] += Math.cos(time * 0.3 + i) * 0.005;
      
      // Wrap around
      if (positionsArr[i * 3 + 1] > 30) positionsArr[i * 3 + 1] = 2;
      if (positionsArr[i * 3] > 50) positionsArr[i * 3] = -50;
      if (positionsArr[i * 3] < -50) positionsArr[i * 3] = 50;
    });
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.15}
        color="#fffacd"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
};
export default FireflyParticles;
