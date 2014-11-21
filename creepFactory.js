module.exports = function (spawn, roles) {
    var building = false;
    roles.forEach( function(role) {
        if (!building && role.current < role.minimum) {
            spawn.createCreep(role.body, undefined, { role: role.name });
            building = true;
        }
    });
};