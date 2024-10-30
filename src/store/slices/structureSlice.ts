import { StateCreator } from 'zustand';
import { Structure, StructureType, Position } from '../../types';

export interface StructureSlice {
  structures: Structure[];
  addStructure: (structure: Structure) => void;
  removeStructure: (id: string) => void;
  updateStructurePosition: (id: string, position: Position) => void;
  updateStructureRotation: (id: string, rotation: number) => void;
  clearStructures: () => void;
}

export const createStructureSlice: StateCreator<StructureSlice> = (set) => ({
  structures: [],
  
  addStructure: (structure) => set((state) => ({ 
    structures: [...state.structures, structure] 
  })),

  removeStructure: (id) => set((state) => ({ 
    structures: state.structures.filter(s => s.id !== id) 
  })),

  updateStructurePosition: (id, position) => set((state) => ({
    structures: state.structures.map(structure =>
      structure.id === id ? { ...structure, position } : structure
    )
  })),

  updateStructureRotation: (id, rotation) => set((state) => ({
    structures: state.structures.map(structure =>
      structure.id === id ? { ...structure, rotation } : structure
    )
  })),

  clearStructures: () => set({ structures: [] }),
});