import React, { useState, useCallback, useRef } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useStore } from '../store/useStore';
import { Grid } from './Grid';
import { Structure } from './Structure';
import { TerrainTile } from './TerrainTile';
import { Character } from './Character';
import { Position } from '../types/common';

export const Battlefield: React.FC = () => {
  const { 
    structures,
    terrain,
    characters,
    updateStructurePosition,
    updateTerrainPosition,
    updateCharacterPosition,
    zoom,
    currentElevation,
    isTerrainLocked,
    panOffset,
    setPanOffset,
    selectedCharacterId,
    setSelectedCharacterId
  } = useStore();

  const [isPanning, setIsPanning] = useState(false);
  const lastPanPosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.altKey) {
      setIsPanning(true);
      lastPanPosition.current = { x: e.clientX, y: e.clientY };
      return;
    }
    // Deselect character when clicking the battlefield
    if (!e.defaultPrevented) {
      setSelectedCharacterId(null);
    }
  }, [setSelectedCharacterId]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = e.clientX - lastPanPosition.current.x;
      const deltaY = e.clientY - lastPanPosition.current.y;
      setPanOffset({
        x: panOffset.x + deltaX,
        y: panOffset.y + deltaY
      });
      lastPanPosition.current = { x: e.clientX, y: e.clientY };
      return;
    }
  }, [isPanning, panOffset, setPanOffset]);

  const handleMouseUp = useCallback(() => {
    if (isPanning) {
      setIsPanning(false);
    }
  }, [isPanning]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id as string;
    
    const structure = structures.find(s => s.id === id);
    const terrainTile = terrain.find(t => t.id === id);
    const character = characters.find(c => c.id === id);
    
    if (structure) {
      updateStructurePosition(id, {
        x: structure.position.x + delta.x / zoom,
        y: structure.position.y + delta.y / zoom,
      });
    } else if (terrainTile && !isTerrainLocked) {
      updateTerrainPosition(id, {
        x: terrainTile.position.x + delta.x / zoom,
        y: terrainTile.position.y + delta.y / zoom,
      });
    } else if (character) {
      updateCharacterPosition(id, {
        x: character.position.x + delta.x / zoom,
        y: character.position.y + delta.y / zoom,
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
            transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`,
            transformOrigin: 'center',
            cursor: isPanning ? 'grabbing' : 'default'
          }}
        >
          {!selectedCharacterId && <Grid />}
          {!selectedCharacterId && terrain
            .filter(t => t.elevation === currentElevation)
            .map((tile) => (
              <TerrainTile 
                key={tile.id} 
                terrain={tile} 
                locked={isTerrainLocked}
              />
            ))}
          {!selectedCharacterId && structures
            .filter(s => s.elevation === currentElevation)
            .map((structure) => (
              <Structure key={structure.id} structure={structure} />
            ))}
          {characters.map((character) => (
            <Character key={character.id} character={character} />
          ))}
        </div>
      </div>
    </DndContext>
  );
};