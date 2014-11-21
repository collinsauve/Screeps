var roles = require('roles');
var roleExecutor = require('roleExecutor');
var creepFactory = require('creepFactory');
require('linq');

var spawn = Game.spawns.Spawn1;


var buildInstructions = {
    order: [
        'harvester', 'harvester', 'harvester', 'harvester', 
        'guard', 'guard'
    ],
    infinite: 'guard'
};

roleExecutor(roles);
creepFactory(spawn, roles, buildInstructions);