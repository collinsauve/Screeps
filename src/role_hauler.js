module.exports = (function () {
    return {
        name: 'hauler',
        body: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        execution: function hauler(creep) {
            function minerFilter(t) {
                return t.memory.role == 'miner';
            }
            
            // If energy full, return to nearest spawn
            if (creep.energy >= creep.energyCapacity) {
                var spawn = creep.pos.findNearest(Game.MY_SPAWNS);
                if (spawn !== undefined && spawn !== null) {
                    creep.moveTo(spawn);
                    creep.transferEnergy(spawn)
                }
                return;
            }

            // Move to nearest miner
            var target = creep.pos.findNearest(Game.MY_CREEPS, { filter: minerFilter });
            if (target !== undefined && target !== null) {
                creep.moveTo(target);
            }
        }
    };
}());