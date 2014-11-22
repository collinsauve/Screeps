module.exports = {
    name: 'guard',
    body: [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.MOVE, Game.ATTACK],
    execution: function guard(creep) {		
        var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
        if (target !== undefined && target !== null) {
            creep.moveTo(target);
            creep.attack(target);
        }
    }
};