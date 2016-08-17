module.exports = (function () {

    const log = require('logger')('role_builder');
    return {
        name: 'builder',
        body: [WORK, CARRY, CARRY, MOVE, MOVE],
        execution: function builder(creep) {		

            if (creep.carry[RESOURCE_ENERGY] === 0) {
                log.debug('getting energy');
                creep.moveTo(Game.spawns.Spawn1);
                creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY);
            } else {

                
                var controller = creep.room.controller;
                //TODO: Make this so it is dynamic based on controller level
                //TODO: Find and assign a single builder to upgrade the controller.  
                //      This will currently send all builders over to the controller to upgrade it.
                if (controller.ticksToDowngrade < 10000) {
                    log.debug('going to reset controller');
                    creep.moveTo(controller);
                    creep.upgradeController(controller);
                }  

                // find a construction site
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    log.debug('going to build construction site');
                    creep.moveTo(targets[0]);
                    creep.build(targets[0]);
                } else {
                    log.debug('no construction site found');
                }

                log.debug('going upgrade controller');
                creep.moveTo(controller);
                creep.upgradeController(controller);
            }
        }
    };
}());