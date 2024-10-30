import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/useStore';

export const Grid: React.FC = () => {
  const { gridVisible, zoom, gridSize } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  if (!gridVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
        backgroundSize: `${gridSize * zoom}px ${gridSize * zoom}px`,
        width: dimensions.width,
        height: dimensions.height,
        opacity: 0.5
      }}
    />
  );
};