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

    const roles = _.map(roleNames, rn => require('role.' + rn));
    return _.keyBy(roles, 'name');
}());