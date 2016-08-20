module.exports = (function () {

    const protectionRadius = 5;

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
    
    return {
        attack,
        attackNearest,
        attackAny,
        attackAnyHostileCreep,
        attackNearestHostileCreep,
        attackNearestHostileStructure,
        attackNearestHostileSpawn,
        attackAnyHostileSpawn,
        attackAnyHostileStructure
    };
});