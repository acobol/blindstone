import Reporter from './Reporter';

export class ConsoleReporter implements Reporter {
  report(reportObject: any): void {
    console.log(reportObject);
  }
}

export class FunctionReporter implements Reporter {
  reportFn: (line: string) => void;
  constructor(fn: (line: string) => void) {
    this.reportFn = fn;
  }

  report(reportObject: any): void {
    this.reportFn(reportObject);
  }
}