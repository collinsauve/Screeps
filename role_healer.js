var log = false;
module.exports = {
    name: 'healer',
    body: [Game.TOUGH, Game.MOVE, Game.HEAL, Game.MOVE],
    execution: function healer(creep) {	
        function damagedFilter(t) {
            return t.hits < t.hitsMax && creep.name !== t.name;
        }
        
        function guardFilter(t) {
            return t.memory.role == 'guard';
        }
        
        // Move to and heal closest damaged unit
        var target = creep.pos.findNearest(Game.MY_CREEPS, { filter: damagedFilter });
        if(target !== undefined && target !== null) {
            if (log) {
                console.log('healer ' + creep.name + ' moving to heal ' + target.name);
            }
            creep.moveTo(target);
            creep.heal(target);
            return;
        }

        // Move to the closest guard
        target = creep.pos.findNearest(Game.MY_CREEPS, { filter: guardFilter });
        if(target !== undefined && target !== null) {
            if (log) {
                console.log('healer ' + creep.name + ' following guard' + target.name);
            }
            creep.moveTo(target);
            return;
        }
        
        // Move back to the spawn
        target = creep.pos.findNearest(Game.MY_SPAWNS);
        if(target !== undefined && target !== null) {
            if (log) {
                console.log('healer ' + creep.name + ' returning to ' + target.name);
            }
            creep.moveTo(target);
            return;
        }
    }
};