import React from 'react';
import { useStore } from '../store/useStore';
import { ElevationType } from '../types';
import { CollapsiblePanel } from './CollapsiblePanel';

const elevationInfo = {
  ground: { name: 'Ground Floor', color: 'bg-green-600' },
  first: { name: '1st Floor', color: 'bg-blue-600' },
  second: { name: '2nd Floor', color: 'bg-purple-600' },
  roof: { name: 'Rooftop', color: 'bg-red-600' },
};

export const ElevationControls: React.FC = () => {
  const { 
    currentElevation, 
    setCurrentElevation,
    selectedUnitIds,
    updateUnitsElevation
  } = useStore();

  const handleElevationChange = (elevation: ElevationType) => {
    setCurrentElevation(elevation);
    if (selectedUnitIds.length > 0) {
      updateUnitsElevation(selectedUnitIds, elevation);
    }
  };

  return (
    <CollapsiblePanel title="Elevation Controls">
      <div className="space-y-2">
        {(Object.entries(elevationInfo) as [ElevationType, { name: string; color: string }][]).map(([elevation, info]) => (
          <button
            key={elevation}
            onClick={() => handleElevationChange(elevation)}
            className={`w-full px-3 py-2 text-white rounded hover:opacity-90 ${
              currentElevation === elevation ? info.color : 'bg-gray-400'
            }`}
          >
            {info.name}
          </button>
        ))}
      </div>
    </CollapsiblePanel>
  );
};