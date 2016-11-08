#!/usr/bin/env node

import { registerMergeCommand } from "./tcc-merge";
import { registerExportCommand } from "./tcc-export";

var winston = require("winston");
winston.cli();

var commander = require("commander");
var pkg = require("../package.json");

commander
    .version(pkg.version)
    .option('--debug', 'print debug messages');

registerMergeCommand(commander);
registerExportCommand(commander);

commander
    .parse(process.argv);

if (commander.debug) {
  winston.level = 'debug';
}
