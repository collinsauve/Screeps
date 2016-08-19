global.util = require('util');
global.linq = require('core.linq');
global.loggerFactory = require('core.loggerFactory');
global.constants = require('core.constants');
global.roles = require('roles');
global.structures = require('structures');
global.creepCommands = require('creepCommands');

const log = global.loggerFactory('main');
const executor = require('executor');

global.buildInstructions = {
    order: [
        'harvester', 'harvester', 'harvester', 'harvester', 
        'builder', 'builder', 'builder', 'builder', 'builder'
    ]
    //infinite: 'archer'
};

executor();