#!/usr/bin/env node

import { tccCliMerge } from "./tcc-merge";
import { tccCliExport } from "./tcc-export";

var winston = require("winston");
winston.cli();

var commander = require("commander");
var pkg = require("../package.json");

commander
    .version(pkg.version)
    .option('--debug', 'print debug messages');

commander
    .command('merge')
    .alias('m')
    .action(tccCliMerge);

commander
    .command('export')
    .alias('e')
    .action(tccCliExport);

commander
    .parse(process.argv);

if (commander.debug) {
  winston.level = 'debug';
}
