module.exports = (function () {
    
    //const log = loggerFactory('role.harvester');
    return {
        name: 'harvester',
        body: [WORK, WORK, CARRY, MOVE],
        execution: function harvester(creep) {

            creepCommands.harvestEnergyIfNotFull(creep) ||
            creepCommands.storeEnergyIfAny(creep); 
        }
    };
}());