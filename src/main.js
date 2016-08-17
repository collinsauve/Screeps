global.util = require('util');
global.constants = require('core.constants');
global.linq = require('core.linq');
global.roles = require('roles');
global.logFactory = require('core.logFactory');

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
        'harvester', 'harvester', 'harvester', 
        'guard', 'healer', 'builder',
        'guard', 'healer', 'archer', 'harvester', 'harvester', 'harvester',
        'guard', 'healer', 'archer',
        'guard', 'healer', 'archer',
        'guard', 'guard'
    ]
    //infinite: 'archer'
};

roleExecutor();
creepFactory(spawn, buildInstructions);