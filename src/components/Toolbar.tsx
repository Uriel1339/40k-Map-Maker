import React from 'react';
import { useStore } from '../store/useStore';

export const Toolbar: React.FC = () => {
  const { 
    gridVisible, 
    toggleGrid, 
    activeLayer, 
    setActiveLayer,
    zoom,
    setZoom,
    currentElevation,
    setCurrentElevation,
    isTerrainLocked,
    setTerrainLocked
  } = useStore();

  return (
    <div className="fixed top-0 left-0 p-4 bg-white shadow-lg rounded-br-lg">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <button
            onClick={toggleGrid}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {gridVisible ? 'Hide Grid' : 'Show Grid'}
          </button>
          
          <select
            value={activeLayer}
            onChange={(e) => setActiveLayer(e.target.value as any)}
            className="px-4 py-2 border rounded"
          >
            <option value="all">All Layers</option>
            <option value="terrain">Terrain</option>
            <option value="units">Units</option>
            <option value="vehicles">Vehicles</option>
          </select>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Zoom: {zoom.toFixed(1)}x</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Elevation Level</label>
            <input
              type="number"
              value={currentElevation}
              onChange={(e) => setCurrentElevation(Number(e.target.value))}
              className="px-4 py-2 border rounded"
            />
          </div>

          <button
            onClick={() => setTerrainLocked(!isTerrainLocked)}
            className={`px-4 py-2 ${
              isTerrainLocked ? 'bg-red-500' : 'bg-green-500'
            } text-white rounded hover:opacity-90`}
          >
            {isTerrainLocked ? 'Unlock Terrain' : 'Lock Terrain'}
          </button>
        </div>
      </div>
    </div>
  );
};