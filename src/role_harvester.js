module.exports = (function () {
    return {
        name: 'harvester',
        body: [WORK, CARRY, MOVE],
        execution: function harvester(creep) {
            function hasEnergyFilter(source) {
                return source.energy > 0;
            }
            if(_.sum(creep.carry) < creep.carryCapacity) {
                var target = creep.pos.findClosestByPath(FIND_SOURCES, { filter: hasEnergyFilter });
                if (target !== undefined && target !== null) {
                    creep.moveTo(target);
                    creep.harvest(target);
                }
            } else {
                creep.moveTo(Game.spawns.Spawn1);
                creep.transfer(Game.spawns.Spawn1)
            }
        }
    };
}());