var roles = require('roles');
var roleExecutor = require('roleExecutor');
var creepFactory = require('creepFactory');
require('linq');

var spawn = Game.spawns.Spawn1;

roleExecutor(roles);
creepFactory(spawn, roles);