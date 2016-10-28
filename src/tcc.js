#!/usr/bin/env node

var commander = require("commander");
var pkg = require("../package.json");

commander
    .version(pkg.version)
    .command('merge', 'merge branches').alias('m')
    .command('zip ', 'create zip').alias('z')
    .parse(process.argv);
