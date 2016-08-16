module.exports = (function () {

    var roleNames = [
        'harvester',
        'builder',
        'guard',
        'healer',
        'miner',
        'hauler',
        'archer'
    ];

    return roleNames.map(function (rn) { return require('role_' + rn);});
}());