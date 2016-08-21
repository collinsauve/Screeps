module.exports = (function () {

    function my(actor) {
        //TODO: Can towers and builders repair themselves?
        return action.any(actor, FIND_MY_STRUCTURES, { filter: s => s.hits < s.hitsMax }, 'repairing', function(target) {
            //TODO: If was a creep instead of a tower, would have to move
            actor.repair(target);            
        });
    }

    function neutral(actor) {
        //TODO: Can towers and builders repair themselves?
        return action.any(actor, FIND_STRUCTURES, { filter: s => s => (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER) && s.hits < s.hitsMax }, 'repairing', function(target) {
            //TODO: If was a creep instead of a tower, would have to move
            actor.repair(target);            
        });
    }

    function nearestMy(actor) {

        //TODO: Can towers and builders repair themselves?
        return action.nearest(actor, FIND_MY_STRUCTURES, { filter: s => s.hits < s.hitsMax }, 'repairing', function(target) {
            //TODO: Towers don't have to move
            actor.moveTo(target);
            actor.repair(target);            
        });
    }

    function nearestNeutral(actor) {
        //TODO: Can towers and builders repair themselves?
        return action.nearest(actor, FIND_STRUCTURES, { filter: s => (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER) && s.hits < s.hitsMax }, 'repairing', function(target) {
            //TODO: Towers don't have to move
            actor.moveTo(target);
            actor.repair(target);            
        });
    }
    
    return {
        my,
        neutral,
        nearestMy,
        nearestNeutral
    };
}());