module.exports = (function () { 

    var log = false;
    var _ = require('linq')();	

    return (x, y) => {	
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
    };
}());