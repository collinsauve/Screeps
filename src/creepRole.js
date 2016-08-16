module.exports = (function () {

    var _ = require('linq');
    return (roles, executionFn) => {
        for(var creepName in Game.creeps) {
            var creep = Game.creeps[creepName];
            var roleName = creep.memory.role;
            var role = _.firstOrDefault(roles, r => r.name === roleName);
            if (role === undefined || role === null || !creep.my || creep.hits <= 0) {
                return;     
            }
            executionFn(creep, role);
        };
    };
}());