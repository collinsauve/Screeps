module.exports = (roles) => {
    var creepRole = require('creepRole');
    creepRole(roles, function(creep, role) {
        role.execution(creep);        
    });
};