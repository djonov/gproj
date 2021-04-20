import * as Pino from "pino";

// Pretty print options
const prettyLogOption = {
  prettyPrint: { colorize: true, translateTime: "SYS:standard" },
};

// Build the logger options
const buildOptions = (): Pino.LoggerOptions => {
  let options = {};

  options = Object.assign(options, prettyLogOption);

  return options;
};

// Export the logger
export const logger = Pino(buildOptions());
