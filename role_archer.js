var creepUtil = require('creepUtil');

var log = false;
module.exports = {
    name: 'archer',
    body: [Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK],
    execution: function guard(creep) {
        
        function healerFilter(t) {
            return t.memory.role == 'healer';
        }
        
        function guardFilter(t) {
            return t.memory.role == 'guard';
        }
        

        // Attack nearest hostile
        var target = creep.pos.findNearest(Game.HOSTILE_CREEPS, { filter: creepUtil.shouldChaseFilter(creep, 10) });
        if (target !== undefined && target !== null) {
            if (log) {
                console.log('archer ' + creep.name + ' attacking ' + target.name);
            }
            if (!creep.pos.inRangeTo(target.pos, 3)) {
                creep.moveTo(target);    
            }
            creep.rangedAttack(target);
            return;
        }
        
        // Move to the closest healer
        target = creep.pos.findNearest(Game.MY_CREEPS, { filter: healerFilter });
        if (target !== undefined && target !== null) {
            if (log) {
                console.log('archer ' + creep.name + ' following healer' + target.name);
            }
            creep.moveTo(target);
            return;
        }
        
        // Move to the closest guard
        target = creep.pos.findNearest(Game.MY_CREEPS, { filter: guardFilter });
        if (target !== undefined && target !== null) {
            if (log) {
                console.log('archer ' + creep.name + ' following guard' + target.name);
            }
            creep.moveTo(target);
            return;
        }

        // Return to spawn
        target = creep.pos.findNearest(Game.MY_SPAWNS);
        if(target !== undefined && target !== null) {
            if (log) {
                console.log('archer ' + creep.name + ' returning to ' + target.name);
            }
            creep.moveTo(target);
            return;
        }
    }
};