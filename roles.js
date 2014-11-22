var roleNames = ['harvester', 'builder', 'guard', 'healer', 'miner', 'hauler'];
module.exports = roleNames.select( function (rn) { return require('role_' + rn); } );