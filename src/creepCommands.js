module.exports = (function () {

    const creepUtil = require('creepUtil');
    const log = loggerFactory('creepCommands');
    const protectionRadius = 5;

    function logAction(creep, action, target) {
        var suffix = target === undefined ? '' : ' target=' + target.name;
        log.debug(() => creep.name + " " + action + suffix); 
    }

    function action(creep, target, actionMessage, actionFunction) {
        if (target === undefined || target === null) {
            return false;
        }
        
        logAction(creep, actionMessage, target);
        creep.memory.target = target;
        creep.memory.actionMessage = actionMessage;
        actionFunction(target);

        return true;   
    }

    function actionAny(creep, gameType, opts, actionMessage, actionFunction) {
        var targets = creep.room.find(gameType, opts);
        if (!targets.length) {
            return false;
        }
        
        action(creep, targets[0], actionMessage, actionFunction);
        return true;  
    }

    function actionNearest(creep, gameType, opts, actionMessage, actionFunction) {
        var target = creep.pos.findClosestByPath(gameType, opts);
        if (target === undefined || target === null) {
            return false;
        }
        action(creep, target, actionMessage, actionFunction);
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
            creep.moveTo(target);
            creep.build(target);
        });
    }

    function upgradeController(creep) {

        var controller = creep.room.controller;
        action(creep, controller, 'upgrading controller', () => {
            creep.moveTo(controller);
            creep.upgradeController(controller);
        });
        return true;
    }

    function resetControllerDowngrade(creep) {
        var controller = creep.room.controller;
        //TODO: Make this so it is dynamic based on controller level
        //TODO: Find and assign a single builder to upgrade the controller.  
        //      This will currently send all builders over to the controller to upgrade it.
        if (controller.ticksToDowngrade < 4000) {
            action(creep, controller, 'reset controller', () => {
                creep.moveTo(controller);
                creep.upgradeController(controller);
            });
            return true;
        }
        return false;
    }

    function getEnergy(creep) {
        const target = Game.spawns.Spawn1;
        action(creep, target, 'getting energy', () => {
            creep.moveTo(target);
            creep.withdraw(target, RESOURCE_ENERGY);
        });
    }

    function getEnergyIfNeeded(creep) {
        if (!creepUtil.hasEnergy(creep)) {
            getEnergy(creep);
            return true;
        }
        return false;
    }

    function harvestEnergyIfNotFull(creep) {
        
        if(creepUtil.fullCarry(creep)) return false;
        
        var target = creep.pos.findClosestByPath(FIND_SOURCES, { filter: creepUtil.sourceHasEnergy });
        if (target !== undefined && target !== null) {
            action(creep, target, 'harvesting', () => {
                creep.moveTo(target);
                creep.harvest(target);
            });
            return true;
        } 
        log.info(() => "could not find source with remaining energy");
        return false;
    }

    function storeEnergyIfAny(creep) {
        
        const storeIn = findSomewhereToStoreEnergy(creep);
        if (storeIn !== undefined && storeIn !== null) {
            action(creep, storeIn, 'storing energy', () => {
                creep.moveTo(storeIn);
                creep.transfer(storeIn, RESOURCE_ENERGY);
            });
            return true;
        }
        return false;
    }

    function findSomewhereToStoreEnergy(creep) {
        const closestSpawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS, { filter: spawn => !creepUtil.structureStorageIsFull(spawn) });
        if (closestSpawn !== null) {
            return closestSpawn;            
        }
        const closetStructue = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: struct => !creepUtil.structureStorageIsFull(struct)  });
        return closetStructue;
    }

    function repairAnyStructureInRoom(tower) {
        return actionAny(tower, FIND_MY_STRUCTURES, { filter: s => s.hits < s.hitsMax }, 'repairing', function(target) {
            actor.repair(target);            
        });
    }

    function healAnyDamagedFriendlyInRoom(tower) {
        return actionAny(tower, FIND_MY_CREEPS, { filter: target => target.hits < target.hitsMax }, 'healing', function(target) {
            actor.heal(target);            
        });
    }

    return {
        attackNearestHostileCreep: attackNearestHostileCreep,
        attackNearestHostileSpawn: attackNearestHostileSpawn,
        attackAnyHostileSpawn: attackAnyHostileSpawn,
        healNearestDamagedFriendly: healNearestDamagedFriendly,
        returnToNearestFlag: returnToNearestFlag,
        returnToNearestSpawn: returnToNearestSpawn,
        followClosestFriendlyRole: followClosestFriendlyRole,
        buildClosestConstructionSite: buildClosestConstructionSite,
        upgradeController: upgradeController,
        resetControllerDowngrade: resetControllerDowngrade,
        getEnergy: getEnergy,
        getEnergyIfNeeded: getEnergyIfNeeded,
        harvestEnergyIfNotFull: harvestEnergyIfNotFull,
        storeEnergyIfAny: storeEnergyIfAny,
        repairAnyStructureInRoom: repairAnyStructureInRoom,
        healAnyDamagedFriendlyInRoom: healAnyDamagedFriendlyInRoom
    };
}());