export type StructureType = 'wall' | 'building' | 'ruins' | 'barricade';

export interface Structure {
  id: string;
  type: StructureType;
  position: { x: number; y: number };
  width: number;
  height: number;
  elevation: number;
  rotation: number;
  label?: string;
}