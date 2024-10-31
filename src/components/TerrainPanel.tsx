import React from 'react';
import { useStore } from '../store/useStore';
import { TerrainType } from '../types';
import { CollapsiblePanel } from './CollapsiblePanel';

const terrainInfo = {
  urban: { name: 'Urban', color: 'bg-gray-400' },
  wilderness: { name: 'Wilderness', color: 'bg-green-600' },
  desert: { name: 'Desert', color: 'bg-yellow-300' },
  jungle: { name: 'Jungle', color: 'bg-green-800' },
};

export const TerrainPanel: React.FC = () => {
  const { 
    addTerrain, 
    fillTerrainGrid, 
    fillRandomTerrain, 
    clearTerrain, 
    gridSize, 
    setGridSize,
    zoom,
    panOffset
  } = useStore();

  const createTerrain = (type: TerrainType) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate position in the center of the viewport
    const x = (viewportWidth / 2) / zoom - panOffset.x / zoom;
    const y = (viewportHeight / 2) / zoom - panOffset.y / zoom;

    addTerrain({
      type,
      position: { x, y },
      elevation: 0
    });
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 bg-white shadow-lg rounded-tl-lg max-w-xs">
      <CollapsiblePanel title="Grid Size">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="50"
            max="200"
            step="25"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm">{gridSize}px</span>
        </div>
      </CollapsiblePanel>

      <CollapsiblePanel title="Add Terrain" defaultOpen>
        <div className="grid grid-cols-2 gap-2">
          {(Object.entries(terrainInfo) as [TerrainType, { name: string; color: string }][]).map(([type, info]) => (
            <button
              key={type}
              onClick={() => createTerrain(type)}
              className={`px-3 py-2 text-white rounded hover:opacity-80 ${info.color}`}
            >
              {info.name}
            </button>
          ))}
        </div>
      </CollapsiblePanel>

      <CollapsiblePanel title="Fill Tools">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(terrainInfo) as [TerrainType, { name: string; color: string }][]).map(([type, info]) => (
              <button
                key={`fill-${type}`}
                onClick={() => fillTerrainGrid(type)}
                className={`px-3 py-2 text-white rounded hover:opacity-80 ${info.color}`}
              >
                Fill {info.name}
              </button>
            ))}
          </div>
          <button
            onClick={fillRandomTerrain}
            className="w-full px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Random Terrain
          </button>
          <button
            onClick={clearTerrain}
            className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear All Terrain
          </button>
        </div>
      </CollapsiblePanel>
    </div>
  );
};