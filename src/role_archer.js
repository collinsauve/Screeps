module.exports = (function () {
    
    var creepCommands = require('creepCommands');
    return {
        name: 'archer',
        body: [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, RANGED_ATTACK],
        execution: function guard(creep) {
            creepCommands.attackNearestHostileCreep(creep) ||
            creepCommands.attackNearestHostileSpawn(creep) ||
            creepCommands.followClosestFriendlyRole(creep, 'guard') ||
            creepCommands.attackAnyHostileSpawn(creep) ||
            creepCommands.returnToNearestFlag(creep) ||
            creepCommands.returnToNearestSpawn(creep);
        }
    };
}