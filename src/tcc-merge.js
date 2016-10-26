#!/usr/bin/env node

var program = require('commander');
var Git = require('nodegit');

program
    // .option('-f, --force', 'force installation')
    .parse(process.argv);


console.log("Going to merge..");

var pkgs = program.args;


/*
 * ToDo:
 *  > Search for tcc-config.json in running folder
 *       > abort if none
 *  > Check for uncommitted changes
 *  > remove solutions? (since they are invalid anyway, prevent mistakes even if zip is extra task)
 *  > checkout first branch
 *  > merge..
 *  > ask for push
 *  > ask for zip
 *
 * */