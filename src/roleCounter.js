module.exports = (function () {
    
    const log = loggerFactory('roleCounter');
   
    return () => {

        var roleCounts = {};
        for(var creepName in Game.creeps) {

            const creep = Game.creeps[creepName];
            const roleName = creep.memory.role;
            const role = roles[roleName];
            var count = roleCounts[roleName];
            if (count === undefined) count = 0;
            roleCounts[roleName] = count + 1;
        }

        log.debug(() => {
            var msg = "";
            for(var roleName in roleCounts) {
                msg = msg + name + '=' + roleCount.count + ", ";
            }
            return msg;
        });
        return roleCounts;
    }
}());