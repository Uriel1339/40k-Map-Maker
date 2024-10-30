export type StructureType = 'wall' | 'building' | 'ruins' | 'barricade';

export interface Structure {
  id: string;
  type: StructureType;
  position: Position;
  width: number;
  height: number;
  elevation: number;
  rotation: number;
}