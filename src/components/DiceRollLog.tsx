import React from 'react';
import { useStore } from '../store/useStore';

export const DiceRollLog: React.FC = () => {
  const selectedCharacterId = useStore(state => state.selectedCharacterId);
  const characters = useStore(state => state.characters);
  const diceRolls = useStore(state => state.diceRolls);
  const rollD100 = useStore(state => state.rollD100);
  const clearDiceRolls = useStore(state => state.clearDiceRolls);

  if (!selectedCharacterId) return null;

  const selectedCharacter = characters.find(c => c.id === selectedCharacterId);
  if (!selectedCharacter) return null;

  return (
    <div className="fixed bottom-0 left-0 p-4 bg-white shadow-lg rounded-tr-lg max-w-xs">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Dice Rolls for {selectedCharacter.name}</h3>
          <button
            onClick={() => rollD100(selectedCharacter.name)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Roll d100
          </button>
        </div>
        
        <div className="max-h-60 overflow-y-auto space-y-2">
          {diceRolls.map((roll, index) => (
            <div key={roll.timestamp} className="flex justify-between items-center text-sm">
              <span>{roll.characterLabel}:</span>
              <span className="font-bold">{roll.result}</span>
            </div>
          ))}
        </div>

        {diceRolls.length > 0 && (
          <button
            onClick={clearDiceRolls}
            className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Roll History
          </button>
        )}
      </div>
    </div>
  );
};