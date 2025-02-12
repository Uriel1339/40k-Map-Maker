import { StateCreator } from 'zustand';

export interface UISlice {
  gridVisible: boolean;
  activeLayer: 'terrain' | 'units' | 'vehicles' | 'all';
  zoom: number;
  currentElevation: number;
  panOffset: { x: number; y: number };
  toggleGrid: () => void;
  setActiveLayer: (layer: 'terrain' | 'units' | 'vehicles' | 'all') => void;
  setZoom: (zoom: number) => void;
  setCurrentElevation: (elevation: number) => void;
  setPanOffset: (offset: { x: number; y: number }) => void;
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
  gridVisible: true,
  activeLayer: 'all',
  zoom: 1,
  currentElevation: 0,
  panOffset: { x: 0, y: 0 },

  toggleGrid: () => set((state) => ({ 
    gridVisible: !state.gridVisible 
  })),
  
  setActiveLayer: (layer) => set({ activeLayer: layer }),
  setZoom: (zoom) => set({ zoom }),
  setCurrentElevation: (elevation) => set({ currentElevation: elevation }),
  setPanOffset: (offset) => set({ panOffset: offset }),
});