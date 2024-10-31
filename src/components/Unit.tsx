import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Unit as UnitType } from '../types';
import { useStore } from '../store/useStore';

interface Props {
  unit: UnitType;
}

export const Unit: React.FC<Props> = ({ unit }) => {
  const zoom = useStore(state => state.zoom);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: unit.id,
  });

  const style: React.CSSProperties = {
    position: 'absolute',
    width: `${unit.width}px`,
    height: `${unit.height}px`,
    left: `${unit.position.x}px`,
    top: `${unit.position.y}px`,
    transform: transform 
      ? `translate3d(${transform.x / zoom}px, ${transform.y / zoom}px, 0) rotate(${unit.rotation}deg)`
      : `rotate(${unit.rotation}deg)`,
    backgroundColor: unit.faction === 'ally' ? '#3B82F6' : '#EF4444',
    cursor: 'move',
    borderRadius: unit.type === 'character' ? '50%' : '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {unit.type === 'character' && 'C'}
    </div>
  );
};