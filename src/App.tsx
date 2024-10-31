import React from 'react';
import { Battlefield } from './components/Battlefield';
import { Toolbar } from './components/Toolbar';
import { CharacterPanel } from './components/CharacterPanel';
import { TerrainPanel } from './components/TerrainPanel';
import { StructurePanel } from './components/StructurePanel';
import { DiceRollLog } from './components/DiceRollLog';
import { useStore } from './store/useStore';

const App: React.FC = () => {
  const selectedCharacterId = useStore(state => state.selectedCharacterId);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Battlefield />
      {!selectedCharacterId && (
        <>
          <Toolbar />
          <CharacterPanel />
          <TerrainPanel />
          <StructurePanel />
        </>
      )}
      <DiceRollLog />
    </div>
  );
};

export default App;