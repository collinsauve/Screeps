function create(parts, role) {
    return {
        parts,
        role
    };
}

module.exports = {

    "archer-1": create([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, RANGED_ATTACK], 'archer'),
    'builder-1': create([WORK, CARRY, CARRY, MOVE, MOVE], 'builder'),
    'guard-1': create([TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK], 'guard'),
    'harvester-1': create([WORK, WORK, CARRY, MOVE], 'harvester'),
    'harvester-2': create([WORK, WORK, WORK, WORK, CARRY, MOVE], 'harvester'),
    'hauler-1': create([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'hauler'),
    'healer-1': create([MOVE, HEAL], 'healer'),
    'miner-1': create([CARRY, WORK, WORK, MOVE], 'miner')
};