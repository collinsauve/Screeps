module.exports = (function () {

    var log = false;
    var calculateBuildCost = require('calculateBuildCost');
    var roleCounter = require('roleCounter');    
    var building = false;
    var waiting = false;

    function canBuild (spawn) {
        return !building && !waiting && (spawn.spawning === undefined || spawn.spawning === null);
    }
    
    function build (role, reason, spawn) {
        if (!canBuild(spawn)) {
            return;
        }    
        var buildCost = calculateBuildCost(role.body)
        if (log) {
            console.log('buildCost = ' + buildCost + '; spawn.energy = ' + spawn.energy + ';');
        }
        if (buildCost > spawn.energy) {
            if (log) {
                console.log('Not enough energy to build creep from ' + reason + ' of \'' + role.name + '\'.  ');
            }
            waiting = true;
            return;
        }
        console.log('Creating creep from ' + reason + ' of \'' + role.name + '\'');
        spawn.createCreep(role.body, undefined, { role: role.name });
        building = true;
    }
    
    return (spawn, roles, buildInstructions) => {

        var roleCounts = roleCounter(roles);
        buildInstructions.order.forEach( function(roleName, index) {
            var role = _.first(roles, r => r.name === roleName);
            var roleCount = _.first(roleCounts, rc => rc.role.name === roleName);
            if (roleCount.count < 1) {
                build(role, 'buildInstructions.order[' + index + ']', spawn);
                return;
            }
            
            roleCount.count--;
        });

        if (buildInstructions.infinite !== undefined && buildInstructions.infinite !== null) {
            var role = _.first(roles, r => r.name === buildInstructions.infinite);
            build(role, 'buildInstruction.infinite');
        }
    };
}());