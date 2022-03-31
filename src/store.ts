import create from 'zustand';
import { persist } from 'zustand/middleware';
import { computeGuess, getRandomWord, LetterState } from './word-utils';
export const NUMBER_OF_GUESSES = 6;
export const WORD_LENGTH = 6;

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  rows: GuessRow[];
  gameState: 'playing' | 'won' | 'lost';
  addGuess: (guess: string) => void;
  newGame: () => void;
  keyboardLetterState: { [letter: string]: LetterState};
  score: number;
  gamesPlayed: number;
  currentStreak: number;
}

export const useStore = create<StoreState>(
  persist(
    (set, get) => ({
      currentStreak: 0,
      gamesPlayed: 0,
      score: 0,
      answer: getRandomWord(),
      rows: [],
      keyboardLetterState: {},
      gameState: 'playing',
      addGuess: (guess: string) => {
        const result = computeGuess(guess, get().answer);

        const didWin = result.every((i) => i === LetterState.Match);
        const rows = [
          ...get().rows,
          {
            guess,
            result,
          },
        ];

        const keyboardLetterState = get().keyboardLetterState;
        result.forEach((r, index) => {
          const resultGuessLetter = guess[index];
          const currentLetterState = keyboardLetterState[resultGuessLetter]

          switch(currentLetterState) {
            case LetterState.Match:
              break;
            case LetterState.Present:
              if (r === LetterState.Miss) {
                break;
              }
            default:
              keyboardLetterState[resultGuessLetter] = r;
              break;
          }
        })

        set(() => ({
          rows,
          keyboardLetterState,
          currentStreak: didWin ? get().currentStreak + 1 : 0,
          score: didWin ? get().score + 1 : get().score,
          gameState: didWin
            ? 'won'
            : rows.length === NUMBER_OF_GUESSES
            ? 'lost'
            : 'playing',
        }));
      },
      newGame: () => {
        set({
          gamesPlayed: get().gamesPlayed + 1,
          answer: getRandomWord(),
          rows: [],
          gameState: 'playing',
          keyboardLetterState: {},
        });
      },
    }),
    {
      name: 'lukedle', // unique name
    }
  )
);

// useStore.persist.clearStorage();
