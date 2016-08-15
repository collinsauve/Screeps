var creepCommands = require('creepCommands');

module.exports = {
    name: 'guard',
    body: [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.MOVE, Game.ATTACK],
    execution: function guard(creep) {
        creepCommands.attackNearestHostileCreep(creep) ||
        creepCommands.attackNearestHostileSpawn(creep) ||
        creepCommands.attackAnyHostileSpawn(creep) ||
        creepCommands.returnToNearestFlag(creep) ||
        creepCommands.returnToNearestSpawn(creep);
    }
};