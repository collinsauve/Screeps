var creepCommands = require('creepCommands');

module.exports = {
    name: 'guard',
    body: [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.MOVE, Game.ATTACK],
    execution: function guard(creep) {
        creepCommands.attackNearestHostile(creep) ||
        creepCommands.returnToNearestSpawn(creep);
    }
};