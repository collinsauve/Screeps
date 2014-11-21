module.exports = [
    {
        name: 'harvester',
        execution: require('harvester'),
        body: [Game.WORK, Game.CARRY, Game.MOVE],
    },
    {
        name: 'builder',
        execution: require('builder'),
        body: [Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
    },
    {
        name: 'guard',
        execution: require('guard'),
        body: [Game.TOUGH, Game.TOUGH, Game.ATTACK, Game.MOVE, Game.MOVE],
    },
    {
        name: 'healer',
        execution: require('healer'),
        body: [Game.TOUGH, Game.MOVE, Game.HEAL, Game.MOVE],
    }
];