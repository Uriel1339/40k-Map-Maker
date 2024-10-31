export interface Character {
  id: string;
  position: { x: number; y: number };
  size: number;
  faction: 'ally' | 'enemy';
  initial: string;
  name: string;
}