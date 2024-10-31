import { StateCreator } from 'zustand';
import { Unit, Position } from '../../types';

export interface UnitSlice {
  units: Unit[];
  addUnit: (unit: Unit) => void;
  removeUnit: (id: string) => void;
  updateUnitPosition: (id: string, position: Position) => void;
  updateUnitRotation: (id: string, rotation: number) => void;
  clearUnits: () => void;
}

export const createUnitSlice: StateCreator<UnitSlice> = (set) => ({
  units: [],
  
  addUnit: (unit) => set((state) => {
    console.log('Adding unit:', unit);
    return { units: [...state.units, unit] };
  }),

  removeUnit: (id) => set((state) => ({ 
    units: state.units.filter(u => u.id !== id) 
  })),

  updateUnitPosition: (id, position) => set((state) => ({
    units: state.units.map(unit =>
      unit.id === id ? { ...unit, position } : unit
    )
  })),

  updateUnitRotation: (id, rotation) => set((state) => ({
    units: state.units.map(unit =>
      unit.id === id ? { ...unit, rotation } : unit
    )
  })),

  clearUnits: () => set({ units: [] }),
});