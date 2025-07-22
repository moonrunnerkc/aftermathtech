// components/AgentVisualizer.tsx - ADVANCED TESSERACT WITH DEEP MATHEMATICAL LOGIC
'use client'

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface TesseractNode {
  position4D: [number, number, number, number];
  position3D: THREE.Vector3;
  connections: number[];
  energy: number;
  phase: number;
  frequency: number;
}

interface QuantumField {
  position: THREE.Vector3;
  frequency: number;
  amplitude: number;
  phase: number;
  dimensions: number[];
}

const AgentVisualizer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number | null>(null);

  // Advanced mathematical functions for 4D->3D projection
  const project4DTo3D = (
    x4d: number, y4d: number, z4d: number, w4d: number, 
    viewDistance: number = 3.0, 
    rotation4D: { xy: number, xz: number, xw: number, yz: number, yw: number, zw: number }
  ): THREE.Vector3 => {
    // Apply 4D rotations in all 6 planes
    let x = x4d, y = y4d, z = z4d, w = w4d;
    
    // XY plane rotation
    const cosXY = Math.cos(rotation4D.xy), sinXY = Math.sin(rotation4D.xy);
    [x, y] = [x * cosXY - y * sinXY, x * sinXY + y * cosXY];
    
    // XZ plane rotation  
    const cosXZ = Math.cos(rotation4D.xz), sinXZ = Math.sin(rotation4D.xz);
    [x, z] = [x * cosXZ - z * sinXZ, x * sinXZ + z * cosXZ];
    
    // XW plane rotation (4D specific)
    const cosXW = Math.cos(rotation4D.xw), sinXW = Math.sin(rotation4D.xw);
    [x, w] = [x * cosXW - w * sinXW, x * sinXW + w * cosXW];
    
    // YZ plane rotation
    const cosYZ = Math.cos(rotation4D.yz), sinYZ = Math.sin(rotation4D.yz);
    [y, z] = [y * cosYZ - z * sinYZ, y * sinYZ + z * cosYZ];
    
    // YW plane rotation (4D specific)
    const cosYW = Math.cos(rotation4D.yw), sinYW = Math.sin(rotation4D.yw);
    [y, w] = [y * cosYW - w * sinYW, y * sinYW + w * cosYW];
    
    // ZW plane rotation (4D specific)
    const cosZW = Math.cos(rotation4D.zw), sinZW = Math.sin(rotation4D.zw);
    [z, w] = [z * cosZW - w * sinZW, z * sinZW + w * cosZW];
    
    // Project to 3D using perspective division
    const perspective = viewDistance / (viewDistance + w);
    
    return new THREE.Vector3(x * perspective, y * perspective, z * perspective);
  };

  // Generate tesseract vertices in 4D space
  const generateTesseractVertices = (): TesseractNode[] => {
    const vertices: TesseractNode[] = [];
    
    // Generate all 16 vertices of a tesseract (2^4 = 16 vertices)
    for (let i = 0; i < 16; i++) {
      const x = (i & 1) ? 1 : -1;         // Bit 0
      const y = (i & 2) ? 1 : -1;         // Bit 1  
      const z = (i & 4) ? 1 : -1;         // Bit 2
      const w = (i & 8) ? 1 : -1;         // Bit 3
      
      vertices.push({
        position4D: [x, y, z, w],
        position3D: new THREE.Vector3(),
        connections: [],
        energy: Math.random() * 0.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
        frequency: 0.5 + Math.random() * 2.0 // Random frequency for energy pulsing
      });
    }
    
    // Calculate connections (vertices that differ by exactly 1 coordinate)
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let differences = 0;
        for (let k = 0; k < 4; k++) {
          if (vertices[i].position4D[k] !== vertices[j].position4D[k]) {
            differences++;
          }
        }
        if (differences === 1) {
          vertices[i].connections.push(j);
          vertices[j].connections.push(i);
        }
      }
    }
    
    return vertices;
  };

  // Generate quantum field points around tesseract
  const generateQuantumField = (count: number): QuantumField[] => {
    const fields: QuantumField[] = [];
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * Math.random()); // Uniform sphere distribution
      const theta = Math.random() * 2 * Math.PI;
      const radius = 2 + Math.random() * 3;
      
      fields.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        frequency: 0.1 + Math.random() * 0.5,
        amplitude: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        dimensions: [Math.random(), Math.random(), Math.random(), Math.random()]
      });
    }
    
    return fields;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene with advanced settings
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.01);
    sceneRef.current = scene;

    // Initialize camera with cinematic settings
    const camera = new THREE.PerspectiveCamera(
      60, // Slightly narrower FOV for more dramatic effect
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // Initialize renderer with advanced settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // === TESSERACT CORE SYSTEM ===
    
    const tesseractGroup = new THREE.Group();
    const vertices = generateTesseractVertices();
    const quantumFields = generateQuantumField(50);
    
    // Vertex visualization (hypersphere nodes)
    const vertexGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const vertexMeshes: THREE.Mesh[] = [];
    
    vertices.forEach((vertex, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(
          (index / 16) * 0.8 + 0.1, // Cycle through spectrum
          0.8,
          0.6
        ),
        transparent: true,
        opacity: 0.9
      });
      
      const mesh = new THREE.Mesh(vertexGeometry, material);
      tesseractGroup.add(mesh);
      vertexMeshes.push(mesh);
    });

    // Edge visualization (hypercube connections)
    const edgeGeometry = new THREE.BufferGeometry();
    const edgePositions: number[] = [];
    const edgeColors: number[] = [];
    
    vertices.forEach((vertex, i) => {
      vertex.connections.forEach(j => {
        if (i < j) { // Avoid duplicate edges
          edgePositions.push(...vertex.position3D.toArray(), ...vertices[j].position3D.toArray());
          
          // Color based on dimensional alignment
          const colorIntensity = 0.3 + Math.abs(vertex.position4D[3] - vertices[j].position4D[3]) * 0.7;
          edgeColors.push(0, colorIntensity, 1, 0, colorIntensity, 1);
        }
      });
    });
    
    edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
    edgeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(edgeColors, 3));
    
    const edgeMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      linewidth: 2
    });
    
    const edgeMesh = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    tesseractGroup.add(edgeMesh);

    // === QUANTUM FIELD VISUALIZATION ===
    
    const fieldGroup = new THREE.Group();
    const fieldGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const fieldMeshes: THREE.Mesh[] = [];
    
    quantumFields.forEach((field, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(
          0.5 + field.frequency * 0.5,
          0.7,
          0.4 + field.amplitude
        ),
        transparent: true,
        opacity: 0.4
      });
      
      const mesh = new THREE.Mesh(fieldGeometry, material);
      mesh.position.copy(field.position);
      fieldGroup.add(mesh);
      fieldMeshes.push(mesh);
    });

    // === DIMENSIONAL ENERGY STREAMS ===
    
    const streamGroup = new THREE.Group();
    const streamCount = 12;
    const streamMeshes: THREE.Mesh[] = [];
    
    for (let i = 0; i < streamCount; i++) {
      const geometry = new THREE.CylinderGeometry(0.01, 0.01, 6, 6);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.6, 0.8, 0.5),
        transparent: true,
        opacity: 0.3
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      const angle = (i / streamCount) * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * 3, 0, Math.sin(angle) * 3);
      mesh.rotation.z = angle;
      streamGroup.add(mesh);
      streamMeshes.push(mesh);
    }

    scene.add(tesseractGroup);
    scene.add(fieldGroup);
    scene.add(streamGroup);

    // === ADVANCED ANIMATION SYSTEM ===
    
    let time = 0;
    const rotation4D = { xy: 0, xz: 0, xw: 0, yz: 0, yw: 0, zw: 0 };
    
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.016; // ~60fps delta
      
      // === 4D ROTATION DYNAMICS ===
      rotation4D.xy += 0.003;
      rotation4D.xz += 0.005;
      rotation4D.xw += 0.007; // Unique 4D rotation
      rotation4D.yz += 0.004;
      rotation4D.yw += 0.006; // Unique 4D rotation  
      rotation4D.zw += 0.002; // Unique 4D rotation
      
      // === UPDATE TESSERACT VERTICES ===
      vertices.forEach((vertex, index) => {
        // Project 4D to 3D with time-varying perspective
        const viewDistance = 3.5 + Math.sin(time * 0.5) * 0.5;
        vertex.position3D = project4DTo3D(
          ...vertex.position4D,
          viewDistance,
          rotation4D
        );
        
        // Update mesh position with energy pulsing
        const energyPulse = Math.sin(time * vertex.frequency + vertex.phase) * vertex.energy * 0.2;
        const scale = 1 + energyPulse;
        
        if (vertexMeshes[index]) {
          vertexMeshes[index].position.copy(vertex.position3D);
          vertexMeshes[index].scale.setScalar(scale);
          
          // Dynamic color based on 4D position and time
          const hue = (vertex.position4D[3] + 1) * 0.5 * 0.8 + time * 0.1;
          const lightness = 0.4 + energyPulse * 0.3;
          (vertexMeshes[index].material as THREE.MeshBasicMaterial).color.setHSL(hue, 0.8, lightness);
        }
      });
      
      // === UPDATE EDGE CONNECTIONS ===
      const newEdgePositions: number[] = [];
      vertices.forEach((vertex, i) => {
        vertex.connections.forEach(j => {
          if (i < j) {
            newEdgePositions.push(...vertex.position3D.toArray(), ...vertices[j].position3D.toArray());
          }
        });
      });
      
      if (edgeMesh.geometry) {
        edgeMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(newEdgePositions, 3));
      }
      
      // === QUANTUM FIELD DYNAMICS ===
      quantumFields.forEach((field, index) => {
        // Multi-dimensional oscillation
        const oscillation = field.dimensions.reduce((sum, dim, dimIndex) => {
          return sum + Math.sin(time * field.frequency + field.phase + dimIndex) * dim;
        }, 0) * field.amplitude;
        
        const newPosition = field.position.clone();
        newPosition.multiplyScalar(1 + oscillation * 0.1);
        
        if (fieldMeshes[index]) {
          fieldMeshes[index].position.copy(newPosition);
          
          // Quantum flickering
          const opacity = 0.2 + Math.abs(oscillation) * 0.3;
          (fieldMeshes[index].material as THREE.MeshBasicMaterial).opacity = opacity;
        }
      });
      
      // === DIMENSIONAL STREAMS ===
      streamMeshes.forEach((mesh, index) => {
        const streamPhase = time * 0.5 + index * 0.5;
        mesh.rotation.y = streamPhase;
        mesh.scale.y = 1 + Math.sin(streamPhase * 2) * 0.3;
        
        // Color shifting based on dimensional flux
        const hue = 0.5 + Math.sin(streamPhase) * 0.3;
        (mesh.material as THREE.MeshBasicMaterial).color.setHSL(hue, 0.8, 0.5);
      });
      
      // === CAMERA MOVEMENT ===
      // Gentle orbital movement around the tesseract
      const cameraRadius = 8;
      const cameraAngle = time * 0.1;
      camera.position.x = Math.cos(cameraAngle) * cameraRadius;
      camera.position.z = Math.sin(cameraAngle) * cameraRadius;
      camera.position.y = Math.sin(cameraAngle * 0.5) * 2;
      camera.lookAt(0, 0, 0);
      
      // === RENDER ===
      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.render(scene, cameraRef.current);
      }
    };

    animate();

    // === RESIZE HANDLER ===
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // === CLEANUP ===
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
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full rounded-lg overflow-hidden bg-transparent"
      style={{ minHeight: '100%', maxHeight: '100vh' }}
    />
  );
};

export default AgentVisualizer;