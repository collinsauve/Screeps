module.exports = (function () {

    const log = loggerFactory("creepSpawner");
    const roleCounter = require('roleCounter');    
    var building = false;
    var waiting = false;

    function canBuild (spawn) {
        return !building && !waiting && (spawn.spawning === undefined || spawn.spawning === null);
    }
    
    function tryBuild (role, reason, spawn) {
        if (!canBuild(spawn)) {
            return;
        }    
        const buildCost = util.calculateBuildCost(role.body)
        log.debug(() => 'buildCost = ' + buildCost + '; spawn.energy = ' + spawn.energy + ';');

        if (buildCost > spawn.energy) {
            log.debug(() => 'Not enough energy to build creep from ' + reason + ' of \'' + role.name + '\'.  ');            
            waiting = true;
            return;
        }
        const name = role.name + '-' + util.uuid();
        log.info(() => 'Creating creep \'' + name + '\' from ' + reason);
        spawn.createCreep(role.body, name, { role: role.name });
        building = true;
    }
    
    return (spawn, buildInstructions) => {

        const roleCounts = roleCounter();        
        buildInstructions.order.forEach((roleName, index) => {
            const role = roles[roleName];
            var roleCount = roleCounts[roleName];
            if (roleCount === undefined) roleCount = 0;
            if (roleCount.count < 1) {
                tryBuild(role, 'buildInstructions.order[' + index + ']', spawn);
                return;
            }
            
            roleCounts[roleName] = roleCount - 1;
        });

        if (buildInstructions.infinite !== undefined && buildInstructions.infinite !== null) {
            const role = roles[buildInstructions.infinite];
            tryBuild(role, 'buildInstruction.infinite', spawn);
        }
    };
}());