global.util = require('util');
global.linq = require('core.linq');
global.loggerFactory = require('core.loggerFactory');
global.constants = require('core.constants');
global.action = require('action');
global.creepUtil = require('creepUtil');
global.bodies = require('bodies');
global.roomData = require('roomData');

global.roles = util.loadFolder('role', [
    'harvester',
    'builder',
    'guard',
    'healer',
    'miner',
    'hauler',
    'archer'
]);
global.structureRunners = util.loadFolder('structure', [
    'spawn',
    'tower'
]);
global.commands = util.loadFolder('commands', [
    'attack',
    'build',
    'controller',
    'energy',
    'heal',
    'move',
    'repair'
]);

const log = global.loggerFactory('main');
const executor = require('executor');

global.buildInstructions = {
    order: [
        'harvester', 'harvester', 'harvester', 
        'builder', 'builder'//, 'builder'
    ]
    //infinite: 'archer'
};

executor();