module.exports = (function () {

    //const log = loggerFactory('role.builder');
    return {
        name: 'builder',
        body: [WORK, CARRY, CARRY, MOVE, MOVE],
        execution: function builder(creep) {		
            creepCommands.getEnergyIfNeededAndAvailableEnergyGreaterThan(creep, 300) ||
            creepCommands.resetControllerDowngrade(creep) ||                
            creepCommands.buildClosestConstructionSite(creep) ||
            creepCommands.upgradeController(creep);
        }
    };
}());