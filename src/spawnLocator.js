module.exports = (function () { 

    const log = loggerFactory('spawnLocator');
    return (x, y) => {	
        var spawns = Object.keys(Game.spawns);
        var spawnName = linq.firstOrDefault(spawns);
        if (spawnName === undefined || spawnName === null) {
            //TODO: Create spawn at x, y
            return null;
        }
        log.debug(() => 'Found spawn: \'' + spawnName + '\'');
        return Game.spawns[spawnName];
    };
}());