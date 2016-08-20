module.exports = (function () {

    //const log = loggerFactory("structure.tower");
    
    function execution(tower) {
        
        if (tower.energy < 10) return;

        //TODO: Attack hostiles
        commands.heal.healAnyDamagedFriendlyInRoom(tower) ||
        commands.repair.repairAnyStructureInRoom(tower) ||
        commands.repair.repairAnyRoadInRoom(tower)
    };

    return {
        name: STRUCTURE_TOWER,
        execution: execution
    }
}());