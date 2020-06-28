import path from "path";
import fs from "fs";
import readline from "readline";

interface ConfigObject {
  [key: string]: string;
}

interface Config {
  [key: string]: ConfigObject;
}

const REQUIRED_CONFIGS = ["Power"];
const REQUIRED_VALUES: ConfigObject = {
  LogLevel: "1",
  FilePrinting: "true"
};
const DEFAULT_CONFIG_VALUES: ConfigObject = {
  LogLevel: "1",
  FilePrinting: "true",
  ConsolePrinting: "false",
  ScreenPrinting: "false",
  Verbose: "false"
};

const appLocalDir = process.env.LOCALAPPDATA || "";
const configFilePath = path.join(
  appLocalDir,
  "Blizzard",
  "Hearthstone",
  "log.config"
);

/**
 * Required as readline createInterface doesnt register to readStream error
 * so its not posible to catch when the file doesnt exist or cant be opened
 * https://github.com/nodejs/node/issues/30831
 * https://stackoverflow.com/questions/59216364/how-to-handle-error-from-fs-readline-interface-async-iterator
 */
const createSafeReadeableStream = (): Promise<fs.ReadStream> => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(configFilePath);
    readStream.on("open", () => {
      resolve(readStream);
    });
    readStream.on("error", reject);
  });
};

const readConfig = async (): Promise<Config> => {
  const config: Config = {};
  const readStream = await createSafeReadeableStream();
  let currentConfigName = "";

  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.startsWith("[")) {
      const configName = line.replace("[", "").replace("]", "");
      currentConfigName = configName;
      if (!config[configName]) {
        config[configName] = {};
      }
    } else {
      const [property, value] = line.split("=");
      config[currentConfigName][property] = value;
    }
  }

  return config;
};

const updateGameConfig = async (): Promise<void> => {
  const config = await readConfig();
  let modified = false;
  const requiredConfigsProcessed: string[] = [];

  for (const configItemName in config) {
    if (REQUIRED_CONFIGS.includes(configItemName)) {
      requiredConfigsProcessed.push(configItemName);
      for (const property in REQUIRED_VALUES) {
        const configItem = config[configItemName];
        const propertyValue = configItem[property];
        const requiredValue = REQUIRED_VALUES[property];
        if (propertyValue !== requiredValue) {
          configItem[property] = REQUIRED_VALUES[property];
          modified = true;
        }
      }
    }
  }

  for (const configName of REQUIRED_CONFIGS) {
    if (!requiredConfigsProcessed.includes(configName)) {
      config[configName] = DEFAULT_CONFIG_VALUES;
      modified = true;
    }
  }

  if (modified) {
    const writeStream = fs.createWriteStream(configFilePath);

    for (const configItemName in config) {
      const configItem = config[configItemName];
      writeStream.write(`[${configItemName}]\n`);
      for (const property in configItem) {
        const propertyValue = configItem[property];
        writeStream.write(`${property}=${propertyValue}\n`);
      }
    }

    writeStream.close();
  }
};

export default updateGameConfig;
