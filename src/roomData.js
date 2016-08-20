module.exports = (function () {

    const log = loggerFactory('roomData');
    var rooms = {};

    function get(room) {
        var currentRoom = rooms[room.name];
        if (currentRoom !== undefined && currentRoom !== null) {
            return currentRoom;
        }
        currentRoom = build(room);
        rooms[room.name] = currentRoom;
        return currentRoom;
    }    

    function build(room) {

        log.debug('Building room data');
                
        const energyAvailable = room.energyAvailable;
        const mySpawnsAll = room.find(FIND_MY_SPAWNS);
        
        const myCreepsAll = room.find(FIND_MY_CREEPS);
        const myCreeps = {
            all: myCreepsAll
        };
        const myStructuresAll = room.find(FIND_MY_STRUCTURES);
        const myStructures = {
            all: myStructuresAll,
        };

        const myConstructionSitesAll = room.find(FIND_MY_CONSTRUCTION_SITES);
        const myConstructionSites = {
            all: myConstructionSitesAll,
            nonRoads: _.filter(cs => cs.structureType !== STRUCTURE_ROAD),
            roads: _.filter(cs => cs.structureType === STRUCTURE_ROAD),
        };


        const my = {
            structures: myStructures,
            constructionSites: myConstructionSites,
            creeps: myCreeps,
            
        };

        return {
            energyAvailable,
            my
        };
    }

    return {
        get
    };
}());