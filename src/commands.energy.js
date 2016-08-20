module.exports = (function () {

    function getEnergy(actor) {

        return actionNearest(actor, FIND_MY_STRUCTURES, { filter: creepUtil.structureHasEnergy }, 'getting energy', target => {
            //TODO: Structures can't move
            actor.moveTo(target);
            actor.withdraw(target, RESOURCE_ENERGY);
        });
    }

    function getEnergyIfNeeded(actor) {

        if (creepUtil.hasEnergy(actor)) return false;
        getEnergy(actor);
        return true;
    }

    function getEnergyIfNeededAndAvailableEnergyGreaterThan(actor, minimumAvailableEnergy) {
        
        if (creepUtil.hasEnergy(actor)) return false;
        if (actor.room.energyAvailable < minimumAvailableEnergy) return true;
        getEnergy(actor);
        return true;
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
    
    return {
        getEnergy,
        getEnergyIfNeeded,
        getEnergyIfNeededAndAvailableEnergyGreaterThan,
        harvestEnergyIfNotFull,
        storeEnergyIfAny,
        findSomewhereToStoreEnergy
    };
}());