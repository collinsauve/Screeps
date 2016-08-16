var roles = require('roles');
var roleExecutor = require('roleExecutor');
var spawnFactory = require('spawnFactory');
var creepFactory = require('creepFactory');

var spawn = spawnFactory();
if (spawn === undefined || spawn === null) {
    console.log('Warning: No spawn found');
    return;
}

var buildInstructions = {
    order: [
        'miner', 'hauler', 'hauler', 
        'guard', 'healer',
        'guard', 'healer', 'archer',
        'guard', 'healer', 'archer',
        'guard', 'healer', 'archer',
        'guard', 'guard'
    ],
    infinite: 'archer'
};

roleExecutor(roles);
creepFactory(spawn, roles, buildInstructions);