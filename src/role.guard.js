module.exports = (function () {

    //const log = loggerFactory('role.guard');
    return {
        name: 'guard',
        run: function guard(creep) {
            commands.attack.attackNearestHostileCreep(creep) ||
            commands.attack.attackNearestHostileSpawn(creep) ||
            commands.attack.attackAnyHostileSpawn(creep) ||
            commands.move.returnToNearestFlag(creep) ||
            commands.move.returnToNearestSpawn(creep);
        }
    };
}());