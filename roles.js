var roleNames = ['harvester', 'builder', 'guard', 'healer'];
module.exports = roleNames.select( function (rn) { return require('role_' + rn); } );