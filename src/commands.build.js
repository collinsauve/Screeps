module.exports = (function () {

    function isRoad(constructionSite) {
        return constructionSite.structureType === STRUCTURE_ROAD;
    }

    function nearest(actor, objects) {
        
        return action.nearest(actor, objects, null, 'building', function(target) {
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
        nearest: (actor) => nearest(actor, roomData.get(actor.room).my.constructionSites.all),
        nearestNonRoad: (actor) => nearest(actor, roomData.get(actor.room).my.constructionSites.nonRoad),
        nearestRoad: (actor) => nearest(actor, roomData.get(actor.room).my.constructionSites.road)
    };
}());


    