export interface Position {
  x: number;
  y: number;
}

export interface SelectionBox {
  start: Position;
  current: Position;
}

export type ElevationType = 'ground' | 'first' | 'second' | 'roof';