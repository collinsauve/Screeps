module.exports = (function () {

    //const log = loggerFactory("structure.tower");
    
    function execution(tower) {
        
        if (tower.energy < 10) return;

        //TODO: Attack hostiles
        creepCommands.healAnyDamagedFriendlyInRoom(tower) ||
        creepCommands.repairAnyStructureInRoom(tower) ||
        creepCommands.repairAnyRoadInRoom(tower)
    };

    return {
        name: STRUCTURE_TOWER,
        execution: execution
    }
}());