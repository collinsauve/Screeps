var creepRole = require('creepRole');
module.exports = function roleExecutor(roles) {
    creepRole(roles, function(creep, role) {
        role.execution(creep);        
    });
};