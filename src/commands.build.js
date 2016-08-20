module.exports = (function () {

    function buildClosestConstructionSite(actor) {
        return action.nearest(actor, FIND_CONSTRUCTION_SITES, null, 'building', function(target) {
            //TODO: Structures can't move
            actor.moveTo(target);
            actor.build(target);
        });
    }
    
    return {
        buildClosestConstructionSite
    };
}());


    