import React, { useState, useCallback } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useStore } from '../store/useStore';
import { Grid } from './Grid';
import { Unit } from './Unit';
import { Structure } from './Structure';
import { TerrainTile } from './TerrainTile';
import { SelectionBox } from './SelectionBox';
import { Position } from '../types';

export const Battlefield: React.FC = () => {
  const { 
    units, 
    structures,
    terrain,
    updateUnitPosition, 
    updateStructurePosition,
    updateTerrainPosition,
    zoom,
    currentElevation,
    isTerrainLocked,
    selectedUnitIds,
    setSelectedUnitIds
  } = useStore();

  const [selectionBox, setSelectionBox] = useState<{ start: Position; current: Position } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0 || !isTerrainLocked) return; // Only left click and when terrain is locked
    
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom
    };
    
    setSelectionBox({ start: position, current: position });
    setIsDragging(true);
  }, [zoom, isTerrainLocked]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectionBox) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom
    };
    
    setSelectionBox(prev => prev ? { ...prev, current: position } : null);
  }, [isDragging, selectionBox, zoom]);

  const handleMouseUp = useCallback(() => {
    if (selectionBox) {
      // Select units within the selection box
      const selectedUnits = units.filter(unit => {
        const left = Math.min(selectionBox.start.x, selectionBox.current.x);
        const right = Math.max(selectionBox.start.x, selectionBox.current.x);
        const top = Math.min(selectionBox.start.y, selectionBox.current.y);
        const bottom = Math.max(selectionBox.start.y, selectionBox.current.y);

        return (
          unit.position.x >= left &&
          unit.position.x <= right &&
          unit.position.y >= top &&
          unit.position.y <= bottom
        );
      });

      setSelectedUnitIds(selectedUnits.map(u => u.id));
    }

    setSelectionBox(null);
    setIsDragging(false);
  }, [selectionBox, units, setSelectedUnitIds]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id as string;
    
    const unit = units.find(u => u.id === id);
    const structure = structures.find(s => s.id === id);
    const terrainTile = terrain.find(t => t.id === id);
    
    if (unit) {
      updateUnitPosition(id, {
        x: unit.position.x + delta.x,
        y: unit.position.y + delta.y,
      });
    } else if (structure) {
      updateStructurePosition(id, {
        x: structure.position.x + delta.x,
        y: structure.position.y + delta.y,
      });
    } else if (terrainTile && !isTerrainLocked) {
      updateTerrainPosition(id, {
        x: terrainTile.position.x + delta.x,
        y: terrainTile.position.y + delta.y,
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div 
        className="relative w-full h-screen overflow-hidden bg-gray-100"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="absolute inset-0"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center'
          }}
        >
          <Grid />
          {terrain
            .filter(t => t.elevation === currentElevation)
            .map((tile) => (
              <TerrainTile 
                key={tile.id} 
                terrain={tile} 
                locked={isTerrainLocked}
              />
            ))}
          {structures
            .filter(s => s.elevation === currentElevation)
            .map((structure) => (
              <Structure key={structure.id} structure={structure} />
            ))}
          {units
            .filter(u => u.position.y === currentElevation)
            .map((unit) => (
              <Unit 
                key={unit.id} 
                unit={unit}
                selected={selectedUnitIds.includes(unit.id)}
                locked={false}
              />
            ))}
          {selectionBox && <SelectionBox selection={selectionBox} />}
        </div>
      </div>
    </DndContext>
  );
};