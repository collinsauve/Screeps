module.exports = function harvester(creep) {
	function hasEnergyFilter(source) {
        return source.energy > 0;
    }
    if(creep.energy < creep.energyCapacity) {
		var target = creep.pos.findNearest(Game.SOURCES, { filter: hasEnergyFilter });
        if (target !== undefined && target !== null) {
            creep.moveTo(sources[0]);
            creep.harvest(sources[0]);
		}
	} else {
		creep.moveTo(Game.spawns.Spawn1);
		creep.transferEnergy(Game.spawns.Spawn1)
	}
}