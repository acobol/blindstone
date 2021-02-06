import { IpcRendererEvent, Point, ipcRenderer, contextBridge } from "electron";
import { Action } from "../sharedTypes/sharedTypes";

contextBridge.exposeInMainWorld("ipcRenderer", {
  moveFocus: (data: Point) => {
    ipcRenderer.send("Focus", data);
  },
  click: (data: Point) => {
    ipcRenderer.send("Click", data);
  },
  listenParse: (callback: (action: Action) => void) => {
    ipcRenderer.on("Action", (event: IpcRendererEvent, args: Action) => {
      callback(args);
    });
  }
});
