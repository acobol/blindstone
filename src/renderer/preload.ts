import { Point } from "electron";

/* eslint-disable @typescript-eslint/no-var-requires */
const {ipcRenderer, contextBridge, Point} = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', {
  moveFocus: (data: Point) => {
    ipcRenderer.send("Focus", data);
  },
  click: (data: Point) => {
    ipcRenderer.send("Click", data);
  }
});