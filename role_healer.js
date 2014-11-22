var creepCommands = require('creepCommands');

module.exports = {
    name: 'healer',
    body: [Game.TOUGH, Game.MOVE, Game.HEAL, Game.MOVE],
    execution: function healer(creep) {
        creepCommands.healNearestDamagedFriendly(creep) ||
        creepCommands.followClosestFriendlyRole(creep, 'guard') ||
        creepCommands.followClosestFriendlyRole(creep, 'archer') ||
        creepCommands.returnToNearestFlag(creep) ||
        creepCommands.returnToNearestSpawn(creep);
    }
};