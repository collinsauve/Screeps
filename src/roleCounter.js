module.exports = (function () {
    
    const log = loggerFactory('roleCounter');
   
    return () => {

        var roleCounts = {};
        for(var creepName in Game.creeps) {

            var creep = Game.creeps[creepName];
            const roleName = creep.memory.role;
            var role = roles[roleName];
            var count = roleCounts[roleName];
            if (count === undefined) count = 0;
            roleCounts[roleName] = count + 1;
        }
        roleCounts.forEach(() => {
            log.debug(() => roleCount.role.name + ' = ' + roleCount.count);
        });
        
        return roleCounts;
    }
}());