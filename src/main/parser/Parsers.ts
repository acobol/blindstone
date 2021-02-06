import { AbstractParser } from './Parser';
import Reporter from '../log_handling/Reporter';
import { Screens } from '../../sharedTypes/screensEnum';

export class BasicParser extends AbstractParser {
  constructor(endOfBlock?: string, reporter?: Reporter) {
    super(endOfBlock, reporter);
  }
  parse(text: string): void {
    let lines = text.split(this.endOfBlock);
    lines = lines.filter((value: string) => value !== '');
    for (const line of lines) {
      this.reporter.report(line);
    }
  }
}

export class ScreenParser extends AbstractParser {
  static modeRegexp = /.* prevMode=\w+ currMode=(\w+)/g;
  constructor(endOfBlock?: string, reporter?: Reporter) {
    super(endOfBlock, reporter);
  }

  parse(text: string): void {
    let lines = text.split(this.endOfBlock);
    lines = lines.filter((value: string) => value !== '');
    for (const line of lines) {
      const result = ScreenParser.modeRegexp.exec(line);
      if(result) {
        const screen = Screens[result[1] as keyof typeof Screens];
        const action = {
          type: "CHANGE_SCREEN",
          data: screen
        }
        this.reporter.report(action);
      }
    }
  }
}