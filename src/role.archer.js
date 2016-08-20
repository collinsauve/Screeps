module.exports = (function () {
    
    //const log = loggerFactory('role.archer');
    return {
        name: 'archer',
        run: function guard(creep) {
            commands.attack.attackNearestHostileCreep(creep) ||
            commands.attack.attackNearestHostileSpawn(creep) ||
            commands.move.followClosestFriendlyRole(creep, 'guard') ||
            commands.attack.attackAnyHostileSpawn(creep) ||
            commands.move.returnToNearestFlag(creep) ||
            commands.move.returnToNearestSpawn(creep);
        }
    };
}());