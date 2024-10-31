import { StateCreator } from 'zustand';
import { Structure, Position } from '../../types';

export interface StructureSlice {
  structures: Structure[];
  selectedStructureId: string | null;
  addStructure: (structure: Structure) => void;
  removeStructure: (id: string) => void;
  updateStructurePosition: (id: string, position: Position) => void;
  updateStructureRotation: (id: string, rotation: number) => void;
  updateStructureLabel: (id: string, label: string) => void;
  setSelectedStructureId: (id: string | null) => void;
  clearStructures: () => void;
}

export const createStructureSlice: StateCreator<StructureSlice> = (set) => ({
  structures: [],
  selectedStructureId: null,
  
  addStructure: (structure) => set((state) => {
    console.log('Adding structure:', structure);
    return { structures: [...state.structures, structure] };
  }),

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

  updateStructureLabel: (id, label) => set((state) => ({
    structures: state.structures.map(structure =>
      structure.id === id ? { ...structure, label } : structure
    )
  })),

  setSelectedStructureId: (id) => set({ selectedStructureId: id }),

  clearStructures: () => set({ structures: [], selectedStructureId: null }),
});