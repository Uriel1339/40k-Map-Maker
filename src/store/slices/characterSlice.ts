import { StateCreator } from 'zustand';
import { Character } from '../../types/character';
import { Position } from '../../types/common';

export interface DiceRoll {
  characterLabel: string;
  result: number;
  timestamp: number;
}

export interface CharacterSlice {
  characters: Character[];
  selectedCharacterId: string | null;
  diceRolls: DiceRoll[];
  addCharacter: (character: Character) => void;
  updateCharacterPosition: (id: string, position: Position) => void;
  updateCharacterName: (id: string, name: string) => void;
  clearCharacters: () => void;
  setSelectedCharacterId: (id: string | null) => void;
  rollD100: (characterLabel: string) => void;
  clearDiceRolls: () => void;
}

export const createCharacterSlice: StateCreator<CharacterSlice> = (set) => ({
  characters: [],
  selectedCharacterId: null,
  diceRolls: [],
  
  addCharacter: (character) => set((state) => ({
    characters: [...state.characters, character]
  })),

  updateCharacterPosition: (id, position) => set((state) => ({
    characters: state.characters.map(char =>
      char.id === id ? { ...char, position } : char
    )
  })),

  updateCharacterName: (id, name) => set((state) => ({
    characters: state.characters.map(char =>
      char.id === id ? { ...char, name, initial: name.charAt(0).toUpperCase() } : char
    )
  })),

  clearCharacters: () => set({ characters: [], selectedCharacterId: null, diceRolls: [] }),

  setSelectedCharacterId: (id) => set({ selectedCharacterId: id }),

  rollD100: (characterLabel) => set((state) => ({
    diceRolls: [
      {
        characterLabel,
        result: Math.floor(Math.random() * 100) + 1,
        timestamp: Date.now()
      },
      ...state.diceRolls
    ]
  })),

  clearDiceRolls: () => set({ diceRolls: [] })
});