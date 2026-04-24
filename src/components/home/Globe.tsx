'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Ultra-realistic textures (Satellite Blue/Natural colors)
const EARTH_TEXTURE_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg';
const NIGHT_TEXTURE_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png';
const CLOUD_TEXTURE_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png';
const SPEC_TEXTURE_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg';

function Earth() {
  const globeRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  
  // Load textures
  const [colorMap, nightMap, cloudMap, specularMap] = useLoader(THREE.TextureLoader, [
    EARTH_TEXTURE_URL,
    NIGHT_TEXTURE_URL,
    CLOUD_TEXTURE_URL,
    SPEC_TEXTURE_URL
  ]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.1;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y = time * 0.12;
      cloudRef.current.rotation.z = Math.sin(time * 0.05) * 0.05;
    }
  });

  return (
    <group>
      {/* Main Earth Sphere with Realistic Materials */}
      <Sphere ref={globeRef} args={[2.2, 64, 64]}>
        <meshPhongMaterial 
          map={colorMap}
          specularMap={specularMap}
          specular={new THREE.Color('grey')}
          shininess={5}
          emissiveMap={nightMap}
          emissive={new THREE.Color(0xffff88)}
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Realistic Cloud Layer */}
      <Sphere ref={cloudRef} args={[2.23, 64, 64]}>
        <meshStandardMaterial 
          map={cloudMap}
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </Sphere>

      {/* Atmospheric Fresnel Effect Layer (Blue Glow) */}
      <Sphere args={[2.5, 64, 64]}>
        <meshPhongMaterial
          color="#88ccff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Outer Halo */}
      <Sphere args={[2.6, 64, 64]}>
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}

export default function Globe() {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        {/* Sun light simulating space lighting */}
        <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#4488ff" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Suspense fallback={null}>
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
            <Earth />
          </Float>
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.5}
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
}
