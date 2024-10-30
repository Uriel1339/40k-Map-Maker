import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Unit as UnitType } from '../types';

interface Props {
  unit: UnitType;
  style?: React.CSSProperties;
  locked?: boolean;
  selected?: boolean;
}

export const Unit: React.FC<Props> = ({ unit, style, locked, selected }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: unit.id,
    disabled: locked,
  });

  const combinedStyle: React.CSSProperties = {
    ...style,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    position: 'absolute',
    left: unit.position.x,
    top: unit.position.y,
  };

  return (
    <div
      ref={setNodeRef}
      style={combinedStyle}
      {...(locked ? {} : { ...listeners, ...attributes })}
      className={`w-10 h-10 rounded-full cursor-move ${
        unit.faction === 'ally' ? 'bg-blue-500' :
        unit.faction === 'enemy' ? 'bg-red-500' : 'bg-gray-500'
      } ${selected ? 'ring-4 ring-yellow-400' : ''} ${locked ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
        {unit.type.charAt(0).toUpperCase()}
      </div>
      {unit.groupId && (
        <div className="absolute -top-4 left-0 right-0 text-center text-xs font-bold text-purple-600">
          ⬤
        </div>
      )}
    </div>
  );
};