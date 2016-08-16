module.exports = () => {
    var creepCommands = require('creepCommands');
    return {
        name: 'guard',
        body: [TOUGH, TOUGH, TOUGH, MOVE, ATTACK],
        execution: function guard(creep) {
            creepCommands.attackNearestHostileCreep(creep) ||
            creepCommands.attackNearestHostileSpawn(creep) ||
            creepCommands.attackAnyHostileSpawn(creep) ||
            creepCommands.returnToNearestFlag(creep) ||
            creepCommands.returnToNearestSpawn(creep);
        }
    };
}