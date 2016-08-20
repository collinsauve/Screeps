module.exports = (function () {

    function shouldChase(creep, hostile, protectionRadius) {

        //TODO: I don't think this works AT ALL.  Lots of things have changed in the API.

        // Determine if we are in firing range
        var maxRange = Math.max(firingRange(creep), firingRange(hostile));
        if (creep.pos.inRangeTo(hostile.pos, maxRange)) {
            return true;
        }
        
        var typesToProtect = [Game.MY_CREEPS, Game.MY_SPAWNS, Game.MY_STRUCTURES];
        var unitsToProtect =  _.filter(linq.selectMany(typesToProtect, type => creep.room.find(type),
            unit => unit.id !== creep.id && unit.pos.inRangeTo(hostile.pos, protectionRadius)));
        
        var firstUnitToProtect = linq.firstOrDefault(unitsToProtect);
        return firstUnitToProtect !== undefined && firstUnitToProtect !== null;
    }

    function shouldChaseFilter(creep, protectionRadius) {
        return hostile => shouldChase(creep, hostile, protectionRadius);
    }

    function partRange(part) {
        switch (part.type) {
            case RANGED_ATTACK:
                return 3; //TODO: Is this correct?
            case ATTACK:
                return 1;
            default:
                return 0;
        }
    }

    function firingRange(creep) {
        return linq.max(creep.body.map(partRange));
    }

    function hasEnergy(creep) {
        return creep.carry[RESOURCE_ENERGY] !== 0
    }

    function fullCarry(creep) {
        return _.sum(creep.carry) >= creep.carryCapacity;
    }

    function sourceHasEnergy(source) {
        return source.energy > 0;
    }

    function structureStorageIsFull(structure) {

        if (structure.energy !== undefined) {
            return structure.energy >= structure.energyCapacity;
        }
        if (structure.store !== undefined) {
            return _.sum(structure.store) >= structure.storeCapacity;
        }        
        return true;
    }

    function structureHasEnergy(structure) {
        if (structure.energy !== undefined) {
            return structure.energy > 0;
        }
        return false;
    }

    return {
        // Determines if this creep should chase a hostile creep.
        // Attempts to protect all friendlies within a given radius.
        // Will only exit that radius if this creep and the hostile
        // creep are within firing range (either direction).
        shouldChase: shouldChase,
        
        // Creates a filter to remove hostiles that should not be chased
        shouldChaseFilter: shouldChaseFilter,
        
        // Determines the firing range of a creep
        firingRange: firingRange,

        hasEnergy: hasEnergy,
        fullCarry: fullCarry,
        sourceHasEnergy: sourceHasEnergy,
        structureStorageIsFull: structureStorageIsFull,
        structureHasEnergy: structureHasEnergy
    };
})();