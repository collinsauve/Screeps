module.exports = (function () {

    function getEnergy(actor) {

        function act(target) {
            //TODO: Structures can't move
            actor.moveTo(target);
            actor.withdraw(target, RESOURCE_ENERGY);
        }

        const rd = roomData.get(actor.room);

        // If there is a container, only get energy from there    
        if (rd.hasContainer) {
            return action.nearest(actor, rd.containersWithEnergy, null, 'getting energy', act);    
        } 

        // Get energy from anywhere
        return action.nearest(actor, FIND_MY_STRUCTURES, { filter: creepUtil.structureHasEnergy }, 'getting energy', act);
    }

    function getEnergyIfNeeded(actor) {

        if (creepUtil.hasEnergy(actor)) return false;
        getEnergy(actor);
        return true;
    }

    function getEnergyIfNeededAndAvailableEnergyGreaterThan(actor, minimumAvailableEnergy) {

        if (creepUtil.hasEnergy(actor)) return false;
        if (roomData.get(actor.room).energyAvailable < minimumAvailableEnergy) return true;
        getEnergy(actor);
        return true;
    }

    function harvestEnergyIfNotFull(actor) {
        
        if (creepUtil.fullCarry(actor)) return false;
        
        const success = action.nearest(actor, FIND_SOURCES, { filter: creepUtil.sourceHasEnergy }, 'harvesting', target => {
            actor.moveTo(target);
            actor.harvest(target);
        });

        if (success === false) log.info(() => "could not find source with remaining energy");
        return success;
    }

    function storeEnergyIfAny(actor) {
        
        const storeIn = findSomewhereToStoreEnergy(actor);
        if (storeIn !== undefined && storeIn !== null) {
            action.specific(actor, storeIn, 'storing energy', () => {
                //TODO: Structures can't move
                actor.moveTo(storeIn);
                actor.transfer(storeIn, RESOURCE_ENERGY);
            });
            return true;
        }
        return false;
    }

    function findSomewhereToStoreEnergy(actor) {
        return actor.pos.findClosestByPath(roomData.get(actor.room).storageDestinations);
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