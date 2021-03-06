import { useEffect, useRef, useState } from 'react';
import Keyboard, { keyboardKeys } from './Keyboard';
import { useStore, NUMBER_OF_GUESSES, WORD_LENGTH } from './store';
import { isValidWord } from './word-utils';
import WordRow from './WordRow';

export default function App() {
  const state = useStore();
  const [guess, setGuess, addGuessLetter] = useGuess();
  const [showInvalidGuess, setInvalidGuess] = useState(false);
  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);

  let darkMode = false;
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? (darkMode = true)
    : (darkMode = false);
    



  useEffect(() => {
    let id: any;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 500);
    }
    return () => clearTimeout(id);
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
  // stats button clicked boolean
  const [statsClicked, setStatsClicked] = useState(false);

  let rows = [...state.rows];

  let currRow = 0;
  if (rows.length < NUMBER_OF_GUESSES) {
    currRow = rows.push({ guess }) - 1;
  }

  const handleStatsClick = () => {
    setStatsClicked(!statsClicked);
  };

  const guessesRemaining = NUMBER_OF_GUESSES - rows.length;

  rows = rows.concat(Array(guessesRemaining).fill(''));

  return (
    <div className="dark:bg-black">
      <div className="mx-auto w-96 dark:bg-black relative h-screen">
        <header className="grid grid-row-2 place-items-center border-b border-gray-400 py-4 mb-4">
          <h1 className="text-3xl mb-2 dark:text-white text-center uppercase">
            Lukedle
          </h1>
          <button onClick={handleStatsClick}>
            {darkMode ? <img className="w-10 " src="src/images/stat-dark.png" alt="Stat Icon" /> : <img className="w-10 " src="src/images/stat.png" alt="Stat Icon" />}
          </button>
        </header>

        <main className="grid grid-rows-6">
          {rows.map((word, index) => (
            <WordRow
              key={index}
              letters={word.guess}
              result={word.result}
              className={
                showInvalidGuess && currRow === index ? 'animate-bounce' : ''
              }
            />
          ))}
        </main>
        <Keyboard
          onClick={(letter) => {
            addGuessLetter(letter);
          }}
        />

        {statsClicked && (
          <div
            role="modal"
            className="absolute bg-white border border-gray-500 rounded text-center w-3/4 h-1/8 p-6 left-0 right-0 mx-auto top-1/4"
          >
            <div className="">
              <h2>Statistics</h2>
              <div className="grid grid-cols-2">
                <div className="flex flex-col">
                  <div>{state.gamesPlayed}</div>
                  <div>Games Played</div>
                </div>
                <div className="flex flex-col">
                  <div>{state.score}</div>
                  <div>Games Won</div>
                </div>
                <div className="flex flex-col">
                  <div>
                    {Math.floor((state.score / state.gamesPlayed) * 100)}%
                  </div>
                  <div>Win Percentage</div>
                </div>
                <div className="flex flex-col">
                  <div>{state.currentStreak}</div>
                  <div>Current Streak</div>
                </div>
              </div>
            </div>
          </div>
        )}

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

function useGuess(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] {
  const guessState = useState('');
  const [guess, setGuess] = guessState;

  const addGuessLetter = (letter: string) => {
    setGuess((curGuess) => {
      const newGuess =
        letter.length === 1 && curGuess.length !== WORD_LENGTH
          ? curGuess + letter
          : curGuess;

      switch (letter) {
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

  const onKeyDown = (e: KeyboardEvent) => {
    setGuess((curGuess) => {
      let letter = e.key;

      const newGuess =
        letter.length === 1 &&
        exists(keyboardKeys, letter) &&
        curGuess.length !== WORD_LENGTH
          ? curGuess + letter
          : curGuess;

      switch (letter) {
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

  return [guess, setGuess, addGuessLetter];
}

// stolen from https://usehooks.com/usePrevious/
function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function exists(arr: String[][], search: String): boolean {
  return arr.some((row) => row.includes(search));
}
