var creepUtil = require('creepUtil');

var log = false;
var protectionRadius = 10;

function logAction(creep, action, target) {
    if (!log) {
        return;
    }

    var suffix = target === undefined ? '' : ' ' + target.name;
    console.log(creep.name + '(' + creep.memory.role + ') ' + action + suffix + '.'); 
}

function attackNearestHostile(creep) {
    var target = creep.pos.findNearest(Game.HOSTILE_CREEPS, { filter: creepUtil.shouldChaseFilter(creep, protectionRadius) });
    if (target === undefined || target === null) {
        return false;
    }

    logAction(creep, 'attacking', target);
    if (!creep.pos.inRangeTo(target.pos, creepUtil.firingRange(creep))) {
        creep.moveTo(target);
    }
    creep.attack(target);
    
    return true;
}

function healNearestDamagedFriendly(creep) {
    var target = creep.pos.findNearest(Game.MY_CREEPS, { filter: function (t) { return t.hits < t.hitsMax && creep.name !== t.name; } });
    if (target === undefined || target === null) {
        return false;
    }
    
    logAction(creep, 'healing', target);
    creep.moveTo(target);
    creep.heal(target);
    
    return true;
}

function returnToNearestFlag(creep) {
    var target = creep.pos.findNearest(Game.FLAGS, { ignoreCreeps: true });
    if (target === undefined || target === null) {
        return false;
    }
    logAction(creep, 'returning to flag', target);
    creep.moveTo(target);
    return true;
}

function returnToNearestSpawn(creep) {
    var target = creep.pos.findNearest(Game.MY_SPAWNS, { ignoreCreeps: true });
    if (target === undefined || target === null) {
        return false;
    }
    logAction(creep, 'returning to spawn', target);
    creep.moveTo(target);
    return true;
}

function followClosestFriendlyRole(creep, targetRole) {
    var target = creep.pos.findNearest(Game.MY_CREEPS, { filter: function(t) { return t.memory.role == targetRole; } });
    if (target === undefined || target === null) {
        return false;
    }

    logAction(creep, 'following', target);
    return true;
}

module.exports = {
    attackNearestHostile: attackNearestHostile,
    healNearestDamagedFriendly: healNearestDamagedFriendly,
    returnToNearestFlag: returnToNearestFlag,
    returnToNearestSpawn: returnToNearestSpawn,
    followClosestFriendlyRole: followClosestFriendlyRole
};