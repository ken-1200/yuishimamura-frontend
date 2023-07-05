import { useState } from 'react';

import reactLogo from './assets/react.svg';

import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8">
        <div>
          <img src="/mountains-1.jpg" alt="" loading="lazy" />
        </div>
        <div className="col-start-3">
          <img src="/mountains-2.jpg" alt="" loading="lazy" />
        </div>
        <div>
          <img src="/mountains-3.jpg" alt="" loading="lazy" />
        </div>
        <div>
          <img src="/mountains-4.jpg" alt="" loading="lazy" />
        </div>
        <div className="row-start-1 col-start-2 col-span-2">
          <img src="/mountains-5.jpg" alt="" loading="lazy" />
        </div>
      </div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
