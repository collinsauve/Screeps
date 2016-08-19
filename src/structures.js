module.exports = (function () {

    const linq = require('core.linq');
    var structureNames = [
        'spawn',
        'tower'
    ];

    const roles = _.map(roleNames, rn => require('structure.' + rn));
    return linq.keyBy(roles, 'name');
}());