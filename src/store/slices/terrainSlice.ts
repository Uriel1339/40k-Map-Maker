import { StateCreator } from 'zustand';
import { TerrainTile, TerrainType, Position } from '../../types';

export interface TerrainSlice {
  terrain: TerrainTile[];
  gridSize: number;
  isTerrainLocked: boolean;
  addTerrain: (terrain: Partial<TerrainTile>) => void;
  removeTerrain: (id: string) => void;
  updateTerrainPosition: (id: string, position: Position) => void;
  setGridSize: (size: number) => void;
  setTerrainLocked: (locked: boolean) => void;
  fillTerrainGrid: (type: TerrainType) => void;
  fillRandomTerrain: () => void;
  clearTerrain: () => void;
}

export const createTerrainSlice: StateCreator<TerrainSlice> = (set) => ({
  terrain: [],
  gridSize: 50,
  isTerrainLocked: false,

  addTerrain: (terrain) => set((state) => {
    const newTerrain: TerrainTile = {
      id: Math.random().toString(36).substr(2, 9),
      type: terrain.type || 'urban',
      position: terrain.position || { x: 0, y: 0 },
      elevation: terrain.elevation || 0
    };
    return { terrain: [...state.terrain, newTerrain] };
  }),

  removeTerrain: (id) => set((state) => ({ 
    terrain: state.terrain.filter(t => t.id !== id) 
  })),

  updateTerrainPosition: (id, position) => set((state) => ({
    terrain: state.terrain.map(terrain =>
      terrain.id === id ? { ...terrain, position } : terrain
    )
  })),

  setGridSize: (size) => set({ gridSize: size }),
  setTerrainLocked: (locked) => set({ isTerrainLocked: locked }),

  fillTerrainGrid: (type) => set((state) => {
    const { gridSize } = state;
    const newTerrain: TerrainTile[] = [];
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const cols = Math.ceil(viewportWidth / gridSize);
    const rows = Math.ceil(viewportHeight / gridSize);
    
    const startX = -(cols * gridSize) / 2;
    const startY = -(rows * gridSize) / 2;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newTerrain.push({
          id: `terrain-${col}-${row}`,
          type,
          position: {
            x: startX + (col * gridSize),
            y: startY + (row * gridSize)
          },
          elevation: 0
        });
      }
    }
    
    return { terrain: newTerrain };
  }),

  fillRandomTerrain: () => set((state) => {
    const terrainTypes: TerrainType[] = ['urban', 'wilderness', 'desert', 'jungle'];
    const { gridSize } = state;
    const newTerrain: TerrainTile[] = [];
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const cols = Math.ceil(viewportWidth / gridSize);
    const rows = Math.ceil(viewportHeight / gridSize);
    
    const startX = -(cols * gridSize) / 2;
    const startY = -(rows * gridSize) / 2;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const randomType = terrainTypes[Math.floor(Math.random() * terrainTypes.length)];
        newTerrain.push({
          id: `terrain-${col}-${row}`,
          type: randomType,
          position: {
            x: startX + (col * gridSize),
            y: startY + (row * gridSize)
          },
          elevation: 0
        });
      }
    }
    
    return { terrain: newTerrain };
  }),

  clearTerrain: () => set({ terrain: [] }),
});