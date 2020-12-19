import { makeAutoObservable } from "mobx";
let id = 0;

type Line = {
  text: string;
  uuid: number;
};

export class AppStore {
  lines: Line[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  addLine(line: string): void {
    this.lines.push({ text: line, uuid: ++id });
  }
  addLines(lines: string[]): void {
    this.lines.push(...lines.map((line) => ({ text: line, uuid: ++id })));
  }
}
