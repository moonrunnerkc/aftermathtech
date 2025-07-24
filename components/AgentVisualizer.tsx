// components/AgentVisualizer.tsx - ADVANCED TESSERACT WITH MOBILE OPTIMIZATION
'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

/**
 * Interface for 4D tesseract nodes with quantum properties
 */
interface TesseractNode {
  position4D: [number, number, number, number]; // 4D coordinates (x, y, z, w)
  position3D: THREE.Vector3;                    // Projected 3D position
  connections: number[];                         // Connected vertex indices
  energy: number;                               // Energy level (0-1)
  phase: number;                                // Phase for oscillation
  frequency: number;                            // Oscillation frequency
}

/**
 * Interface for quantum field particles around the tesseract
 */
interface QuantumField {
  position: THREE.Vector3;    // 3D position
  frequency: number;          // Oscillation frequency
  amplitude: number;          // Oscillation amplitude
  phase: number;             // Phase offset
  dimensions: number[];      // 4D dimensional influences
}

/**
 * Interface for device capability detection
 */
interface DeviceCapabilities {
  isMobile: boolean;         // Mobile device detection
  webGLSupported: boolean;   // WebGL support check
  useParticles: boolean;     // Whether to render particles
  maxComplexity: number;     // Complexity level (0-1)
}

const AgentVisualizer: React.FC = () => {
  // === REACT REFS AND STATE ===
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number | null>(null);
  
  // Device capability state
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    webGLSupported: true,
    useParticles: true,
    maxComplexity: 1.0
  });

  // === DEVICE DETECTION AND OPTIMIZATION ===
  
  /**
   * Detect device capabilities and set optimization parameters
   */
  const detectDeviceCapabilities = (): DeviceCapabilities => {
    // Mobile device detection
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobile = mobileRegex.test(userAgent) || window.innerWidth < 768;
    
    // WebGL support detection
    let webGLSupported = true;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      webGLSupported = !!gl;
    } catch (e) {
      webGLSupported = false;
    }
    
    // Performance-based complexity calculation
    const maxComplexity = isMobile ? 0.3 : 1.0;
    const useParticles = !isMobile && webGLSupported;
    
    console.log('Device capabilities:', { 
      isMobile, 
      webGLSupported, 
      useParticles, 
      maxComplexity 
    });
    
    return {
      isMobile,
      webGLSupported,
      useParticles,
      maxComplexity
    };
  };

  // === ADVANCED 4D MATHEMATICS ===
  
  /**
   * Project 4D coordinates to 3D space with advanced rotation matrices
   * @param x4d - X coordinate in 4D space
   * @param y4d - Y coordinate in 4D space  
   * @param z4d - Z coordinate in 4D space
   * @param w4d - W coordinate in 4D space (fourth dimension)
   * @param viewDistance - Distance for perspective projection
   * @param rotation4D - Rotation angles for all 6 4D rotation planes
   * @returns Projected 3D vector
   */
  const project4DTo3D = (
    x4d: number, y4d: number, z4d: number, w4d: number, 
    viewDistance: number = 3.0, 
    rotation4D: { xy: number, xz: number, xw: number, yz: number, yw: number, zw: number }
  ): THREE.Vector3 => {
    // Start with original 4D coordinates
    let x = x4d, y = y4d, z = z4d, w = w4d;
    
    // Apply 4D rotations in all 6 possible planes
    // XY plane rotation (standard 3D rotation)
    const cosXY = Math.cos(rotation4D.xy), sinXY = Math.sin(rotation4D.xy);
    [x, y] = [x * cosXY - y * sinXY, x * sinXY + y * cosXY];
    
    // XZ plane rotation (standard 3D rotation)
    const cosXZ = Math.cos(rotation4D.xz), sinXZ = Math.sin(rotation4D.xz);
    [x, z] = [x * cosXZ - z * sinXZ, x * sinXZ + z * cosXZ];
    
    // XW plane rotation (4D specific - rotates X with W dimension)
    const cosXW = Math.cos(rotation4D.xw), sinXW = Math.sin(rotation4D.xw);
    [x, w] = [x * cosXW - w * sinXW, x * sinXW + w * cosXW];
    
    // YZ plane rotation (standard 3D rotation)
    const cosYZ = Math.cos(rotation4D.yz), sinYZ = Math.sin(rotation4D.yz);
    [y, z] = [y * cosYZ - z * sinYZ, y * sinYZ + z * cosYZ];
    
    // YW plane rotation (4D specific - rotates Y with W dimension)
    const cosYW = Math.cos(rotation4D.yw), sinYW = Math.sin(rotation4D.yw);
    [y, w] = [y * cosYW - w * sinYW, y * sinYW + w * cosYW];
    
    // ZW plane rotation (4D specific - rotates Z with W dimension)
    const cosZW = Math.cos(rotation4D.zw), sinZW = Math.sin(rotation4D.zw);
    [z, w] = [z * cosZW - w * sinZW, z * sinZW + w * cosZW];
    
    // Project to 3D using perspective division
    // The W coordinate affects the perspective scaling
    const perspective = viewDistance / (viewDistance + w);
    
    return new THREE.Vector3(x * perspective, y * perspective, z * perspective);
  };

  // === TESSERACT GENERATION ===
  
  /**
   * Generate all 16 vertices of a tesseract (4D hypercube) with connections
   * @param complexity - Complexity multiplier for mobile optimization
   * @returns Array of tesseract nodes with 4D positions and connections
   */
  const generateTesseractVertices = (complexity: number): TesseractNode[] => {
    const vertices: TesseractNode[] = [];
    
    // Generate all 16 vertices of a tesseract (2^4 = 16 vertices)
    // Each vertex is at the corner of a 4D hypercube
    for (let i = 0; i < 16; i++) {
      // Use bit manipulation to generate all combinations of +1/-1 for 4 dimensions
      const x = (i & 1) ? 1 : -1;         // Bit 0 determines X coordinate
      const y = (i & 2) ? 1 : -1;         // Bit 1 determines Y coordinate
      const z = (i & 4) ? 1 : -1;         // Bit 2 determines Z coordinate
      const w = (i & 8) ? 1 : -1;         // Bit 3 determines W coordinate
      
      vertices.push({
        position4D: [x, y, z, w],
        position3D: new THREE.Vector3(),
        connections: [],
        energy: Math.random() * 0.5 + 0.5, // Random energy level
        phase: Math.random() * Math.PI * 2,  // Random phase for animations
        frequency: (0.5 + Math.random() * 2.0) * complexity // Frequency scaled by complexity
      });
    }
    
    // Calculate connections between vertices
    // In a tesseract, vertices are connected if they differ by exactly 1 coordinate
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let differences = 0;
        // Count how many coordinates are different
        for (let k = 0; k < 4; k++) {
          if (vertices[i].position4D[k] !== vertices[j].position4D[k]) {
            differences++;
          }
        }
        // Connect vertices that differ by exactly 1 coordinate
        if (differences === 1) {
          vertices[i].connections.push(j);
          vertices[j].connections.push(i);
        }
      }
    }
    
    return vertices;
  };

  // === QUANTUM FIELD GENERATION ===
  
  /**
   * Generate quantum field points around the tesseract
   * @param count - Number of field points to generate
   * @param complexity - Complexity multiplier for mobile optimization
   * @returns Array of quantum field particles
   */
  const generateQuantumField = (count: number, complexity: number): QuantumField[] => {
    const fields: QuantumField[] = [];
    const actualCount = Math.floor(count * complexity);
    
    for (let i = 0; i < actualCount; i++) {
      // Generate points on a sphere using uniform distribution
      const phi = Math.acos(1 - 2 * Math.random()); // Polar angle
      const theta = Math.random() * 2 * Math.PI;     // Azimuthal angle
      const radius = 2 + Math.random() * 3;          // Distance from center
      
      fields.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        frequency: (0.1 + Math.random() * 0.5) * complexity,
        amplitude: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        dimensions: [Math.random(), Math.random(), Math.random(), Math.random()]
      });
    }
    
    return fields;
  };

  // === CSS FALLBACK FOR UNSUPPORTED DEVICES ===
  
  /**
   * Render CSS-only fallback when WebGL is not supported
   */
  const renderCSSFallback = () => {
    if (!mountRef.current) return;
    
    mountRef.current.innerHTML = `
      <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-900">
        <!-- CSS-only animated background for unsupported devices -->
        <div class="absolute inset-0 opacity-30">
          <!-- Animated dots simulating particles -->
          <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
          <div class="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
          <div class="absolute top-2/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
          <div class="absolute bottom-1/3 right-2/3 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-700"></div>
          <!-- Additional animated elements -->
          <div class="absolute top-1/2 left-1/2 w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-1000 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <!-- Gradient overlays for depth -->
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,255,0.1)_0%,transparent_50%)]"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(157,78,221,0.1)_0%,transparent_50%)]"></div>
        
        <!-- Grid pattern for cyber aesthetic -->
        <div class="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
    `;
  };

  // === MAIN EFFECT HOOK ===
  
  useEffect(() => {
    // Detect device capabilities first
    const deviceCaps = detectDeviceCapabilities();
    setCapabilities(deviceCaps);
    
    if (!mountRef.current) return;

    // If WebGL not supported, show CSS fallback
    if (!deviceCaps.webGLSupported) {
      renderCSSFallback();
      return;
    }

    // === SCENE INITIALIZATION ===
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, deviceCaps.isMobile ? 0.02 : 0.01);
    sceneRef.current = scene;

    // === CAMERA SETUP ===
    
    const camera = new THREE.PerspectiveCamera(
      60, // Field of view
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, deviceCaps.isMobile ? 10 : 8); // Further back on mobile
    cameraRef.current = camera;

    // === RENDERER SETUP WITH MOBILE OPTIMIZATION ===
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !deviceCaps.isMobile,  // Disable antialiasing on mobile
      alpha: true,
      powerPreference: deviceCaps.isMobile ? "low-power" : "high-performance",
      stencil: false,
      depth: true,
      premultipliedAlpha: false,
      precision: deviceCaps.isMobile ? "mediump" : "highp" // Lower precision on mobile
    });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    // Limit pixel ratio on mobile for better performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, deviceCaps.isMobile ? 1 : 2));
    renderer.shadowMap.enabled = !deviceCaps.isMobile; // Disable shadows on mobile
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // === TESSERACT CORE SYSTEM ===
    
    const tesseractGroup = new THREE.Group();
    const vertices = generateTesseractVertices(deviceCaps.maxComplexity);
    const quantumFields = generateQuantumField(
      deviceCaps.isMobile ? 25 : 50, // Fewer particles on mobile
      deviceCaps.maxComplexity
    );
    
    // === VERTEX VISUALIZATION (HYPERSPHERE NODES) ===
    
    const vertexGeometry = new THREE.SphereGeometry(
      0.08, 
      deviceCaps.isMobile ? 8 : 16,  // Lower geometry detail on mobile
      deviceCaps.isMobile ? 8 : 16
    );
    const vertexMeshes: THREE.Mesh[] = [];
    
    vertices.forEach((vertex, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(
          (index / 16) * 0.8 + 0.1, // Cycle through color spectrum
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

    // === EDGE VISUALIZATION (HYPERCUBE CONNECTIONS) ===
    
    const edgeGeometry = new THREE.BufferGeometry();
    const edgePositions: number[] = [];
    const edgeColors: number[] = [];
    
    // Generate edge lines between connected vertices
    vertices.forEach((vertex, i) => {
      vertex.connections.forEach(j => {
        if (i < j) { // Avoid duplicate edges
          edgePositions.push(...vertex.position3D.toArray(), ...vertices[j].position3D.toArray());
          
          // Color based on 4D dimensional alignment
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
      opacity: deviceCaps.isMobile ? 0.8 : 0.6, // More visible on mobile
      linewidth: deviceCaps.isMobile ? 3 : 2    // Thicker lines on mobile
    });
    
    const edgeMesh = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    tesseractGroup.add(edgeMesh);

    // === QUANTUM FIELD VISUALIZATION ===
    
    const fieldGroup = new THREE.Group();
    const fieldGeometry = new THREE.SphereGeometry(
      0.02, 
      deviceCaps.isMobile ? 4 : 8,  // Simpler geometry on mobile
      deviceCaps.isMobile ? 4 : 8
    );
    const fieldMeshes: THREE.Mesh[] = [];
    
    // Only create quantum field if particles are enabled
    if (deviceCaps.useParticles) {
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
    }

    // === DIMENSIONAL ENERGY STREAMS ===
    
    const streamGroup = new THREE.Group();
    const streamCount = deviceCaps.isMobile ? 6 : 12; // Fewer streams on mobile
    const streamMeshes: THREE.Mesh[] = [];
    
    for (let i = 0; i < streamCount; i++) {
      const geometry = new THREE.CylinderGeometry(
        0.01, 0.01, 6, 
        deviceCaps.isMobile ? 4 : 6 // Simpler geometry on mobile
      );
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

    // Add all groups to scene
    scene.add(tesseractGroup);
    scene.add(fieldGroup);
    scene.add(streamGroup);

    // === INTERACTION HANDLING ===
    
    let mouseX = 0;
    let mouseY = 0;
    
    const handleInteraction = (event: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      
      // Handle both mouse and touch events
      if ('touches' in event && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else if ('clientX' in event) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else {
        return;
      }
      
      mouseX = (clientX / window.innerWidth) * 2 - 1;
      mouseY = -(clientY / window.innerHeight) * 2 + 1;
    };
    
    document.addEventListener('mousemove', handleInteraction);
    document.addEventListener('touchmove', handleInteraction, { passive: true });

    // === ADVANCED ANIMATION SYSTEM ===
    
    let time = 0;
    const rotation4D = { xy: 0, xz: 0, xw: 0, yz: 0, yw: 0, zw: 0 };
    
    // Frame rate optimization for mobile
    let lastTime = 0;
    const targetFPS = deviceCaps.isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      frameRef.current = requestAnimationFrame(animate);
      
      // Throttle frame rate on mobile devices
      if (currentTime - lastTime < frameInterval) {
        return;
      }
      lastTime = currentTime;

      time += 0.016 * (deviceCaps.isMobile ? 0.5 : 1); // Slower animation on mobile
      
      // === 4D ROTATION DYNAMICS ===
      // Each rotation plane evolves at different rates for complex 4D motion
      rotation4D.xy += 0.003 * deviceCaps.maxComplexity;
      rotation4D.xz += 0.005 * deviceCaps.maxComplexity;
      rotation4D.xw += 0.007 * deviceCaps.maxComplexity; // Unique 4D rotation
      rotation4D.yz += 0.004 * deviceCaps.maxComplexity;
      rotation4D.yw += 0.006 * deviceCaps.maxComplexity; // Unique 4D rotation  
      rotation4D.zw += 0.002 * deviceCaps.maxComplexity; // Unique 4D rotation
      
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
      // Rebuild edge positions based on updated vertex positions
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
      if (deviceCaps.useParticles) {
        quantumFields.forEach((field, index) => {
          // Multi-dimensional oscillation based on 4D influences
          const oscillation = field.dimensions.reduce((sum, dim, dimIndex) => {
            return sum + Math.sin(time * field.frequency + field.phase + dimIndex) * dim;
          }, 0) * field.amplitude;
          
          const newPosition = field.position.clone();
          newPosition.multiplyScalar(1 + oscillation * 0.1);
          
          if (fieldMeshes[index]) {
            fieldMeshes[index].position.copy(newPosition);
            
            // Quantum flickering effect
            const opacity = 0.2 + Math.abs(oscillation) * 0.3;
            (fieldMeshes[index].material as THREE.MeshBasicMaterial).opacity = opacity;
          }
        });
      }
      
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
      // Gentle orbital movement around the tesseract with mouse influence
      const cameraRadius = deviceCaps.isMobile ? 10 : 8;
      const cameraAngle = time * 0.1;
      const mouseInfluence = deviceCaps.isMobile ? 0.5 : 1.0;
      
      camera.position.x = Math.cos(cameraAngle) * cameraRadius + mouseX * mouseInfluence;
      camera.position.z = Math.sin(cameraAngle) * cameraRadius + mouseY * mouseInfluence;
      camera.position.y = Math.sin(cameraAngle * 0.5) * 2;
      camera.lookAt(0, 0, 0);
      
      // === RENDER FRAME ===
      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.render(scene, cameraRef.current);
      }
    };

    // Start animation loop
    animate(0);

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

    // === CLEANUP FUNCTION ===
    return () => {
      // Remove event listeners
      document.removeEventListener('mousemove', handleInteraction);
      document.removeEventListener('touchmove', handleInteraction);
      window.removeEventListener('resize', handleResize);
      
      // Cancel animation frame
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      // Remove renderer from DOM
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of Three.js resources to prevent memory leaks
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      // Dispose all geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    };
  }, []); // Empty dependency array - run once on mount

  // === RENDER COMPONENT ===
  
  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full"
      style={{ 
        background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
        zIndex: -1,
        minHeight: '100%', 
        maxHeight: '100vh' 
      }}
    />
  );
};

export default AgentVisualizer;