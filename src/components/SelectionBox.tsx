import React from 'react';
import { SelectionBox as SelectionBoxType } from '../types';

interface Props {
  selection: SelectionBoxType;
}

export const SelectionBox: React.FC<Props> = ({ selection }) => {
  const left = Math.min(selection.start.x, selection.current.x);
  const top = Math.min(selection.start.y, selection.current.y);
  const width = Math.abs(selection.current.x - selection.start.x);
  const height = Math.abs(selection.current.y - selection.start.y);

  return (
    <div
      className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-10 pointer-events-none"
      style={{
        left,
        top,
        width,
        height,
      }}
    />
  );
};