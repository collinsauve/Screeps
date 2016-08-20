module.exports = (function () {
    
    const log = loggerFactory('creepCommands');

    function logAction(actor, action, target) {
        var suffix = target === undefined ? '' : ' target=' + target.name;
        log.debug(() => actor.name + " " + action + suffix); 
    }

    function action(actor, target, actionMessage, actionFunction) {
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

    function actionAny(actor, gameType, opts, actionMessage, actionFunction) {
        var targets = actor.room.find(gameType, opts);
        if (!targets.length) {
            return false;
        }
        
        action(actor, targets[0], actionMessage, actionFunction);
        return true;  
    }

    function actionNearest(actor, gameType, opts, actionMessage, actionFunction) {
        var target = actor.pos.findClosestByPath(gameType, opts);
        if (target === undefined || target === null) {
            return false;
        }
        action(actor, target, actionMessage, actionFunction);
        return true;   
    }

    return {
        action,
        actionAny,
        actionNearest
    };
});