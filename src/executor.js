module.exports = (function () {

    const log = loggerFactory("executor");
    return () => {
        for(const creepName in Game.creeps) {

            const creep = Game.creeps[creepName];
            var roleName = creep.memory.role;
            if (roleName === undefined || roleName === null) {
                // The creep doesn't know its role.  Try to figure it out from its name
                roleName = creepName.substr(0, creepName.indexOf('-'));
                if (roleName === undefined || roleName === null || roleName === '') {
                    log.error(() => "Creep " + creepName + " does not have a role, and could not infer role from name.");
                    continue;
                }
                creep.memory.role = roleName; 
                log.warn(() => "Creep " + creepName + " did not have a role.  Inferred role " + roleName + " from its name.");
            }
            log.debug(() => "executing role for creep " + creepName + " of role " + roleName);
            const role = roles[roleName];
            if (role !== undefined || role !== null) {
                role.run(creep);     
            }            
        };

        for(const structureId in Game.structures) {
            const structure = Game.structures[structureId];
            const structureRunner = structureRunners[structure.structureType] 
            if (structureRunner !== undefined && structureRunner !== null) {
                log.debug(() => "executing structure " + structure.structureType + " " + structureId);
                structureRunner.execution(structure);
            }
        };
    };
}());