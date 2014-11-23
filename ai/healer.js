module.exports = function (creep) {
    var target = creep.pos.findNearest(Game.MY_CREEPS, { filter: function(i) { return i != creep && i.hits < i.hitsMax; } });
    if (!target) {
        target = creep.pos.findNearest(Game.MY_CREEPS, { filter: function(i) { return i != creep; } });
    }
    if (!target) {
        return;
    }
    if (target.hits == target.hitsMax || creep.heal(target) != Game.OK) {
        creep.moveTo(target);
    }
    if (creep.getActiveBodyparts(Game.RANGED_ATTACK)) {
        var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
        if (targets.length) {
            creep.rangedAttack(targets[0]);
        } else {
            targets = creep.pos.findInRange(Game.HOSTILE_SPAWNS, 3);
            if (targets.length) {
                creep.rangedAttack(targets[0]);
            }
        }
    }
}