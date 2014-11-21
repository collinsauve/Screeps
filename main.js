var roles = require('roles');
var roleExecutor = require('roleExecutor');
var spawnFactory = require('spawnFactory');
var creepFactory = require('creepFactory');
require('linq');

var spawn = spawnFactory();
if (spawn === undefined || spawn === null) {
    console.log('Warning: No spawn found');
    return;
}

var buildInstructions = {
    order: [
        'harvester', 'harvester', 'harvester', 
        'guard', 'healer',
        'guard', 'healer'
    ],
    infinite: 'guard'
};

roleExecutor(roles);
creepFactory(spawn, roles, buildInstructions);