import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Structure as StructureType } from '../types';

interface Props {
  structure: StructureType;
}

export const Structure: React.FC<Props> = ({ structure }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: structure.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${structure.rotation}deg)`,
    width: `${structure.width}px`,
    height: `${structure.height}px`,
  } : {
    width: `${structure.width}px`,
    height: `${structure.height}px`,
    transform: `rotate(${structure.rotation}deg)`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`absolute cursor-move ${
        structure.type === 'wall' ? 'bg-gray-800' :
        structure.type === 'building' ? 'bg-gray-600' :
        structure.type === 'ruins' ? 'bg-gray-400' : 'bg-gray-500'
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
        {structure.type}
      </div>
    </div>
  );
};