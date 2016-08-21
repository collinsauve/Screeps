module.exports = (function () {

    //const log = loggerFactory("structure.tower");
    
    function execution(tower) {
        
        if (tower.energy < 10) return;

        //TODO: Attack hostiles
        commands.heal.healAnyDamagedFriendlyInRoom(tower) ||
        commands.repair.my(tower) ||
        commands.repair.neutral(tower)
    };

    return {
        name: STRUCTURE_TOWER,
        execution: execution
    }
}());