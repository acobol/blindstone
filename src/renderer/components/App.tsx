import { hot } from "react-hot-loader";
import React from "react";
import { Point } from "electron";
import { AppStoreProvider } from "./AppContext";
import DebugConsole from "./DebugConsole";

interface MENU {
  [key: string]: Point;
}

const MENU_POSITIONS: MENU = {
  PLAY: { x: 0.5, y: 0.32 },
  ADVENTURE: { x: 0.5, y: 0.39 },
  TAVERN: { x: 0.5, y: 0.46 },
  MODES: { x: 0.5, y: 0.53 }
};

//Only for visual mode of the aplication
const onFocusMenuButton = (id: string): void => {
  window.ipcRenderer.moveFocus(MENU_POSITIONS[id]);
};

const onActivateButton = (id: string): void => {
  window.ipcRenderer.click(MENU_POSITIONS[id]);
};

const App: React.FC = (): JSX.Element => {
  return (
    <AppStoreProvider>
      <div
        onKeyDown={(event): void => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp")
            console.log(
              `Me muevo ${event.key === "ArrowDown" ? "Abajo" : "Arriba"}`
            );
          else console.log("No me muevo");
        }}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div style={{ flex: "3" }}>
          <h1>MAIN MENU</h1>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            <button
              onFocus={(): void => {
                onFocusMenuButton("PLAY");
              }}
              onKeyDown={(event): void => {
                if (event.key === "Enter" || event.key === " ")
                  onActivateButton("PLAY");
              }}
            >
              Jugar
            </button>
            <button
              onFocus={(): void => {
                onFocusMenuButton("ADVENTURE");
              }}
              onKeyDown={(event): void => {
                if (event.key === "Enter" || event.key === " ")
                  onActivateButton("ADVENTURE");
              }}
            >
              Aventuras
            </button>
            <button
              onFocus={(): void => {
                onFocusMenuButton("TAVERN");
              }}
              onKeyDown={(event): void => {
                if (event.key === "Enter" || event.key === " ")
                  onActivateButton("TAVERN");
              }}
            >
              Pelea de taberna
            </button>
            <button
              onFocus={(): void => {
                onFocusMenuButton("MODES");
              }}
              onKeyDown={(event): void => {
                if (event.key === "Enter" || event.key === " ")
                  onActivateButton("MODES");
              }}
            >
              Modos
            </button>
          </nav>
        </div>
        <DebugConsole />
      </div>
    </AppStoreProvider>
  );
};

export default hot(module)(App);

//export default App;
