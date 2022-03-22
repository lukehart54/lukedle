import { useStore } from './store';
import { LetterState } from './word-utils';

export default function Keyboard({
  onClick: onClickProp,
}: {
  onClick: (letter: string) => void;
}) {
  const keyboardLetterState = useStore((s) => s.keyboardLetterState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const letter = e.currentTarget.textContent;
    console.log(letter);
    onClickProp(letter!);
  };
  return (
    <div className={`flex flex-col`}>
      {keyboardKeys.map((keyboardRow, rowIndex) => (
        <div key={rowIndex} className="my-2 flex justify-center space-x-1">
          {keyboardRow.map((key, index) => {
            let styles = 'rounded font-bold uppercase flex-1 py-2';

            const letterState = keyStateStyles[keyboardLetterState[key]];

            if (letterState) {
              styles += ' text-white px-1 ' + letterState;
            } else if (key !== '') {
              styles += ' bg-gray-400';
            }

            if (key === '') {
              styles += ' pointer-events-none';
            } else {
              styles += ' px-1';
            }

            return (
              <button key={index} className={styles} onClick={onClick}>
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const keyboardKeys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

const keyStateStyles = {
  [LetterState.Miss]: 'bg-gray-600',
  [LetterState.Present]: 'bg-yellow-500',
  [LetterState.Match]: 'bg-green-500',
};
