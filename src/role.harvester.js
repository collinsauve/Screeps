module.exports = (function () {
    
    //const log = loggerFactory('role.harvester');
    return {
        name: 'harvester',
        body: [WORK, WORK, CARRY, MOVE],
        execution: function harvester(creep) {

            commands.energy.harvestEnergyIfNotFull(creep) ||
            commands.energy.storeEnergyIfAny(creep); 
        }
    };
}());