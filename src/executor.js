module.exports = (function () {

    const log = loggerFactory("executor");
    return () => {
        for(const creepName in Game.creeps) {

            const creep = Game.creeps[creepName];
            const roleName = creep.memory.role;
            log.debug(() => "executing role for creep " + creepName + " of role " + roleName);
            const role = roles[roleName];
            if (role !== undefined || role !== null) {
                role.execution(creep);     
            }            
        };

        for(const structureId in Game.structures) {
            const structure = Game.structures[structureId];
            const structureRunner = structures[structure.structureType] 
            if (structureRunner !== undefined && structureRunner !== null) {
                log.debug(() => "executing structure " + structure.structureType + " " + structureId);
                structureRunner.execution(structure);
            }
        };
    };
}());