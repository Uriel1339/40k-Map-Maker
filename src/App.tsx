import React from 'react';
import { Battlefield } from './components/Battlefield';
import { Toolbar } from './components/Toolbar';
import { UnitPanel } from './components/UnitPanel';
import { TerrainPanel } from './components/TerrainPanel';
import { StructurePanel } from './components/StructurePanel';

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Battlefield />
      <Toolbar />
      <UnitPanel />
      <TerrainPanel />
      <StructurePanel />
    </div>
  );
}

export default App;