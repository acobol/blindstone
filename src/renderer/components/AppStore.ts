import { makeAutoObservable } from "mobx";
import { Action } from "../../sharedTypes/sharedTypes";
import {Screens} from "../../sharedTypes/screensEnum";
import camelCase from "lodash.camelcase";
let id = 0;

type Line = {
  text: string;
  uuid: number;
};

interface GameState {
  lines: Line[];
  screen: Screens;
}


export class AppStore implements GameState{
  lines: Line[] = [];
  screen: Screens = Screens.STARTUP;
  
  constructor() {
    makeAutoObservable(this);
  }

  processAction(action: Action): void {
    const processFn = camelCase(action.type) as Exclude<keyof AppStore, keyof GameState>;
    this[processFn](action.data);
  }

  addLine(line: string): void {
    this.lines.push({ text: line, uuid: ++id });
  }

  addLines(lines: string[]): void {
    this.lines.push(...lines.map((line) => ({ text: line, uuid: ++id })));
  }

  changeScreen(screen: Screens): void {
    this.screen = screen;
  }
}