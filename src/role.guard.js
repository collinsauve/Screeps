module.exports = (function () {

    //const log = loggerFactory('role.guard');
    return {
        name: 'guard',
        body: [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK],
        execution: function guard(creep) {
            creepCommands.attackNearestHostileCreep(creep) ||
            creepCommands.attackNearestHostileSpawn(creep) ||
            creepCommands.attackAnyHostileSpawn(creep) ||
            creepCommands.returnToNearestFlag(creep) ||
            creepCommands.returnToNearestSpawn(creep);
        }
    };
}());