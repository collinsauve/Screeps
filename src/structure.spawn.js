module.exports = (function () {

    const log = loggerFactory("structure.spawn");
    const roleCounter = require('roleCounter');    
    var building = false;
    var waiting = false;

    function canBuild (spawn) {
        return !building && !waiting && (spawn.spawning === undefined || spawn.spawning === null);
    }
    
    function tryBuild (roleName, role, reason, spawn) {
        if (!canBuild(spawn)) {
            return;
        }  

        // Find the body for this role
        const bodyName = roleName + "-1";
        const body = bodies[bodyName]; //TODO: Economy-tracker      
        if (body === undefined || body === null) {
            throw "Could not find body " + bodyName; 
        }
        const canCreate = spawn.canCreateCreep(body.parts);
        if (canCreate === ERR_NOT_ENOUGH_ENERGY) {
            log.debug(() => 'Not enough energy to build creep from ' + reason + ' of \'' + role.name + '\' with body \'' + bodyName + '\'.');            
            waiting = true;
            return;
        }
        const name = bodyName + '-' + util.uuid();
        log.info(() => 'Creating creep \'' + name + '\' from ' + reason);
        spawn.createCreep(body.parts, name, { role: role.name });
        building = true;
    }
    
    function execution(spawn) {

        const roleCounts = roleCounter();        
        buildInstructions.order.forEach((roleName, index) => {

            if (waiting) return;

            const role = roles[roleName];
            var roleCount = roleCounts[roleName];
            if (roleCount === undefined) roleCount = 0;
            if (roleCount < 1) {
                tryBuild(roleName, role, 'buildInstructions.order[' + index + ']', spawn);
                return;
            }
            
            roleCounts[roleName] = roleCount - 1;
        });

        if (buildInstructions.infinite !== undefined && buildInstructions.infinite !== null) {
            const role = roles[buildInstructions.infinite];
            tryBuild(role, 'buildInstruction.infinite', spawn);
        }
    };

    return {
        name: STRUCTURE_SPAWN,
        execution: execution
    }
}());