import { Point } from "electron";
import { Action } from "./sharedTypes/sharedTypes";

declare global {
  interface Window {
    ipcRenderer: MyIpcRenderer;
  }
}

export interface MyIpcRenderer {
  moveFocus(data: Point): void;
  click(data: Point): void;
  listenParse: (callback: (action: Action) => void) => void;
}
