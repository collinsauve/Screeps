module.exports = (function () {

    //const log = loggerFactory('role.builder');
    return {
        name: 'builder',
        body: [WORK, CARRY, CARRY, MOVE, MOVE],
        execution: function builder(creep) {		
            commands.energy.getEnergyIfNeededAndAvailableEnergyGreaterThan(creep, 300) ||
            commands.controller.resetControllerDowngrade(creep) ||                
            commands.build.buildClosestConstructionSite(creep) ||
            commands.controller.upgradeController(creep);
        }
    };
}());