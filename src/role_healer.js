module.exports = () => {

    var creepCommands = require('creepCommands');
    return {
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
}