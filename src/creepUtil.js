module.exports = (function () {

    var linq = require('linq');

    function shouldChase(creep, hostile, protectionRadius) {

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
            case Game.RANGED_ATTACK:
                return 3;
            case Game.ATTACK:
                return 1;
            default:
                return 0;
        }
    }

    function firingRange(creep) {
        return linq.max(creep.body.map(partRange));
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
        firingRange: firingRange
    };
})();