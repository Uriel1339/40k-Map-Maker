export interface Unit {
  id: string;
  type: 'wall' | 'building' | 'character';
  position: { x: number; y: number };
  width: number;
  height: number;
  elevation: number;
  rotation: number;
  faction: 'ally' | 'enemy';
}