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

    return roleNames.map(rn => require('role_' + rn)());
}