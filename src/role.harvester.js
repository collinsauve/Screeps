module.exports = (function () {
    
    //const log = loggerFactory('role.harvester');
    return {
        name: 'harvester',
        run: function harvester(creep) {

            commands.energy.harvestEnergyIfNotFull(creep) ||
            commands.energy.storeEnergyIfAny(creep); 
        }
    };
}());