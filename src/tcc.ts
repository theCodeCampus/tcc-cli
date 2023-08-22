#!/usr/bin/env node

import { registerMergeCommand } from "./tcc-merge";
import { registerExportCommand } from "./tcc-export";
import { registerPullCommand } from "./tcc-pull";
import { registerPushCommand } from "./tcc-push";
import { registerDeleteCommand } from "./tcc-delete";
import { registerBuildCommand } from "./tcc-build";
import { registerGitExportCommand } from './tcc-git-export';
import {registerCreateCommand} from "./tcc-create";
import {registerChangePrefixCommand} from "./tcc-change-prefix";

var commander = require("commander");
var pkg = require("../package.json");

commander
    .description(`
  Reads configuration from tcc-cli-config.js and runs the command on the configured branches.
  CLI will checkout the first branch configured in the config file and then reload the config.`)
    .version(pkg.version);

registerMergeCommand(commander);
registerExportCommand(commander);
registerPullCommand(commander);
registerPushCommand(commander);
registerDeleteCommand(commander);
registerBuildCommand(commander);
registerGitExportCommand(commander);
registerCreateCommand(commander);
registerChangePrefixCommand(commander);

commander
    .parse(process.argv);
