global.util = require('util');
global.linq = require('core.linq');
global.loggerFactory = require('core.loggerFactory');
global.constants = require('core.constants');
global.roles = require('roles');
global.creepCommands = require('creepCommands');

const log = global.loggerFactory('main');
const creepExecutor = require('creepExecutor');
const creepSpawner = require('creepSpawner');
const spawnLocator = require('spawnLocator');

const spawn = spawnLocator();
if (spawn === undefined || spawn === null) {
    log.warn(() => 'Warning: No spawn found');
    return;
}

const buildInstructions = {
    order: [
        'harvester', 'harvester', 'harvester', 'harvester', 
        'builder', 'builder', 'builder', 'builder', 'builder'
    ]
    //infinite: 'archer'
};

creepExecutor();
creepSpawner(spawn, buildInstructions);