module.exports = function guard(creep) {		
	var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
	if (target !== undefined && target !== null) {
		creep.moveTo(target);
		creep.attack(target);
	}
}