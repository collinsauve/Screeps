module.exports = function roleCounter(roles) {

    var creepRole = require('creepRole');
    var log = false;

    var roleCounts = roles.select( function (r) {
        return {
            role: r,
            count: 0
        };
    });
    
    function count(creep, role) {
        roleCounts.where( function (rc) { return rc.role === role; })
                  .forEach( function (rc) { rc.count++; });
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