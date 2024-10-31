import React from 'react';
import { useStore } from '../store/useStore';
import { Structure, StructureType } from '../types';
import { CollapsiblePanel } from './CollapsiblePanel';

export const StructurePanel: React.FC = () => {
  const { 
    addStructure, 
    clearStructures,
    zoom,
    panOffset
  } = useStore();

  const createStructure = (type: StructureType) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate position in the center of the viewport
    const x = (viewportWidth / 2) / zoom - panOffset.x / zoom;
    const y = (viewportHeight / 2) / zoom - panOffset.y / zoom;

    const structure: Structure = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      position: { x, y },
      width: type === 'building' ? 200 : 100,
      height: type === 'building' ? 200 : 50,
      elevation: 0,
      rotation: 0
    };
    
    addStructure(structure);
  };

  return (
    <div className="fixed bottom-0 left-0 p-4 bg-white shadow-lg rounded-tr-lg">
      <CollapsiblePanel title="Structures" defaultOpen>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => createStructure('wall')}
            className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Add Wall
          </button>
          <button
            onClick={() => createStructure('building')}
            className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Add Building
          </button>
          <button
            onClick={() => createStructure('ruins')}
            className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Add Ruins
          </button>
          <button
            onClick={() => createStructure('barricade')}
            className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Add Barricade
          </button>
          <button
            onClick={clearStructures}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 col-span-2"
          >
            Clear All Structures
          </button>
        </div>
      </CollapsiblePanel>
    </div>
  );
};