module.exports = (function () {

    //const log = loggerFactory('role.builder');
    return {
        name: 'builder',
        run: function builder(creep) {		
            commands.energy.getEnergyIfNeededAndAvailableEnergyGreaterThan(creep, 301) ||
            commands.controller.resetControllerDowngrade(creep) ||                
            commands.build.nearestNonRoad(creep) ||
            commands.build.nearest(creep) ||
            commands.repair.nearestMy(creep) ||
            commands.repair.nearestNeutral(creep) ||
            commands.controller.upgradeController(creep);
        }
    };
}());