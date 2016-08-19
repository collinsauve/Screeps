module.exports = (function () {

    //const log = loggerFactory("structure.tower");
    
    function execution(tower) {
        
        //TODO: If no resources, don't do anything
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