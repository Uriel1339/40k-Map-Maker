import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { TerrainTile as TerrainTileType } from '../types';
import { useStore } from '../store/useStore';

const terrainStyles = {
  urban: 'bg-gray-400 bg-opacity-75',
  wilderness: 'bg-green-600 bg-opacity-75',
  desert: 'bg-yellow-300 bg-opacity-75',
  jungle: 'bg-green-800 bg-opacity-75',
};

interface Props {
  terrain: TerrainTileType;
  locked?: boolean;
}

export const TerrainTile: React.FC<Props> = ({ terrain, locked }) => {
  const zoom = useStore((state) => state.zoom);
  const gridSize = useStore((state) => state.gridSize);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: terrain.id,
    disabled: locked,
  });

  const style: React.CSSProperties = {
    position: 'absolute',
    width: `${gridSize}px`,
    height: `${gridSize}px`,
    left: `${terrain.position.x}px`,
    top: `${terrain.position.y}px`,
    transform: transform 
      ? `translate3d(${transform.x / zoom}px, ${transform.y / zoom}px, 0)` 
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(locked ? {} : { ...listeners, ...attributes })}
      className={`rounded ${terrainStyles[terrain.type]} border-2 border-gray-600 border-dashed ${
        locked ? 'opacity-75 cursor-not-allowed' : 'cursor-move'
      }`}
    />
  );
};