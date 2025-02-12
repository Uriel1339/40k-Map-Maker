import React, { useState, useEffect, useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Structure as StructureType } from '../types';
import { useStore } from '../store/useStore';

interface Props {
  structure: StructureType;
}

export const Structure: React.FC<Props> = ({ structure }) => {
  const zoom = useStore(state => state.zoom);
  const updateStructureLabel = useStore(state => state.updateStructureLabel);
  const selectedStructureId = useStore(state => state.selectedStructureId);
  const setSelectedStructureId = useStore(state => state.setSelectedStructureId);

  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(structure.label || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: structure.id,
    disabled: isEditing
  });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedStructureId(structure.id);
    setIsEditing(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isEditing) {
      setSelectedStructureId(structure.id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLabel(e.target.value);
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    e.preventDefault();
    e.stopPropagation();
    finishEditing();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setLabel(structure.label || '');
    }
  };

  const finishEditing = () => {
    if (label.trim()) {
      updateStructureLabel(structure.id, label.trim());
    }
    setIsEditing(false);
  };

  const style: React.CSSProperties = {
    position: 'absolute',
    width: `${structure.width}px`,
    height: `${structure.height}px`,
    left: `${structure.position.x}px`,
    top: `${structure.position.y}px`,
    transform: transform 
      ? `translate3d(${transform.x / zoom}px, ${transform.y / zoom}px, 0) rotate(${structure.rotation}deg)`
      : `rotate(${structure.rotation}deg)`,
    backgroundColor: structure.type === 'wall' ? '#1F2937' :
                    structure.type === 'building' ? '#4B5563' :
                    structure.type === 'ruins' ? '#9CA3AF' : '#6B7280',
    cursor: isEditing ? 'text' : 'move',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '14px',
    userSelect: 'none'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isEditing ? {} : { ...listeners, ...attributes })}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`${selectedStructureId === structure.id ? 'ring-2 ring-yellow-400' : ''}`}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={label}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="w-3/4 px-2 py-1 text-black text-sm bg-white rounded border-none focus:ring-2 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div className="select-none">
          {structure.label || structure.type}
        </div>
      )}
    </div>
  );
};