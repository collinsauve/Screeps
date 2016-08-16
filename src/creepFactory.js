var log = false;
var calculateBuildCost = require('calculateBuildCost');
module.exports = function creepFactory (spawn, roles, buildInstructions) {
    var roleCounter = require('roleCounter');
    var roleCounts = roleCounter(roles);
    var building = false;
    var waiting = false;
    
    function canBuild () {
        return !building && !waiting && (spawn.spawning === undefined || spawn.spawning === null);
    }
    
    function build (role, reason) {
        if (!canBuild()) {
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
    
    buildInstructions.order.forEach( function(roleName, index) {
        var role = _.first(roles, r => r.name === roleName);
        var roleCount = _.first(roleCounts, rc => rc.role.name === roleName);
        if (roleCount.count < 1) {
            build(role, 'buildInstructions.order[' + index + ']');
            return;
        }
        
        roleCount.count--;
    });

    if (buildInstructions.infinite !== undefined && buildInstructions.infinite !== null) {
        var role = _.first(roles, r => r.name === buildInstructions.infinite);
        build(role, 'buildInstruction.infinite');
    }
};