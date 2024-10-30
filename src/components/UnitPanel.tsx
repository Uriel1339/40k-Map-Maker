import React from 'react';
import { useStore } from '../store/useStore';
import { Unit, UnitType, FactionType } from '../types';
import { CollapsiblePanel } from './CollapsiblePanel';

export const UnitPanel: React.FC = () => {
  const { 
    addUnit, 
    clearAllUnits, 
    clearUnitsByType, 
    clearUnitsByFaction,
    clearUnitsByTypeAndFaction 
  } = useStore();

  const createUnit = (type: UnitType, faction: FactionType) => {
    const randomX = Math.floor(Math.random() * 200) + 100;
    const randomY = Math.floor(Math.random() * 200) + 100;
    
    const unit: Unit = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${type}-${Math.floor(Math.random() * 1000)}`,
      type,
      faction,
      position: { x: randomX, y: randomY },
      health: 100,
      power: 10
    };
    addUnit(unit);
  };

  return (
    <div className="fixed top-0 right-0 p-4 bg-white shadow-lg rounded-bl-lg max-w-xs">
      <CollapsiblePanel title="Add Units">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => createUnit('infantry', 'ally')}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Ally Infantry
          </button>
          <button
            onClick={() => createUnit('infantry', 'enemy')}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Add Enemy Infantry
          </button>
          <button
            onClick={() => createUnit('vehicle', 'ally')}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Ally Vehicle
          </button>
          <button
            onClick={() => createUnit('vehicle', 'enemy')}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Add Enemy Vehicle
          </button>
        </div>
      </CollapsiblePanel>

      <CollapsiblePanel title="Remove Units">
        <div className="space-y-2">
          <button
            onClick={() => clearAllUnits()}
            className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove All Units
          </button>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => clearUnitsByType('infantry')}
              className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Remove Infantry
            </button>
            <button
              onClick={() => clearUnitsByType('vehicle')}
              className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Remove Vehicles
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => clearUnitsByFaction('ally')}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Remove Allies
            </button>
            <button
              onClick={() => clearUnitsByFaction('enemy')}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove Enemies
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => clearUnitsByTypeAndFaction('infantry', 'ally')}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Remove Ally Infantry
            </button>
            <button
              onClick={() => clearUnitsByTypeAndFaction('infantry', 'enemy')}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Remove Enemy Infantry
            </button>
            <button
              onClick={() => clearUnitsByTypeAndFaction('vehicle', 'ally')}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Remove Ally Vehicles
            </button>
            <button
              onClick={() => clearUnitsByTypeAndFaction('vehicle', 'enemy')}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Remove Enemy Vehicles
            </button>
          </div>
        </div>
      </CollapsiblePanel>
    </div>
  );
};