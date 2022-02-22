import './App.css';
import WordRow from './WordRow';

export default function App() {

  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-3">
        <h1 className="text-6xl text-center">Lukedle</h1>
      </header>

      <main>
        <WordRow letters="Hello" />
        <WordRow letters="Hello" />
        <WordRow letters="Hello" />
        <WordRow letters="Hello" />
        <WordRow letters="Hello" />
      </main>
    </div>
  );
}