module.exports = (function () {

    const creepUtil = require('creepUtil');
    const log = loggerFactory('creepCommands');
    const protectionRadius = 5;

    function logAction(creep, action, target) {
        var suffix = target === undefined ? '' : ' ' + target.name;
        log.debug(() => creep.name + action + suffix); 
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
        var target = creep.pos.findClosestByPath(gameType, opts);
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
        return attackNearest(creep, FIND_HOSTILE_CREEPS, { filter: creepUtil.shouldChaseFilter(creep, protectionRadius) }, 'creep');
    }

    function attackNearestHostileSpawn(creep) {
        return attackNearest(creep, FIND_HOSTILE_SPAWNS, { ignoreCreeps: true }, 'spawn');
    }

    function attackAnyHostileSpawn(creep) {
        return attackAny(creep, FIND_HOSTILE_SPAWNS, null, 'spawn');
    }

    function healNearestDamagedFriendly(creep) {
        function damagedFriendlyFilter(t) { return t.hits < t.hitsMax && creep.name !== t.name; }
        return actionNearest(creep, FIND_MY_CREEPS, { filter: damagedFriendlyFilter }, 'healing', function(target) {
            creep.moveTo(target);
            creep.heal(target);
        });
    }

    function returnToNearestFlag(creep) {
        return moveToNearest(creep, FIND_FLAGS, { ignoreCreeps: true }, 'flag');
    }

    function returnToNearestSpawn(creep) {
        return moveToNearest(creep, FIND_MY_SPAWNS, { ignoreCreeps: true }, 'spawn');

    }

    function followClosestFriendlyRole(creep, targetRole) {
        function roleFilter(t) { return t.memory.role == targetRole; }
        return moveToNearest(creep, FIND_MY_CREEPS, { filter: roleFilter }, targetRole);
    }

    function buildClosestConstructionSite(creep) {
        return actionNearest(creep, FIND_CONSTRUCTION_SITES, null, 'building', function(target) {
            creep.moveTo(targets);
            creep.build(targets);
        });
    }

    function upgradeController(creep) {

        var controller = creep.room.controller;
        log.debug(() => 'upgrading controller');
        creep.moveTo(controller);
        creep.upgradeController(controller);
        return true;
    }

    function resetControllerDowngrade(creep) {
        var controller = creep.room.controller;
        //TODO: Make this so it is dynamic based on controller level
        //TODO: Find and assign a single builder to upgrade the controller.  
        //      This will currently send all builders over to the controller to upgrade it.
        if (controller.ticksToDowngrade < 10000) {
            log.debug(() => 'going to reset controller');
            creep.moveTo(controller);
            creep.upgradeController(controller);
        }
    }

    function getEnergy(creep) {
        log.debug(() => 'getting energy');
        creep.moveTo(Game.spawns.Spawn1);
        creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY);
    }

    function getEnergyIfNeeded(creep) {
        if (!creepUtil.hasEnergy(creep)) {
            getEnergy(creep);
            return true;
        }
        return false;
    }

    return {
        attackNearestHostileCreep: attackNearestHostileCreep,
        attackNearestHostileSpawn: attackNearestHostileSpawn,
        attackAnyHostileSpawn: attackAnyHostileSpawn,
        healNearestDamagedFriendly: healNearestDamagedFriendly,
        returnToNearestFlag: returnToNearestFlag,
        returnToNearestSpawn: returnToNearestSpawn,
        followClosestFriendlyRole: followClosestFriendlyRole,
        upgradeController: resetControllerDowngrade,
        getEnergy: getEnergy,
        getEnergyIfNeeded: getEnergyIfNeeded
    };
}());