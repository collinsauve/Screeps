module.exports = (function () {

    const linq = require('core.linq');
    var structureNames = [
        'spawn',
        'tower'
    ];

    const structureRunners = _.map(structureNames, rn => require('structure.' + rn));
    return linq.keyBy(structureRunners, 'name');
}());