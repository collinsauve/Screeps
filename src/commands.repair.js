module.exports = (function () {

    function repairAnyStructureInRoom(actor) {
        //TODO: Can towers and builders repair themselves?
        return action.any(actor, FIND_MY_STRUCTURES, { filter: s => s.hits < s.hitsMax }, 'repairing', function(target) {
            //TODO: If was a creep instead of a tower, would have to move
            actor.repair(target);            
        });
    }

    function repairAnyRoadInRoom(actor) {
        //TODO: Can towers and builders repair themselves?
        return action.any(actor, FIND_STRUCTURES, { filter: s => s.structureType == STRUCTURE_ROAD && s.hits < s.hitsMax }, 'repairing', function(target) {
            //TODO: If was a creep instead of a tower, would have to move
            actor.repair(target);            
        });
    }
    
    return {
        repairAnyStructureInRoom,
        repairAnyRoadInRoom
    };
}());