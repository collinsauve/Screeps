module.exports = (function () {

    return (roles) => {
        var creepRole = require('creepRole');
        creepRole(roles, function(creep, role) {
            role.execution(creep);        
        });
    };
}());