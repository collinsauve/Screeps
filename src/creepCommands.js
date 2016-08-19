module.exports = (function () {

    const creepUtil = require('creepUtil');
    const log = loggerFactory('creepCommands');
    const protectionRadius = 5;

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

    function attack(actor, target) {
        //TODO: Structures can't move
        if (!actor.pos.inRangeTo(target.pos, creepUtil.firingRange(actor))) {
            actor.moveTo(target);
        }
        actor.attack(target);
        actor.rangedAttack(target); 
    }

    function attackNearest(actor, gameType, opts, messageType) {
        return actionNearest(actor, gameType, opts, 'attacking ' + messageType, function(target) {
            attack(actor, target);
        });
    }

    function attackAny(actor, gameType, opts, messageType) {
        return actionAny(actor, gameType, opts, 'attacking ' + messageType, function (target) {
            attack(actor, target);
        });
    }

    function moveToNearest(actor, gameType, opts, messageType) {
        return actionNearest(actor, gameType, opts, 'moving to ' + messageType, function (target) {
            actor.moveTo(target);
        });    
    }

    function attackAnyHostileCreep(actor) {
        return attackAny(actor, FIND_HOSTILE_CREEPS, null, 'creep');
    }
    
    function attackNearestHostileCreep(actor) {
        return attackNearest(actor, FIND_HOSTILE_CREEPS, { filter: creepUtil.shouldChaseFilter(actor, protectionRadius) }, 'creep');
    }

    function attackNearestHostileStructure(actor) {
        return attackNearest(actor, FIND_HOSTILE_SPAWNS, { ignoreCreeps: true }, 'spawn');
    }

    function attackNearestHostileSpawn(actor) {
        return attackNearest(actor, FIND_HOSTILE_SPAWNS, { ignoreCreeps: true }, 'spawn');
    }

    function attackAnyHostileSpawn(actor) {
        return attackAny(actor, FIND_HOSTILE_SPAWNS, null, 'spawn');
    }

    function attackAnyHostileStructure(actor) {
        return attackAny(actor, FIND_HOSTILE_STRUCTURES, null, 'structure');
    }

    function healNearestDamagedFriendly(actor) {
        //TODO: Requires actor to have a "name", therefore does not work for structures
        function damagedFriendlyFilter(t) { return t.hits < t.hitsMax && actor.name !== t.name; }
        return actionNearest(actor, FIND_MY_CREEPS, { filter: damagedFriendlyFilter }, 'healing', function(target) {
            //TODO: Structures can't move
            actor.moveTo(target);
            actor.heal(target);
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

    function buildClosestConstructionSite(actor) {
        return actionNearest(actor, FIND_CONSTRUCTION_SITES, null, 'building', function(target) {
            //TODO: Structures can't move
            actor.moveTo(target);
            actor.build(target);
        });
    }

    function upgradeController(actor) {

        var controller = actor.room.controller;
        if (controller == undefined || controller === null) {
            return false;
        }

        action(actor, controller, 'upgrading controller', () => {
            //TODO: Structures can't move
            actor.moveTo(controller);
            actor.upgradeController(controller);
        });
        return true;
    }

    function resetControllerDowngrade(actor) {
        var controller = actor.room.controller;
        //TODO: Make this so it is dynamic based on controller level
        //TODO: Find and assign a single builder to upgrade the controller.  
        //      This will currently send all builders over to the controller to upgrade it.
        if (controller !== undefined && controller !== null && controller.ticksToDowngrade < 4000) {
            action(actor, controller, 'reset controller', () => {
                //TODO: Structures can't move
                actor.moveTo(controller);
                actor.upgradeController(controller);
            });
            return true;
        }
        return false;
    }

    function getEnergy(actor) {

        return actionNearest(actor, FIND_MY_STRUCTURES, { filter: creepUtil.structureHasEnergy }, 'getting energy', target => {
            //TODO: Structures can't move
            actor.moveTo(target);
            actor.withdraw(target, RESOURCE_ENERGY);
        });
    }

    function getEnergyIfNeeded(actor) {
        if (!creepUtil.hasEnergy(actor)) {
            getEnergy(actor);
            return true;
        }
        return false;
    }

    function getEnergyIfNeededAndAvailableEnergyGreaterThan(actor, minimumAvailableEnergy) {
        
        if (actor.room.energyAvailable >= minimumAvailableEnergy) {
            return getEnergyIfNeeded(actor);
        }
        return true; //TODO: Is this correct?
    }

    function harvestEnergyIfNotFull(actor) {
        
        if (creepUtil.fullCarry(actor)) return false;
        
        const success = actionNearest(actor, FIND_SOURCES, { filter: creepUtil.sourceHasEnergy }, 'harvesting', target => {
            actor.moveTo(target);
            actor.harvest(target);
        });

        if (success === false) log.info(() => "could not find source with remaining energy");
        return success;
    }

    function storeEnergyIfAny(actor) {
        
        const storeIn = findSomewhereToStoreEnergy(actor);
        if (storeIn !== undefined && storeIn !== null) {
            action(actor, storeIn, 'storing energy', () => {
                //TODO: Structures can't move
                actor.moveTo(storeIn);
                actor.transfer(storeIn, RESOURCE_ENERGY);
            });
            return true;
        }
        return false;
    }

    function findSomewhereToStoreEnergy(actor) {
        const closestSpawn = actor.pos.findClosestByPath(FIND_MY_SPAWNS, { filter: spawn => !creepUtil.structureStorageIsFull(spawn) });
        if (closestSpawn !== null) {
            return closestSpawn;            
        }
        const closetStructue = actor.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: struct => !creepUtil.structureStorageIsFull(struct)  });
        return closetStructue;
    }

    function repairAnyStructureInRoom(actor) {
        //TODO: Can towers and builders repair themselves?
        return actionAny(actor, FIND_MY_STRUCTURES, { filter: s => s.hits < s.hitsMax }, 'repairing', function(target) {
            //TODO: If was a creep instead of a tower, would have to move
            actor.repair(target);            
        });
    }

    function repairAnyRoadInRoom(actor) {
        //TODO: Can towers and builders repair themselves?
        return actionAny(actor, FIND_STRUCTURES, { filter: s => s.structureType == STRUCTURE_ROAD && s.hits < s.hitsMax }, 'repairing', function(target) {
            //TODO: If was a creep instead of a tower, would have to move
            actor.repair(target);            
        });
    }

    function healAnyDamagedFriendlyInRoom(actor) {
        //TODO: If was a creep, would not be able to heal itself.  Add this check to the filter.
        return actionAny(actor, FIND_MY_CREEPS, { filter: target => target.hits < target.hitsMax }, 'healing', function(target) {
            //TODO: If was a creep instead of a tower, would have to move
            actor.heal(target);            
        });
    }

    return {
        attackAnyHostileCreep: attackAnyHostileCreep,
        attackNearestHostileCreep: attackNearestHostileCreep,
        attackNearestHostileSpawn: attackNearestHostileSpawn,
        attackAnyHostileSpawn: attackAnyHostileSpawn,
        attackAnyHostileStructure: attackAnyHostileStructure,
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
        healAnyDamagedFriendlyInRoom: healAnyDamagedFriendlyInRoom,
        repairAnyRoadInRoom: repairAnyRoadInRoom,
        getEnergyIfNeededAndAvailableEnergyGreaterThan: getEnergyIfNeededAndAvailableEnergyGreaterThan
    };
}());