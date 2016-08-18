module.exports = (function () {

    const log = loggerFactory('role_builder');
    return {
        name: 'builder',
        body: [WORK, CARRY, CARRY, MOVE, MOVE],
        execution: function builder(creep) {		

            if (creepCommands.getEnergyIfNeeded(creep)) return;
            if (creepCommands.resetControllerDowngrade(creep)) return;                
            if (creepCommands.buildClosestConstructionSite(creep)) return;
            creepCommands.upgradeController(creep);
        }
    };
}());