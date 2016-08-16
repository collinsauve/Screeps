var creepCommands = require('creepCommands');

module.exports = {
    name: 'healer',
    body: [TOUGH, MOVE, HEAL, MOVE],
    execution: function healer(creep) {
        creepCommands.healNearestDamagedFriendly(creep) ||
        creepCommands.followClosestFriendlyRole(creep, 'guard') ||
        creepCommands.followClosestFriendlyRole(creep, 'archer') ||
        creepCommands.returnToNearestFlag(creep) ||
        creepCommands.returnToNearestSpawn(creep);
    }
};