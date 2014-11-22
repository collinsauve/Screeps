var creepUtil = require('creepUtil');

var log = false;
module.exports = {
    name: 'guard',
    body: [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.MOVE, Game.ATTACK],
    execution: function guard(creep) {

        // Attack nearest hostile
        var target = creep.pos.findNearest(Game.HOSTILE_CREEPS, { filter: creepUtil.shouldChaseFilter(creep, 10) });
        if (target !== undefined && target !== null) {
            if (log) {
                console.log('guard ' + creep.name + ' attacking ' + target.name);
            }
            creep.moveTo(target);
            creep.attack(target);
            return;
        }
        
        // Return to spawn
        target = creep.pos.findNearest(Game.MY_SPAWNS);
        if(target !== undefined && target !== null) {
            if (log) {
                console.log('guard ' + creep.name + ' returning to ' + target.name);
            }
            creep.moveTo(target);
            return;
        }
    }
};