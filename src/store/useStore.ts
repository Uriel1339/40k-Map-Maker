import { create } from 'zustand';
import { TerrainSlice, createTerrainSlice } from './slices/terrainSlice';
import { UISlice, createUISlice } from './slices/uiSlice';
import { StructureSlice, createStructureSlice } from './slices/structureSlice';
import { CharacterSlice, createCharacterSlice } from './slices/characterSlice';

export const useStore = create<TerrainSlice & UISlice & StructureSlice & CharacterSlice>()((...args) => ({
  ...createTerrainSlice(...args),
  ...createUISlice(...args),
  ...createStructureSlice(...args),
  ...createCharacterSlice(...args),
}));