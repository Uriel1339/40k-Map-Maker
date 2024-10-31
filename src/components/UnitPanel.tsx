import React from 'react';
import { useStore } from '../store/useStore';
import { CollapsiblePanel } from './CollapsiblePanel';

export const UnitPanel: React.FC = () => {
  const { 
    addUnit, 
    clearUnits,
    zoom,
    panOffset
  } = useStore();

  const createCharacter = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const x = (viewportWidth / 2) / zoom - panOffset.x / zoom;
    const y = (viewportHeight / 2) / zoom - panOffset.y / zoom;

    const unit = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'character' as const,
      faction: 'ally' as const,
      position: { x, y },
      width: 50,
      height: 50,
      elevation: 0,
      rotation: 0
    };
    
    console.log('Creating character:', unit);
    addUnit(unit);
  };

  return (
    <div className="fixed top-0 right-0 p-4 bg-white shadow-lg rounded-bl-lg max-w-xs">
      <CollapsiblePanel title="Characters" defaultOpen>
        <div className="space-y-2">
          <button
            onClick={createCharacter}
            className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Character
          </button>
          <button
            onClick={clearUnits}
            className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear All Characters
          </button>
        </div>
      </CollapsiblePanel>
    </div>
  );
};