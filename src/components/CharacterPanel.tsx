import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CollapsiblePanel } from './CollapsiblePanel';

export const CharacterPanel: React.FC = () => {
  const { 
    addCharacter, 
    clearCharacters,
    zoom,
    panOffset
  } = useStore();

  const [name, setName] = useState('Character 1');

  const createCharacter = (faction: 'ally' | 'enemy') => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const x = (viewportWidth / 2) / zoom - panOffset.x / zoom;
    const y = (viewportHeight / 2) / zoom - panOffset.y / zoom;

    const character = {
      id: Math.random().toString(36).substr(2, 9),
      position: { x, y },
      size: 50,
      faction,
      initial: name.charAt(0).toUpperCase(),
      name
    };
    
    addCharacter(character);
    setName(prev => {
      const num = parseInt(prev.split(' ')[1] || '1');
      return `Character ${num + 1}`;
    });
  };

  return (
    <div className="fixed top-0 right-0 p-4 bg-white shadow-lg rounded-bl-lg max-w-xs">
      <CollapsiblePanel title="Characters" defaultOpen>
        <div className="space-y-2">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Character Name
            </label>
            <input
              type="text"
              maxLength={20}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => createCharacter('ally')}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Ally
            </button>
            <button
              onClick={() => createCharacter('enemy')}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Add Enemy
            </button>
          </div>
          <button
            onClick={clearCharacters}
            className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Characters
          </button>
        </div>
      </CollapsiblePanel>
    </div>
  );
};