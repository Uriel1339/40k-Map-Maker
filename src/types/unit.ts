export type UnitType = 'infantry' | 'vehicle' | 'aircraft' | 'artillery';
export type FactionType = 'ally' | 'enemy' | 'neutral';

export interface Unit {
  id: string;
  name: string;
  type: UnitType;
  faction: FactionType;
  position: Position;
  health: number;
  power: number;
  groupId?: string;
}