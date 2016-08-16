module.exports = (function () {

    var log = require("log")("creepFactory");
    var calculateBuildCost = require('calculateBuildCost');
    var roleCounter = require('roleCounter');    
    var building = false;
    var waiting = false;

    function canBuild (spawn) {
        return !building && !waiting && (spawn.spawning === undefined || spawn.spawning === null);
    }
    
    function tryBuild (role, reason, spawn) {
        if (!canBuild(spawn)) {
            return;
        }    
        var buildCost = calculateBuildCost(role.body)
        log.debug('buildCost = ' + buildCost + '; spawn.energy = ' + spawn.energy + ';');

        if (buildCost > spawn.energy) {
            log.debug('Not enough energy to build creep from ' + reason + ' of \'' + role.name + '\'.  ');            
            waiting = true;
            return;
        }
        log.info('Creating creep from ' + reason + ' of \'' + role.name + '\'');
        spawn.createCreep(role.body, undefined, { role: role.name });
        building = true;
    }
    
    return (spawn, roles, buildInstructions) => {

        var roleCounts = roleCounter(roles);
        buildInstructions.order.forEach((roleName, index) => {
            var role = _.first(roles, r => r.name === roleName);
            var roleCount = _.first(roleCounts, rc => rc.role.name === roleName);
            if (roleCount.count < 1) {
                tryBuild(role, 'buildInstructions.order[' + index + ']', spawn);
                return;
            }
            
            roleCount.count--;
        });

        if (buildInstructions.infinite !== undefined && buildInstructions.infinite !== null) {
            var role = _.first(roles, r => r.name === buildInstructions.infinite);
            tryBuild(role, 'buildInstruction.infinite', spawn);
        }
    };
}());