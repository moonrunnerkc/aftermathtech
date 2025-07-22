// components/Timeline3D.tsx
'use client'

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Timeline3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create timeline visualization
    const timelineGroup = new THREE.Group();

    // Timeline events data
    const events = [
      { year: 2020, title: 'AI Foundation', position: -4 },
      { year: 2021, title: 'Edge Computing', position: -2 },
      { year: 2022, title: 'Offline AI', position: 0 },
      { year: 2023, title: 'Production Scale', position: 2 },
      { year: 2024, title: 'Global Expansion', position: 4 }
    ];

    // Create timeline base line
    const lineGeometry = new THREE.CylinderGeometry(0.02, 0.02, 10, 8);
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const timelineLine = new THREE.Mesh(lineGeometry, lineMaterial);
    timelineLine.rotation.z = Math.PI / 2;
    timelineGroup.add(timelineLine);

    // Create event markers
    events.forEach((event, index) => {
      // Event sphere
      const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(index / events.length, 0.8, 0.6)
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(event.position, 0, 0);
      
      // Add pulsing animation data
      (sphere as any).userData = { 
        originalScale: sphere.scale.clone(),
        phase: index * Math.PI / 3
      };
      
      timelineGroup.add(sphere);

      // Event connector line
      const connectorGeometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 8);
      const connectorMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x666666,
        transparent: true,
        opacity: 0.7
      });
      const connector = new THREE.Mesh(connectorGeometry, connectorMaterial);
      connector.position.set(event.position, 0.5, 0);
      timelineGroup.add(connector);

      // Event label (simplified as a small cube for now)
      const labelGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
      const labelMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
      });
      const label = new THREE.Mesh(labelGeometry, labelMaterial);
      label.position.set(event.position, 1, 0);
      timelineGroup.add(label);
    });

    // Add floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    scene.add(timelineGroup);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Rotate timeline group slowly
      timelineGroup.rotation.y = time * 0.1;

      // Animate event spheres with pulsing effect
      timelineGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
          const userData = (child as any).userData;
          if (userData && userData.originalScale) {
            const pulse = 1 + Math.sin(time * 2 + userData.phase) * 0.2;
            child.scale.copy(userData.originalScale).multiplyScalar(pulse);
          }
        }
      });

      // Animate particles
      const particlePositions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3 + 1] += Math.sin(time + i) * 0.001;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Rotate particles
      particles.rotation.y = time * 0.05;

      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.render(scene, cameraRef.current);
      }
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      // Cleanup geometries and materials
      timelineGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });

      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-80 rounded-lg overflow-hidden bg-slate-900/50 border border-cyan-500/30"
      style={{ minHeight: '320px' }}
    />
  );
};

export default Timeline3D;