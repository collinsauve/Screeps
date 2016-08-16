module.exports = () => {

    var roleNames = [
        'harvester',
        'builder',
        'guard',
        'healer',
        'miner',
        'hauler',
        'archer'
    ];

    return roleNames.select((rn) => require('role_' + rn)());
}