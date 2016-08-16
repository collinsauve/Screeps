var roleNames = [
    'harvester',
    'builder',
    'guard',
    'healer',
    'miner',
    'hauler',
    'archer'
];
module.exports = roleNames.select( function (rn) { return require('role_' + rn); } );