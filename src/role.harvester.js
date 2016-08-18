module.exports = (function () {
    
    const log = loggerFactory('role_harvester');

    return {
        name: 'harvester',
        body: [WORK, WORK, CARRY, MOVE],
        execution: function harvester(creep) {
            function hasEnergyFilter(source) {
                return source.energy > 0;
            }
            if(_.sum(creep.carry) < creep.carryCapacity) {
                log.debug(() => 'harvesting')
                var target = creep.pos.findClosestByPath(FIND_SOURCES, { filter: hasEnergyFilter });
                if (target !== undefined && target !== null) {
                    creep.moveTo(target);
                    creep.harvest(target);
                }
            } else {
                log.debug(() => 'transfering')
                creep.moveTo(Game.spawns.Spawn1);
                creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY)
            }
        }
    };
}());