import './App.css';
import WordRow from './WordRow';
import React, { useState } from 'react';
import { useStore } from './store';
import { LETTER_LENGTH } from './word-utils';

const GUESS_LENGTH = 6;
export default function App() {
const state = useStore() ;
const [guess, setGuess] = useState('');

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newGuess = e.target.value;

  if (newGuess.length === LETTER_LENGTH) {
    state.addGuess(newGuess);
    setGuess('');
    return;
  }
  setGuess(newGuess);
}

let rows = [...state.guesses];
console.log(rows);
if (rows.length < GUESS_LENGTH ) {
  rows.push(guess);
}

const numGuessesRemaining = GUESS_LENGTH - rows.length;

rows = rows.concat(Array(numGuessesRemaining).fill(''));


return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-6xl text-center p-3">Lukedle</h1>

        <div>
          <input
            type="text"
            className="w-full p-2 border-2 border-blue-500"
            value={guess}
            onChange={onChange}
          />
        </div>
      </header>

      <main className="grid grid-rows-6 gap-2">
          {rows.map((word, index) => (
            <WordRow key={index} letters={word}/>
          ))}
      </main>
    </div>
  );
}