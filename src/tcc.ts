#!/usr/bin/env node

import { tccCliMerge } from "./tcc-merge";
import { tccCliExport } from "./tcc-export";

var winston = require("winston");
winston.cli();

var commander = require("commander");
var pkg = require("../package.json");

commander
    .version(pkg.version)
    .option('--debug', 'print debug messages')
    .command('merge', 'merge branches').alias('m').action(tccCliMerge)
    .command('export ', 'export branches').alias('z').action(tccCliExport)
    .parse(process.argv);

if (commander.debug) {
  winston.level = 'debug';
}
