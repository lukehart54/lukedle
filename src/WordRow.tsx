import { LetterState, LETTER_LENGTH } from './word-utils';

interface WordRowProps {
  letters: string;
  result?: LetterState[];
  className?: string;
}

export default function WordRow({
  letters: lettersProp = '',
  result = [],
  className = ''
}: WordRowProps) {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split('')
    .concat(Array(lettersRemaining).fill('')); 

  return (
    <div className={`grid grid-cols-5 gap-2 p-2 ${className}`}>
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={result[index]} />
      ))}
    </div>
  );
}
interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}

function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles = state == null ? '' : characterStateStyles[state];
  return (
    <div
      className={`inline-block border-2 dark:border-slate-50 border-gray-500 p-4 
      uppercase font-bold dark:text-white text-center before:inline-block before:content:['_'] ${stateStyles}`}
    >
      {value}
    </div>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: 'bg-grey-500 dark:bg-mygrey',
  [LetterState.Present]: 'bg-yellow-500',
  [LetterState.Match]: 'bg-green-500 dark:bg-dark-green',
};
