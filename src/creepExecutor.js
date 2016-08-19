module.exports = (function () {

    const log = loggerFactory("creepExecutor");
    return () => {
        for(var creepName in Game.creeps) {

            var creep = Game.creeps[creepName];
            const roleName = creep.memory.role;
            log.debug(() => "executing role for creep " + creepName + " of role " + roleName);
            var role = roles[roleName];
            if (role === undefined || role === null || !creep.my || creep.hits <= 0) {
                return;     
            }
            role.execution(creep);
        };
    };
}());