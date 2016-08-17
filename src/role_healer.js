module.exports = (function () {

    var creepCommands = require('creepCommands');
    return {
        name: 'healer',
        body: [MOVE, HEAL],
        execution: function healer(creep) {
            creepCommands.healNearestDamagedFriendly(creep) ||
            creepCommands.followClosestFriendlyRole(creep, 'guard') ||
            creepCommands.followClosestFriendlyRole(creep, 'archer') ||
            creepCommands.returnToNearestFlag(creep) ||
            creepCommands.returnToNearestSpawn(creep);
        }
    };
}());