module.exports = function (roles) {
    for(var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];
        var roleName = creep.memory.role;
        var role = roles.firstOrDefault(function(r) { return r.name === roleName; });
        if (role !== undefined && role !== null && creep.my && creep.hits > 0) {
            role.execution(creep);        
        }
    }
};