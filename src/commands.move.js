module.exports = (function () {

    function moveToNearest(actor, gameType, opts, messageType) {
        return actionNearest(actor, gameType, opts, 'moving to ' + messageType, function (target) {
            actor.moveTo(target);
        });    
    }

    function returnToNearestFlag(actor) {
        return moveToNearest(actor, FIND_FLAGS, { ignoreCreeps: true }, 'flag');
    }

    function returnToNearestSpawn(actor) {
        return moveToNearest(actor, FIND_MY_SPAWNS, { ignoreCreeps: true }, 'spawn');

    }

    function followClosestFriendlyRole(actor, targetRole) {
        function roleFilter(t) { return t.memory.role == targetRole; }
        return moveToNearest(actor, FIND_MY_CREEPS, { filter: roleFilter }, targetRole);
    }    
    
    return {
        moveToNearest,
        returnToNearestFlag,
        returnToNearestSpawn,
        followClosestFriendlyRole
    };
}());