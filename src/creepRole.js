module.exports = (function () {

    const log = loggerFactory('creepRole');
    return (executionFn) => {
        for(var creepName in Game.creeps) {
            var creep = Game.creeps[creepName];
            var roleName = creep.memory.role;
            log.debug(() => "executing role for creep " + creepName + " of role " + roleName);
            var role = linq.firstOrDefault(roles, r => r.name === roleName);
            if (role === undefined || role === null || !creep.my || creep.hits <= 0) {
                return;     
            }
            executionFn(creep, role);
        };
    };
}());