import { Action } from '../../sharedTypes/sharedTypes';
import Reporter from './Reporter';

export class ConsoleReporter implements Reporter {
  report(reportObject: any): void {
    console.log(reportObject);
  }
}

export class FunctionReporter implements Reporter {
  reportFn: (action: Action) => void;
  constructor(fn: (action: Action) => void) {
    this.reportFn = fn;
  }

  report(reportObject: Action): void {
    this.reportFn(reportObject);
  }
}