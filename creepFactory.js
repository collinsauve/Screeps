var log = false;
module.exports = function creepFactory(spawn, roles, buildInstructions) {
    var roleCounter = require('roleCounter');
    var roleCounts = roleCounter(roles);
    var building = false;

    function isBuilding() {
        return building || (spawn.spawning !== undefined && spawn.spawning !== null);
    }
    
    buildInstructions.order.forEach( function(roleName, index) {
        if (log) {
            console.log('looking at buildInstruction.order[' + index + '] of \'' + roleName + '\'');
        }
        
        if (isBuilding()) {
            return;
        }
        
        var role = roles.firstOrDefault( function (r) { return r.name === roleName; } );
        var roleCount = roleCounts.firstOrDefault( function (rc) { return rc.role.name === roleName; } );
        if (role === undefined || role === null || roleCount === undefined || roleCount === null) {
            console.log('Warning: Could not understand buildInstructions.order[' + index + '] of \'' + roleName + '\'');
            return;
        }

        if (roleCount.count < 1) {
            console.log('Creating creep from buildInstruction.order[' + index + '] of \'' + role.name + '\'');
            spawn.createCreep(role.body, undefined, { role: role.name });
            building = true;
            return;
        }
        
        if (log) {
            console.log('decrementing roleCount.count for buildInstruction.order[' + index + '] of \'' + roleName + '\'.  Current count is ' + roleCount.count);
        }        
        roleCount.count--;
    });
    
    if (isBuilding()) {
        return;
    }
    
    var role = roles.firstOrDefault( function (r) { return r.name === buildInstructions.infinite; } );
    if (role === undefined || role === null) {
        console.log('Warning: Could not understand buildInstructions.infinite of \'' + buildInstructions.infinite + '\'');
        return;
    }
    console.log('Creating creep from buildInstruction.infinite of \'' + buildInstructions.infinite + '\'');
    spawn.createCreep(role.body, undefined, { role: role.name });
};