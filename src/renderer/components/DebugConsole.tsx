import React from "react";
import { observer } from "mobx-react-lite";
import { AppContext } from "./AppContext";

const DebugConsole: React.FC = observer(
  (): JSX.Element => {
    const appStore = React.useContext(AppContext);
    React.useLayoutEffect(() => {
      const debugConsole = document.getElementById("console");
      debugConsole?.scrollTo(0, debugConsole?.scrollHeight);
    });
    console.log(appStore.lines.length);
    return (
      <>
        <div>SCREEN: {appStore.screen}</div>
        <div className="debugConsole" id="console">
          {appStore.lines.map((line) => (
            <p key={line.uuid}>{line.text}</p>
          ))}
        </div>
      </>
    );
  }
);

export default DebugConsole;
