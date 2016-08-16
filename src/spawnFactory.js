module.exports = function spawnFactory(x, y) {

    var log = false;
    var _ = require('linq')();		
    var spawns = Object.keys(Game.spawns);
    var spawnName = _.firstOrDefault(spawns);
    if (spawnName === undefined || spawnName === null) {
        //TODO: Create spawn at x, y
        return null;
    }
    if (log) {
        console.log('Found spawn: \'' + spawnName + '\'');
    }
    return Game.spawns[spawnName];
}