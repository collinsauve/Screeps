module.exports = [
    {
        name: 'harvester',
        execution: require('harvester'),
        minimum: 1,
        current: 0,
        body: [Game.WORK, Game.CARRY, Game.MOVE],
        rank: 1
    },
    {
        name: 'builder',
        execution: require('builder'),
        minimum: 0,
        current: 0,
        body: [Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
        rank: 2
    },
    {
        name: 'guard',
        execution: require('guard'),
        minimum: 10,
        current: 0,
        body: [Game.TOUGH, Game.ATTACK, Game.MOVE, Game.MOVE],
        rank: 3
    }
];