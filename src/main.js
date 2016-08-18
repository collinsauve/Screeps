global.util = require('util');
global.linq = require('core.linq');
global.loggerFactory = require('core.loggerFactory');
global.constants = require('core.constants');
global.roles = require('roles');

const roleExecutor = require('roleExecutor');
const spawnFactory = require('spawnFactory');
const creepFactory = require('creepFactory');

const spawn = spawnFactory();
if (spawn === undefined || spawn === null) {
    console.log('Warning: No spawn found');
    return;
}

const buildInstructions = {
    order: [
        'harvester', 'harvester', 'harvester', 'harvester', 'harvester', 'harvester', 
        'builder', 'builder', 'builder', 'builder', 'builder'
    ]
    //infinite: 'archer'
};

roleExecutor();
creepFactory(spawn, buildInstructions);