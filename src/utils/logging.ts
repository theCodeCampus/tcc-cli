import { Command } from "commander";

const winston = require("winston");

export const logger = winston;
logger.cli();

export function setLogLevel(options: any): void {
  if (options.verbose === true) {
    logger.level = 'silly';
  }
  else if (options.quiet === true) {
    logger.level = 'warn';
  }
  else {
    logger.level = options.logLevel;
  }
}

export function addLoggingOption(command: Command): void {
  command
    .option('--log-level <level>', 'print log messages of given level and above only', 'info')
    .option('--verbose', 'set log level to debug')
    .option('--quiet', 'set log level to warn');
}