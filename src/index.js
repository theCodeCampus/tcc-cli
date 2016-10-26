#!/usr/bin/env node
var commander = require("commander");

commander
    .version('0.0.1')
    .command('merge', 'merge branches').alias('m')
    .command('zip ', 'create zip').alias('z')
    .parse(process.argv);
