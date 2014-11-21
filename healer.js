module.exports = function healer(creep) {		
    function damagedFilter(creep) {
        return creep.hits < creep.hitsMax;
    }
    
    function guardFilter(creep) {
        return creep.memory.role == 'guard';
    }
    
    // Move to and heal closest damaged unit
	var target = creep.pos.findNearest(Game.MY_CREEPS, { filter: damagedFilter });
	if(target !== undefined && target !== null) {
        creep.moveTo(target);
        creep.heal(target);
        return;
    }

    // Move to the closest guard
    target = creep.pos.findNearest(Game.MY_CREEPS, { filter: guardFilter });
    if(target !== undefined && target !== null) {
        creep.moveTo(target);
        return;
    }
}