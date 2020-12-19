import os from 'os';
import Reporter from '../log_handling/Reporter';
import { ConsoleReporter } from '../log_handling/Reporters';

export interface Parser {
  parse(lines: string): void;
}

export abstract class AbstractParser implements Parser{
  endOfBlock: string;
  reporter: Reporter;

  constructor(endOfBlock: string = os.EOL, reporter: Reporter = new ConsoleReporter()) {
    this.endOfBlock = endOfBlock;
    this.reporter = reporter;
  }
  abstract parse(lines: string): void;
}


