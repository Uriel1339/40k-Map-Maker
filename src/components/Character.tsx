import React, { useState, useEffect, useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Character as CharacterType } from '../types/character';
import { useStore } from '../store/useStore';

interface Props {
  character: CharacterType;
}

export const Character: React.FC<Props> = ({ character }) => {
  const zoom = useStore(state => state.zoom);
  const selectedCharacterId = useStore(state => state.selectedCharacterId);
  const setSelectedCharacterId = useStore(state => state.setSelectedCharacterId);
  const updateCharacterName = useStore(state => state.updateCharacterName);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(character.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: character.id,
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
    setSelectedCharacterId(character.id);
    setIsEditing(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isEditing) {
      setSelectedCharacterId(character.id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setName(e.target.value);
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
      setName(character.name);
    }
  };

  const finishEditing = () => {
    if (name.trim()) {
      updateCharacterName(character.id, name.trim());
    }
    setIsEditing(false);
  };

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${character.position.x}px`,
    top: `${character.position.y}px`,
    transform: transform 
      ? `translate3d(${transform.x / zoom}px, ${transform.y / zoom}px, 0)`
      : undefined,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: isEditing ? 'text' : 'move',
  };

  const circleStyle: React.CSSProperties = {
    width: `${character.size}px`,
    height: `${character.size}px`,
    backgroundColor: character.faction === 'ally' ? '#3B82F6' : '#EF4444',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    border: selectedCharacterId === character.id ? '3px solid yellow' : 'none'
  };

  return (
    <div
      ref={setNodeRef}
      style={containerStyle}
      {...(isEditing ? {} : { ...listeners, ...attributes })}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div style={circleStyle}>
        {character.initial}
      </div>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          maxLength={20}
          value={name}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="mt-1 px-2 py-1 text-sm bg-white rounded border-none focus:ring-2 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div className="mt-1 px-2 py-1 bg-black bg-opacity-50 rounded text-white text-sm select-none">
          {character.name}
        </div>
      )}
    </div>
  );
};