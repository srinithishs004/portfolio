import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ForestEnvironment } from './components/shared/ForestEnvironment';
import { ScrollCamera } from './components/shared/ScrollCamera';
import { FireflyParticles } from './components/shared/FireflyParticles';
import { FloatingLeaves } from './components/shared/FloatingLeaves';
import { ProgressBar } from './components/shared/ProgressBar';
import { Ch0_ForestAwakens } from './components/scenes/Ch0_ForestAwakens';
import { Ch1_ThePath } from './components/scenes/Ch1_ThePath';
import { Ch2_CloudGrove } from './components/scenes/Ch2_CloudGrove';
import { Ch3_CampfireStories } from './components/scenes/Ch3_CampfireStories';
import { Ch4_RiverProjects } from './components/scenes/Ch4_RiverProjects';
import { Ch5_SignalTower } from './components/scenes/Ch5_SignalTower';
import { Ch6_TheClearing } from './components/scenes/Ch6_TheClearing';
import { Ch7_NightFalls } from './components/scenes/Ch7_NightFalls';

export default function App() {
  return (
    <div className="w-full h-screen">
      {/* 3D Canvas */}
      <Canvas
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        camera={{ position: [0, 5, 20], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Environment */}
          <ForestEnvironment />
          
          {/* Particles & Effects */}
          <FireflyParticles count={120} />
          <FloatingLeaves count={25} />
          
          {/* Spline-controlled camera path */}
          <ScrollCamera />

          {/* Interactive Chapter Scenes */}
          <Ch0_ForestAwakens />
          <Ch1_ThePath />
          <Ch2_CloudGrove />
          <Ch3_CampfireStories />
          <Ch4_RiverProjects />
          <Ch5_SignalTower />
          <Ch6_TheClearing />
          <Ch7_NightFalls />
        </Suspense>
      </Canvas>

      {/* Floating linear progress indicator */}
      <ProgressBar />
    </div>
  );
}
