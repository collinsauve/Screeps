module.exports = (function () {
    return {
        name: 'harvester',
        body: [WORK, CARRY, MOVE],
        execution: function harvester(creep) {
            function hasEnergyFilter(source) {
                return source.energy > 0;
            }
            if(creep.energy < creep.energyCapacity) {
                var target = creep.pos.findNearest(Game.SOURCES, { filter: hasEnergyFilter });
                if (target !== undefined && target !== null) {
                    creep.moveTo(target);
                    creep.harvest(target);
                }
            } else {
                creep.moveTo(Game.spawns.Spawn1);
                creep.transferEnergy(Game.spawns.Spawn1)
            }
        }
    };
}());