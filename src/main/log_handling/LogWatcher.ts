import fs, { stat } from "fs";
import path from "path";
import { Parser } from "../parser/Parser";
import { BasicParser } from "../parser/Parsers";
import chokidar from "chokidar";

export default class LogsWatcher {
  name: string;
  filepath: string;
  fileDirectory: string;
  currentFileSize = 0;
  parser: Parser;
  watcher: chokidar.FSWatcher;
  fileExt: string;

  constructor(
    name: string,
    directory: string,
    parser: Parser = new BasicParser(),
    ext: string
  ) {
    this.name = name;
    this.fileExt = ext;
    this.fileDirectory = directory;
    this.filepath = path.join(this.fileDirectory, `/${this.name}.${this.fileExt}`);
    this.parser = parser;
    const ignoredFilesGlob = `!${name}.${this.fileExt}`;
    this.watcher = chokidar.watch(directory, { ignored: ignoredFilesGlob });
  }

  start(): void {
    console.log(`Start watching: ${this.filepath}`);
    if (fs.existsSync(this.filepath)) {
      console.log("File found");
      this.currentFileSize = fs.statSync(this.filepath).size;
      this.watcher.close().then(() => {
        this.startFileWatch();
      });
    } else {
      console.log(`File not found, start watching directory: ${this.fileDirectory}`);
      this.watcher.on("add", () => {
        this.watcher.close().then(() => {
          this.startFileWatch();
        });
      });
    }
  }

  private startFileWatch(): void {
    console.log(`Start watching file: ${this.filepath}`);
    this.watcher = chokidar.watch(this.filepath, {useFsEvents: false});
    this.watcher.on("change", () => {
      const newFileSize = fs.statSync(this.filepath).size;
      let deltaSize = newFileSize - this.currentFileSize;

      if (deltaSize < 0) {
        this.currentFileSize = 0;
        deltaSize = newFileSize;
      }

      const buffer = Buffer.alloc(deltaSize);

      const fileDescriptor = fs.openSync(this.filepath, "r");
      fs.readSync(fileDescriptor, buffer, 0, deltaSize, this.currentFileSize);
      fs.closeSync(fileDescriptor);

      this.currentFileSize = newFileSize;

      const logString = buffer.toString();
      this.parser.parse(logString);
    });
  }

  stop(): Promise<void> {
    return this.watcher.close();
  }
}
