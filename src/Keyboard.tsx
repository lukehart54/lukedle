export default function Keyboard() {
  return (
    <div className={`flex flex-col`}>
      {keyboardKeys.map((keyboardRow, rowIndex) => (
        <div key={rowIndex} className="my-2 flex justify-center space-x-1">
          {keyboardRow.map((key, index) => {
            let styles = 'rounded font-bold uppercase flex-1 py-2';

            if (key !== '') {
                styles += ' bg-gray-300'
            }

            return (
              <button key={index} className={styles}>
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
