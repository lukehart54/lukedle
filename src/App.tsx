import { useEffect, useRef, useState } from 'react';
import Keyboard from './Keyboard';
import { useStore, NUMBER_OF_GUESSES, WORD_LENGTH } from './store';
import { isValidWord } from './word-utils';
import WordRow from './WordRow';

export default function App() {
  const state = useStore();
  const [guess, setGuess] = useGuess();
  const [showInvalidGuess, setInvalidGuess] = useState(false);
  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);
  useEffect(() => {
    let id: any;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 500)
    }
    return () => clearTimeout(id)
  }, [showInvalidGuess]);
  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === WORD_LENGTH) {
      if (isValidWord(previousGuess)) {
        addGuess(previousGuess);
        setInvalidGuess(false);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
  }, [guess]);

  const isGameOver = state.gameState !== 'playing';

  let rows = [...state.rows];

  let currRow = 0;
  if (rows.length < NUMBER_OF_GUESSES) {
    currRow = rows.push({ guess }) - 1;
  }

  const guessesRemaining = NUMBER_OF_GUESSES - rows.length;

  rows = rows.concat(Array(guessesRemaining).fill(''));

  return (
    <div className="dark:bg-black">
      <div className="mx-auto w-96 dark:bg-black relative h-screen">
        <header className="border-b border-gray-400 py-4 mb-4">
          <h1 className="text-3xl mb-2 dark:text-white text-center uppercase">
            Lukedle
          </h1>
        </header>

        <main className="grid grid-rows-6">
          {rows.map((word, index) => (
            <WordRow
              key={index}
              letters={word.guess}
              result={word.result}
              className={showInvalidGuess && currRow === index ? 'animate-bounce' : ''}
            />
          ))}
        </main>
        <Keyboard/>

        {isGameOver && (
          <div
            role="modal"
            className="absolute bg-white border border-gray-500 rounded text-center w-3/4 h-1/8 p-6 left-0 right-0 mx-auto top-1/4"
          >
            <p>Game Over</p>
            <p className="uppercase">{state.answer}</p>

            <button
              className="border border-green-500 rounded bg-green-500 p-2 mt-4 text-gray-800 shadow"
              onClick={() => {
                state.newGame();
                setGuess('');
              }}
            >
              New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function useGuess() {
  const guessState = useState('');
  const [guess, setGuess] = guessState;

  const onKeyDown = (e: KeyboardEvent) => {
    setGuess((curGuess) => {
      let letter = e.key;

      const newGuess =
        letter.length === 1 && curGuess.length !== WORD_LENGTH
          ? curGuess + letter
          : curGuess;

      switch (e.key) {
        case 'Backspace':
          return newGuess.slice(0, -1);
        case 'Enter':
          if (newGuess.length === WORD_LENGTH) {
            return '';
          }
      }

      if (newGuess.length === WORD_LENGTH) {
        return newGuess;
      }

      return newGuess;
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return guessState;
}

// source https://usehooks.com/usePrevious/
function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
