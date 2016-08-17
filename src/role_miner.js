module.exports = (function () {
    return {
        name: 'miner',
        body: [CARRY, WORK, WORK, MOVE],
        execution: function miner(creep) {
            function haulerFilter(t) {
                return t.memory.role == 'hauler';
            }
            
            // If there is a hauler close by then transfer energy to it
            var target = creep.pos.findNearest(Game.MY_CREEPS, { filter: haulerFilter} );
            if (target !== undefined && target !== null && creep.pos.isNearTo(target)) {
                var maxEnergy = target.energyCapacity - target.energy;
                var toTransfer = creep.energy > maxEnergy ? maxEnergy : creep.energy;
                creep.transferEnergy(target, toTransfer);
            }
            
            var source = creep.pos.findNearest(Game.SOURCES);
            if (source !== undefined && source !== null) {
                creep.moveTo(source);
                creep.harvest(source);
            }
        }
    };
}());