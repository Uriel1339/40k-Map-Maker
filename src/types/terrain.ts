export type TerrainType = 'urban' | 'wilderness' | 'desert' | 'jungle';

export interface TerrainTile {
  id: string;
  type: TerrainType;
  position: Position;
  elevation: number;
}