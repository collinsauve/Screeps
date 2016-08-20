module.exports = (function () {

    function isRoad(constructionSite) {
        return constructionSite.structureType === STRUCTURE_ROAD;
    }

    function nearest(actor, filter) {
        return action.nearest(actor, FIND_MY_CONSTRUCTION_SITES, { filter: filter }, 'building', function(target) {
            //TODO: Structures can't move
            actor.moveTo(target);
            actor.build(target);
        });
    }

    function nearestNonRoad(actor) {
        return nearest(actor, cs => !isRoad(cs));
    }

    function nearestRoad(actor) {
        return nearest(actor, cs => isRoad(cs));
    }
    
    return {
        nearest,
        nearestNonRoad,
        nearestRoad
    };
}());


    