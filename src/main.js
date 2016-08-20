global.util = require('util');
global.linq = require('core.linq');
global.loggerFactory = require('core.loggerFactory');
global.constants = require('core.constants');
global.creepCommands = require('creepCommands');
global.actions = require('actions');
global.creepUtil = require('creepUtil');

global.roles = util.loadFolder('roles', [
    'harvester',
    'builder',
    'guard',
    'healer',
    'miner',
    'hauler',
    'archer'
]);
global.structureRunners = util.loadFolder('structures', [
    'spawn',
    'tower'
]);
global.commands = util.loadFolder('commands', [
    'attack'
]);

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