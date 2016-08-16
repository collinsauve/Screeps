module.exports = (function (){

    var creepUtil = require('creepUtil');

    var log = true;
    var protectionRadius = 5;

    function logAction(creep, action, target) {
        if (!log) {
            return;
        }

        var suffix = target === undefined ? '' : ' ' + target.name;
        console.log(creep.name + '(' + creep.memory.role + ') ' + action + suffix + '.'); 
    }

    function action(creep, target, actionMessage, actionFunction) {
        if (target === undefined || target === null) {
            return false;
        }
        
        logAction(creep, actionMessage, target);
        actionFunction(target);
        
        return true;   
    }

    function actionAny(creep, gameType, opts, actionMessage, actionFunction) {
        var targets = creep.room.find(gameType, opts);
        if (!targets.length) {
            return false;
        }
        
        var target = targets[0];
        logAction(creep, actionMessage, target);
        actionFunction(target);
        
        return true;  
    }

    function actionNearest(creep, gameType, opts, actionMessage, actionFunction) {
        var target = creep.pos.findNearest(gameType, opts);
        if (target === undefined || target === null) {
            return false;
        }
        
        logAction(creep, actionMessage, target);
        actionFunction(target);
        
        return true;   
    }

    function attack(creep, target) {
        if (!creep.pos.inRangeTo(target.pos, creepUtil.firingRange(creep))) {
            creep.moveTo(target);
        }
        creep.attack(target);
        creep.rangedAttack(target); 
    }

    function attackNearest(creep, gameType, opts, messageType) {
        return actionNearest(creep, gameType, opts, 'attacking ' + messageType, function(target) {
            attack(creep, target);
        });
    }

    function attackAny(creep, gameType, opts, messageType) {
        return actionAny(creep, gameType, opts, 'attacking ' + messageType, function (target) {
            attack(creep, target);
        });
    }

    function moveToNearest(creep, gameType, opts, messageType) {
        return actionNearest(creep, gameType, opts, 'moving to ' + messageType, function (target) {
            creep.moveTo(target);
        });    
    }

    function attackNearestHostileCreep(creep) {
        return attackNearest(creep, Game.HOSTILE_CREEPS, { filter: creepUtil.shouldChaseFilter(creep, protectionRadius) }, 'creep');
    }

    function attackNearestHostileSpawn(creep) {
        return attackNearest(creep, Game.HOSTILE_CREEPS, { ignoreCreeps: true }, 'spawn');
    }

    function attackAnyHostileSpawn(creep) {
        return attackAny(creep, Game.HOSTILE_CREEPS, null, 'spawn');
    }

    function healNearestDamagedFriendly(creep) {
        function damagedFriendlyFilter(t) { return t.hits < t.hitsMax && creep.name !== t.name; }
        return actionNearest(creep, Game.MY_CREEPS, { filter: damagedFriendlyFilter }, 'healing', function(target) {
            creep.moveTo(target);
            creep.heal(target);
        });
    }

    function returnToNearestFlag(creep) {
        return moveToNearest(creep, Game.FLAGS, { ignoreCreeps: true }, 'flag');
    }

    function returnToNearestSpawn(creep) {
        return moveToNearest(creep, Game.MY_SPAWNS, { ignoreCreeps: true }, 'spawn');

    }

    function followClosestFriendlyRole(creep, targetRole) {
        function roleFilter(t) { return t.memory.role == targetRole; }
        return moveToNearest(creep, Game.MY_CREEPS, { filter: roleFilter }, targetRole);
    }

    return {
        attackNearestHostileCreep: attackNearestHostileCreep,
        attackNearestHostileSpawn: attackNearestHostileSpawn,
        attackAnyHostileSpawn: attackAnyHostileSpawn,
        healNearestDamagedFriendly: healNearestDamagedFriendly,
        returnToNearestFlag: returnToNearestFlag,
        returnToNearestSpawn: returnToNearestSpawn,
        followClosestFriendlyRole: followClosestFriendlyRole
    };
}());