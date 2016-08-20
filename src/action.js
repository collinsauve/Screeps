module.exports = (function () {
    
    const log = loggerFactory('creepCommands');

    function logAction(actor, action, target) {
        var suffix = target === undefined ? '' : ' target=' + target.name;
        log.debug(() => actor.name + " " + action + suffix); 
    }

    function specific(actor, target, actionMessage, actionFunction) {
        if (target === undefined || target === null) {
            return false;
        }
        
        logAction(actor, actionMessage, target);
        if (actor.memory !== undefined) {
            actor.memory.target = target;
            actor.memory.actionMessage = actionMessage;
        }
        actionFunction(target);

        return true;   
    }

    function any(actor, gameType, opts, actionMessage, actionFunction) {
        var targets = actor.room.find(gameType, opts);
        if (!targets.length) {
            return false;
        }
        
        specific(actor, targets[0], actionMessage, actionFunction);
        return true;  
    }

    function nearest(actor, gameType, opts, actionMessage, actionFunction) {
        var target = actor.pos.findClosestByPath(gameType, opts);
        if (target === undefined || target === null) {
            return false;
        }
        specific(actor, target, actionMessage, actionFunction);
        return true;   
    }

    return {
        specific; specific,
        any: any,
        nearest: nearest
    };
});