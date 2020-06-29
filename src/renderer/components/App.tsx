import { hot } from "react-hot-loader";
import React from "react";

const App = (): JSX.Element => {
  return (
    <div>
      <h1>MAIN MENU</h1>
      <nav>
        <button>Jugar</button>
        <button>Aventuras</button>
        <button>Pelea de taberna</button>
        <button>Modos</button>
      </nav>
    </div>
  );
};
export default hot(module)(App);
