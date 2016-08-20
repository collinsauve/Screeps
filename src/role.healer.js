module.exports = (function () {

    //const log = loggerFactory('role.healer');
    return {
        name: 'healer',
        body: [MOVE, HEAL],
        execution: function healer(creep) {
            commands.heal.healNearestDamagedFriendly(creep) ||
            commands.move.followClosestFriendlyRole(creep, 'guard') ||
            commands.move.followClosestFriendlyRole(creep, 'archer') ||
            commands.move.returnToNearestFlag(creep) ||
            commands.move.returnToNearestSpawn(creep);
        }
    };
}());