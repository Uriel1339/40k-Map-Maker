import { StateCreator } from 'zustand';
import { Unit, UnitType, FactionType, Position } from '../../types';

export interface UnitSlice {
  units: Unit[];
  selectedUnitIds: string[];
  addUnit: (unit: Unit) => void;
  removeUnit: (id: string) => void;
  updateUnitPosition: (id: string, position: Position) => void;
  clearAllUnits: () => void;
  clearUnitsByType: (type: UnitType) => void;
  clearUnitsByFaction: (faction: FactionType) => void;
  clearUnitsByTypeAndFaction: (type: UnitType, faction: FactionType) => void;
  setSelectedUnitIds: (ids: string[]) => void;
  updateUnitsElevation: (ids: string[], elevation: number) => void;
}

export const createUnitSlice: StateCreator<UnitSlice> = (set) => ({
  units: [],
  selectedUnitIds: [],
  
  addUnit: (unit) => set((state) => ({ 
    units: [...state.units, unit] 
  })),

  removeUnit: (id) => set((state) => ({ 
    units: state.units.filter(unit => unit.id !== id),
    selectedUnitIds: state.selectedUnitIds.filter(selectedId => selectedId !== id)
  })),

  updateUnitPosition: (id, position) => set((state) => ({
    units: state.units.map(unit => 
      unit.id === id ? { ...unit, position } : unit
    )
  })),

  clearAllUnits: () => set({ units: [], selectedUnitIds: [] }),

  clearUnitsByType: (type) => set((state) => ({
    units: state.units.filter(unit => unit.type !== type),
    selectedUnitIds: state.selectedUnitIds.filter(id => 
      !state.units.find(u => u.id === id && u.type === type)
    )
  })),

  clearUnitsByFaction: (faction) => set((state) => ({
    units: state.units.filter(unit => unit.faction !== faction),
    selectedUnitIds: state.selectedUnitIds.filter(id => 
      !state.units.find(u => u.id === id && u.faction === faction)
    )
  })),

  clearUnitsByTypeAndFaction: (type, faction) => set((state) => ({
    units: state.units.filter(unit => !(unit.type === type && unit.faction === faction)),
    selectedUnitIds: state.selectedUnitIds.filter(id => 
      !state.units.find(u => u.id === id && u.type === type && u.faction === faction)
    )
  })),

  setSelectedUnitIds: (ids) => set({ selectedUnitIds: ids }),

  updateUnitsElevation: (ids, elevation) => set((state) => ({
    units: state.units.map(unit => 
      ids.includes(unit.id) ? { ...unit, position: { ...unit.position, y: elevation } } : unit
    )
  })),
});