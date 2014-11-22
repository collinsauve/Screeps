var creepCommands = require('creepCommands');

module.exports = {
    name: 'archer',
    body: [Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK],
    execution: function guard(creep) {
        creepCommands.attackNearestHostile(creep) ||
        creepCommands.followClosestFriendlyRole(creep, 'healer') ||
        creepCommands.followClosestFriendlyRole(creep, 'guard') ||
        creepCommands.returnToNearestFlag(creep) ||
        creepCommands.returnToNearestSpawn(creep);
    }
};