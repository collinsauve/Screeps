module.exports = (function () {

    //const log = loggerFactory('role.guard');
    return {
        name: 'guard',
        body: [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK],
        execution: function guard(creep) {
            commands.attack.attackNearestHostileCreep(creep) ||
            commands.attack.attackNearestHostileSpawn(creep) ||
            commands.attack.attackAnyHostileSpawn(creep) ||
            commands.move.returnToNearestFlag(creep) ||
            commands.move.returnToNearestSpawn(creep);
        }
    };
}());