import { create } from 'zustand';
import { UnitSlice, createUnitSlice } from './slices/unitSlice';
import { TerrainSlice, createTerrainSlice } from './slices/terrainSlice';
import { UISlice, createUISlice } from './slices/uiSlice';
import { StructureSlice, createStructureSlice } from './slices/structureSlice';

export const useStore = create<UnitSlice & TerrainSlice & UISlice & StructureSlice>()((...args) => ({
  ...createUnitSlice(...args),
  ...createTerrainSlice(...args),
  ...createUISlice(...args),
  ...createStructureSlice(...args),
}));