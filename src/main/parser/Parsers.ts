import { AbstractParser } from './Parser';
import Reporter from '../log_handling/Reporter';
let linesNum = 0;

export class BasicParser extends AbstractParser {
  constructor(endOfBlock?: string, reporter?: Reporter) {
    super(endOfBlock, reporter);
  }
  parse(text: string): void {
    let lines = text.split(this.endOfBlock);
    lines = lines.filter((value: string) => value !== '');
    linesNum += lines.length;
    console.log(linesNum);
    for (const line of lines) {
      this.reporter.report(line);
    }
  }
}