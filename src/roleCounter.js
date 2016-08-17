module.exports = (function () {
    
    function logRoleCount(roleCount) {
        console.log(roleCount.role.name + ' = ' + roleCount.count);
    }
    
    return (roles) => {
        var creepRole = require('creepRole');
        var log = false;

        var roleCounts = roles.map(r => {
            return {
                role: r,
                count: 0
            };
        });
        
        creepRole(roles, (creep, role) => {
            roleCounts.filter(rc => rc.role === role)
                      .forEach(rc => rc.count++);
        }); 
        
        if (log) {
            roleCounts.forEach(logRoleCount);
        }
        
        return roleCounts;
    }
}());