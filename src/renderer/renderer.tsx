import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import "../public/index.css";

ReactDOM.render(<App />, document.getElementById("app"));
//ReactDOM.render(<div />, document.getElementById('app'));

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
