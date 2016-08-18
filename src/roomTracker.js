module.exports = (function () {

    const log = loggerFactory('roomTracker');
    var rooms = {};
    function initialize(room) {
        const currentRoom = rooms[room.name];
        if (currentRoom !== undefined || currentRoom !== null) {
            log.warn(() => "Room " + room.name + "was already initialized");
            return;
        }
        
        const energyAvailable = room.energyAvailable;
        const mySpawns = room.find(FIND_MY_SPAWNS);
        const myCreeps = room.find(FIND_MY_CREEPS);
        const myStructures = room.find(FIND_MY_STRUCTURES);
        const myConstructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);

        rooms[room.name] = {
            energyAvailable: energyAvailable
        };
    }

    return {

    };
}());