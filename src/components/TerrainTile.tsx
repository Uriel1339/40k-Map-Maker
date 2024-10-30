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
  style?: React.CSSProperties;
  locked?: boolean;
}

export const TerrainTile: React.FC<Props> = ({ terrain, style, locked }) => {
  const gridSize = useStore((state) => state.gridSize);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: terrain.id,
    disabled: locked,
  });

  const combinedStyle: React.CSSProperties = {
    ...style,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    position: 'absolute',
    width: `${gridSize}px`,
    height: `${gridSize}px`,
  };

  return (
    <div
      ref={setNodeRef}
      style={combinedStyle}
      {...(locked ? {} : { ...listeners, ...attributes })}
      className={`rounded ${terrainStyles[terrain.type]} border-2 border-gray-600 border-dashed ${
        locked ? 'opacity-75 cursor-not-allowed' : 'cursor-move'
      }`}
    />
  );
};