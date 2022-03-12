import './App.css';
import WordRow from './WordRow';
import React, { useEffect, useRef, useState } from 'react';
import { GUESS_LENGTH, useStore } from './store';
import { LETTER_LENGTH } from './word-utils';

export default function App() {
  const state = useStore();
  const [guess, setGuess] = useGuess();


  let rows = [...state.rows];
  console.log(rows);
  if (rows.length < GUESS_LENGTH) {
    rows.push({guess});
  }

  const numGuessesRemaining = GUESS_LENGTH - rows.length;

  rows = rows.concat(Array(numGuessesRemaining).fill(''));

  const gameIsOver = state.gameState !== 'playing';

  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-6xl text-center p-3">Lukedle</h1>

        {/* <div>
          <input
            type="text"
            className="w-full p-2 border-2 border-blue-500"
            value={guess}
            onChange={onChange}
            disabled={gameIsOver}
          />
        </div> */}
      </header>

      <main className="grid grid-rows-6 gap-2">
        {rows.map(({guess, result}, index) => (
          <WordRow key={index} letters={guess} result={result} />
        ))}
      </main>

      {gameIsOver && (
        <div
          role="modal"
          className="absolute bg-white 
        left-0 right-0 top-1/4 p-6 w-1/4 mx-auto text-center rounded border border-gray-500"
        >
          Game Over! Word was {state.answer.toUpperCase()}
          <button
            className="border mt-2 w-1/8 border-black bg-black rounded text-white text p-1"
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
  );
}

function useGuess() {
  const addGuess = useStore(s => s.addGuess);
  const [guess, setGuess] = useState('');
  const prevGuess = usePrevious(guess);

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    console.log(letter);
    setGuess((curGuess) => {
      const newGuess = letter.length === 1 ? curGuess + letter : curGuess;

      switch(letter) {
        case 'Backspace':
          return newGuess.slice(0, -1);
        case 'Enter':
          if (newGuess.length === LETTER_LENGTH) {
            addGuess(newGuess);
            return '';
          } else {

          }
      }

      // if(curGuess.length === LETTER_LENGTH) {
      //   return curGuess;
      // }
      useEffect(() => {
        if (guess.length === 0 && prevGuess?.length === LETTER_LENGTH) {
          addGuess(prevGuess);
        }
      }, [guess]);

      return newGuess;
    });
  };
  

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);
  return [guess, setGuess];
}

// source https://usehooks.com/usePrevious/
function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
