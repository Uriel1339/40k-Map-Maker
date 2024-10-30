import { StateCreator } from 'zustand';
import { TerrainTile, TerrainType, Position } from '../../types';

export interface TerrainSlice {
  terrain: TerrainTile[];
  gridSize: number;
  isTerrainLocked: boolean;
  addTerrain: (terrain: TerrainTile) => void;
  removeTerrain: (id: string) => void;
  updateTerrainPosition: (id: string, position: Position) => void;
  setGridSize: (size: number) => void;
  setTerrainLocked: (locked: boolean) => void;
  fillTerrainGrid: (type: TerrainType) => void;
  randomizeTerrainGrid: () => void;
  clearTerrain: () => void;
}

export const createTerrainSlice: StateCreator<TerrainSlice> = (set) => ({
  terrain: [],
  gridSize: 50,
  isTerrainLocked: false,

  addTerrain: (terrain) => set((state) => ({ 
    terrain: [...state.terrain, terrain] 
  })),

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
    
    // Calculate grid dimensions based on viewport
    const cols = Math.ceil(window.innerWidth / gridSize);
    const rows = Math.ceil(window.innerHeight / gridSize);
    
    // Calculate offset to center the grid
    const offsetX = -(cols * gridSize) / 2;
    const offsetY = -(rows * gridSize) / 2;
    
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        newTerrain.push({
          id: `terrain-${x}-${y}`,
          type,
          position: {
            x: offsetX + (x * gridSize),
            y: offsetY + (y * gridSize)
          },
          elevation: 0
        });
      }
    }
    
    return { terrain: newTerrain };
  }),

  randomizeTerrainGrid: () => set((state) => {
    const terrainTypes: TerrainType[] = ['urban', 'wilderness', 'desert', 'jungle'];
    const { gridSize } = state;
    const newTerrain: TerrainTile[] = [];
    
    const cols = Math.ceil(window.innerWidth / gridSize);
    const rows = Math.ceil(window.innerHeight / gridSize);
    
    const offsetX = -(cols * gridSize) / 2;
    const offsetY = -(rows * gridSize) / 2;
    
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const randomType = terrainTypes[Math.floor(Math.random() * terrainTypes.length)];
        newTerrain.push({
          id: `terrain-${x}-${y}`,
          type: randomType,
          position: {
            x: offsetX + (x * gridSize),
            y: offsetY + (y * gridSize)
          },
          elevation: 0
        });
      }
    }
    
    return { terrain: newTerrain };
  }),

  clearTerrain: () => set({ terrain: [] }),
});