module.exports = function roleCounter(roles) {

    var creepRole = require('creepRole');
    var log = false;

    var roleCounts = roles.map(r => {
        return {
            role: r,
            count: 0
        };
    });
    
    function count(creep, role) {
        roleCounts.filter(rc => rc.role === role)
                  .forEach(rc => rc.count++);
    }
    
    function logRoleCount(roleCount) {
        console.log(roleCount.role.name + ' = ' + roleCount.count);
    }
    
    creepRole(roles, count); 
    
    if (log) {
        roleCounts.forEach(logRoleCount);
    }
    
    return roleCounts;
};