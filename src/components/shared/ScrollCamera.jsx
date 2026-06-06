import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useScrollProgress, getChapterName } from '../../hooks/useScrollProgress';

export const ScrollCamera = () => {
  const { camera } = useThree();
  const progress = useScrollProgress();
  const curveRef = useRef(null);

  // Create scroll path waypoints
  useEffect(() => {
    const waypoints = [
      // Chapter 0: Forest Awakens (Hero)
      new THREE.Vector3(0, 8, 25),
      // Chapter 1: The Path (About)
      new THREE.Vector3(0, 3, 15),
      // Chapter 2: Cloud Grove (Skills - elevated)
      new THREE.Vector3(0, 12, 8),
      // Chapter 3: Campfire (Experience)
      new THREE.Vector3(20, 5, 20),
      // Chapter 4: River (Projects)
      new THREE.Vector3(-15, 4, 12),
      // Chapter 5: Signal Tower (MQTT)
      new THREE.Vector3(0, 10, 0),
      // Chapter 6: The Clearing (Contact)
      new THREE.Vector3(-20, 6, 25),
      // Chapter 7: Night Falls (Outro)
      new THREE.Vector3(0, 15, 30),
    ];
    curveRef.current = new THREE.CatmullRomCurve3(waypoints);
  }, []);

  useFrame(() => {
    if (!curveRef.current) return;
    // Get position and lookAt points from curve
    const point = curveRef.current.getPoint(Math.min(Math.max(progress, 0), 1));
    const lookPoint = curveRef.current.getPoint(Math.min(progress + 0.05, 1));
    // Smoothly move camera
    camera.position.lerp(point, 0.08);
    camera.lookAt(lookPoint);
  });

  return (
    <group>
      {/* Chapter title overlay wrapped in Html to prevent R3F namespace warnings */}
      <Html>
        <ChapterOverlay progress={progress} />
      </Html>
    </group>
  );
};

// HTML overlay showing chapter name
function ChapterOverlay({ progress }) {
  const chapterName = getChapterName(progress);
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#f5a623',
        fontSize: '18px',
        fontWeight: '600',
        fontFamily: '"Playfair Display", serif',
        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
        zIndex: 40,
        opacity: 0.9,
        pointerEvents: 'none',
        width: '80vw',
        textAlign: 'center',
      }}
    >
      {chapterName}
    </div>
  );
}
export default ScrollCamera;
