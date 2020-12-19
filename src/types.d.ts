import { Point } from "electron";

declare global {
  interface Window {
    ipcRenderer: MyIpcRenderer;
  }
}

export interface MyIpcRenderer {
  moveFocus(data: Point): void;
  click(data: Point): void;
  listenParse: (callback: (line: string[]) => void) => void;
}
