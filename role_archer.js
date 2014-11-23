var creepCommands = require('creepCommands');

module.exports = {
    name: 'archer',
    body: [Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK],
    execution: function guard(creep) {
        creepCommands.attackNearestHostileCreep(creep) ||
        creepCommands.attackNearestHostileSpawn(creep) ||
        creepCommands.followClosestFriendlyRole(creep, 'guard') ||
        creepCommands.attackAnyHostileSpawn(creep) ||
        creepCommands.returnToNearestFlag(creep) ||
        creepCommands.returnToNearestSpawn(creep);
    }
};