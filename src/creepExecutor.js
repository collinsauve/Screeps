module.exports = (function () {

    return () => {
        var creepRole = require('creepExecutor');
        creepRole(function(creep, role) {
            role.execution(creep);        
        });

        Game.creeps.forEach(creep => {

            const roleName = creep.memory.role;
            log.debug(() => "executing role for creep " + creepName + " of role " + roleName);
            var role = roles[roleName];
            if (role === undefined || role === null || !creep.my || creep.hits <= 0) {
                return;     
            }
            role.execution(creep);
        });
    };
}());