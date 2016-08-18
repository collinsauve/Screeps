module.exports = (function () {

    return () => {
        var creepRole = require('creepRole');
        creepRole(function(creep, role) {
            role.execution(creep);        
        });
    };
}());