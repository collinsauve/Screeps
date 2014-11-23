module.exports = function (creep, ignoreCreeps, defend) {

    function find(opts) {
        opts = opts || { };
        opts.filter = function(i) { return i.pos.inRangeTo(creep, 7); };
        var target;
        if (!ignoreCreeps) {
            target = creep.pos.findNearest(Game.HOSTILE_CREEPS, opts);
        }
        if (!target) {
            opts.filter = null;
            target = creep.pos.findNearest(Game.HOSTILE_SPAWNS, opts);
        }
        if (target) {
            creep.moveTo(target, opts);
        }
        return target;
    }

    var target, healers = creep.room.find(Game.MY_CREEPS, { filter: function(i) { return i.getActiveBodyparts('heal') > 0; } });
    if (defend) {
        var siege = creep.room.find(Game.MY_CREEPS, { filter: function(i) { return /Siege/.test(i.name); } });
        if (siege.length > 0) {
            target = siege[0];
            creep.moveTo(target);
        }
    }
    if (!target && creep.hits < creep.hitsMax / 2 && healers.length > 0) {
        target = creep.pos.findNearest(Game.MY_CREEPS, { filter: function(i) { return i.getActiveBodyparts('heal') > 0; } });
        if (!target || creep.moveTo(target) != Game.OK) {
            target = null;
        }
    }
    if (!target) {
        target = find();
        if (!target) {
            target = find({ ignoreDestructibleStructures: true });
        }
        if (!target) {
            return;
        }
        creep.attack(target);
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