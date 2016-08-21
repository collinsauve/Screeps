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

        log.debug(() => 'Building room data');

        const allStructures = room.find(FIND_STRUCTURES);

        const energyAvailable = room.energyAvailable;
        const mySpawnsAll = room.find(FIND_MY_SPAWNS);
        
        const myCreepsAll = room.find(FIND_MY_CREEPS);
        const myCreeps = {
            all: myCreepsAll
        };
        const myStructuresAll = room.find(FIND_MY_STRUCTURES);
        const storageDestinationTypes = [STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_STORAGE, STRUCTURE_TOWER, STRUCTURE_CONTAINER];
        const myStructures = {
            all: myStructuresAll,
        };

        const myConstructionSitesAll = room.find(FIND_MY_CONSTRUCTION_SITES);
        const myConstructionSites = {
            all: myConstructionSitesAll,
            nonRoads: _.filter(cs => cs.structureType !== STRUCTURE_ROAD),
            roads: _.filter(cs => cs.structureType === STRUCTURE_ROAD),
        };
        
        const containers = _.filter(allStructures, s => s.structureType === STRUCTURE_CONTAINER);
        const nonFullContainers = _.filter(containers, c=> !creepUtil.structureStorageIsFull(c));
        const myStorageDestinations = _.filter(myStructuresAll, s => linq.contains(storageDestinationTypes, s.structureType) && !creepUtil.structureStorageIsFull(s));
        const storageDestinations = linq.concat(myStorageDestinations, nonFullContainers);
        const my = {
            structures: myStructures,
            constructionSites: myConstructionSites,
            creeps: myCreeps            
        };
        const hasContainer = containers.length > 0;
        const containersWithEnergy = _.filter(containers, creepUtil.structureStorageIsFull);

        return {
            energyAvailable,
            containers,
            containersWithEnergy,
            storageDestinations,
            my,
            hasContainer
        };
    }

    return {
        get
    };
}());