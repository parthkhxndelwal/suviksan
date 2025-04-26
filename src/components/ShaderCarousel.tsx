import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Figure } from './Figure';

interface ShaderCarouselProps {
  images: string[];
  className?: string;
}

const ShaderCarousel = ({ images, className }: ShaderCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [figure, setFigure] = useState<Figure | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const newScene = new THREE.Scene();
    const newCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const newRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    newRenderer.setSize(window.innerWidth, window.innerHeight);
    newRenderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(newRenderer.domElement);

    newCamera.position.z = 5;
    newScene.add(newCamera);

    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);

    // Create figure instance
    const newFigure = new Figure(newScene, () => {
      // Callback when textures are loaded
      console.log('Textures loaded');
    });
    setFigure(newFigure);

    // Handle window resize
    const handleResize = () => {
      if (!newCamera || !newRenderer) return;
      
      newCamera.aspect = window.innerWidth / window.innerHeight;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (newFigure) {
        newFigure.update();
      }
      newRenderer.render(newScene, newCamera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(newRenderer.domElement);
      }
      newRenderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full ${className || ''}`}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="tile__image absolute inset-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0,
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
};

export default ShaderCarousel; 