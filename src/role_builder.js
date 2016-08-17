module.exports = (function () {

    const log = require('logger')('role_builder');
    return {
        name: 'builder',
        body: [WORK, CARRY, CARRY, MOVE, MOVE],
        execution: function builder(creep) {		

            if (creep.carry[RESOURCE_ENERGY] === 0) {
                log.debug('getting energy');
                creep.moveTo(Game.spawns.Spawn1);
                creep.withdraw(creep, RESOURCE_ENERGY);
            }
            else {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    log.debug('going to build construction site');
                    creep.moveTo(targets[0]);
                    creep.build(targets[0]);
                } else {
                    log.debug('no construction site found');
                }
            }
        }
    };
}());