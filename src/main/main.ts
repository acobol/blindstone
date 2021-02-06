import { app, BrowserWindow, Menu, ipcMain, Point } from "electron";
import path from "path";
import updateGameConfig from "./log_handling/configHandler";
//import {
  //getGameWindowHandle,
  //moveCursorR,
  //clickR,
  //focusWindow
//} from "../packages/interaction_api/interactionapi";
import LogWatcher from "./log_handling/LogWatcher";
import { ConsoleReporter, FunctionReporter } from "./log_handling/Reporters";
import { BasicParser, ScreenParser } from "./parser/Parsers";
import os from 'os';
import { Action } from "../sharedTypes/sharedTypes";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const logWatchers: Array<LogWatcher> = [];

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = async (): Promise<void> => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    //fullscreen: true,
    alwaysOnTop: true,
    transparent: true,
    thickFrame: false,
    //skipTaskbar: true,
    frame: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true
    }
  });
  mainWindow.setIgnoreMouseEvents(true);

  Menu.setApplicationMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  try {
    await updateGameConfig();
  } catch (error) {
    console.log("An error ocurred trying to update config file: \n %o", error);
  }
  //const gameWindowHandle = getGameWindowHandle("Hearthstone");
  const appHandle = mainWindow.getNativeWindowHandle();

  
  //TODO add heartstone module entry path find to interaction api
  //const logsPath = path.join("C:/Program Files (x86)/Hearthstone/logs");
  const logsPath = path.join('/Applications', 'Hearthstone', 'Logs');
  const sendFn = (action: Action): void => {
    mainWindow.webContents.send("Action", action);
  };
  const reporter = new FunctionReporter(sendFn);
  //const reporter = new ConsoleReporter();
  const parser = new ScreenParser(os.EOL, reporter);

  const testWatcher = new LogWatcher("LoadingScreen", logsPath, parser, "log");
  logWatchers.push(testWatcher);

  testWatcher.start();

  ipcMain.on("Focus", (event, data: Point) => {
    //moveCursorR(gameWindowHandle, data.x, data.y);
  });
  ipcMain.on("Click", (event, data: Point) => {
    //focusWindow(gameWindowHandle);
    //clickR(gameWindowHandle, data.x, data.y);
    //focusWindow(appHandle);
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  logWatchers.forEach((watcher) => {
    watcher.stop();
  });
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
