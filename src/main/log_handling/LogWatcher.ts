import fs from 'fs';
import {Parser} from '../parser/Parser';
import { BasicParser } from '../parser/Parsers';

export default class LogsWatcher {
  name: string;
  filepath: string;
  currentFileSize = 0;
  parser: Parser;

  constructor(name: string, path: string, parser: Parser = new BasicParser()) {
    this.name = name;
    this.filepath = path;
    this.parser = parser;
  }

  start(): void {
    //TODO add missing file handle
    this.currentFileSize = fs.statSync(this.filepath).size;
    fs.watchFile(this.filepath, (current, previous) => {
      if (current.mtime <= previous.mtime) return;
      
      const newFileSize = fs.statSync(this.filepath).size;
      let deltaSize = newFileSize - this.currentFileSize;

      if (deltaSize < 0 ) {
        this.currentFileSize = 0;
        deltaSize = newFileSize;
      }

      const buffer = Buffer.alloc(deltaSize);

      const fileDescriptor = fs.openSync(this.filepath, 'r');
      fs.readSync(fileDescriptor, buffer, 0, deltaSize, this.currentFileSize);
      fs.closeSync(fileDescriptor);

      this.currentFileSize = newFileSize;

      const logString = buffer.toString();
      this.parser.parse(logString);
    })
  }

  stop(): void {
    fs.unwatchFile(this.filepath);
  }
}