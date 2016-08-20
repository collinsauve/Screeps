module.exports = (function () {

    function healNearestDamagedFriendly(actor) {
        //TODO: Requires actor to have a "name", therefore does not work for structures
        function damagedFriendlyFilter(t) { return t.hits < t.hitsMax && actor.name !== t.name; }
        return action.nearest(actor, FIND_MY_CREEPS, { filter: damagedFriendlyFilter }, 'healing', function(target) {
            //TODO: Structures can't move
            actor.moveTo(target);
            actor.heal(target);
        });
    }

    function healAnyDamagedFriendlyInRoom(actor) {
        //TODO: If was a creep, would not be able to heal itself.  Add this check to the filter.
        return action.any(actor, FIND_MY_CREEPS, { filter: target => target.hits < target.hitsMax }, 'healing', function(target) {
            //TODO: If was a creep instead of a tower, would have to move
            actor.heal(target);            
        });
    }


    return {
        healAnyDamagedFriendlyInRoom
    };
}());