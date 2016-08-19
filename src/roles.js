module.exports = (function () {

    const linq = require('core.linq');
    var roleNames = [
        'harvester',
        'builder',
        'guard',
        'healer',
        'miner',
        'hauler',
        'archer'
    ];

    const roles = _.map(roleNames, rn => require('role.' + rn));
    return linq.keyBy(roles, 'name');
}());