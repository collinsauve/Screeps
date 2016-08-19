module.exports = (function () {
    
    const log = loggerFactory('roleCounter');
   
    return () => {
        var creepRole = require('creepRole');
        var roleCounts = roles.map(r => {
            return {
                role: r,
                count: 0
            };
        });
        
        creepRole((creep, role) => {
            roleCounts.filter(rc => rc.role === role)
                      .forEach(rc => rc.count++);
        }); 
        
        roleCounts.forEach(() => {
            log.debug(() => roleCount.role.name + ' = ' + roleCount.count);
        });
        
        return roleCounts;
    }
}());