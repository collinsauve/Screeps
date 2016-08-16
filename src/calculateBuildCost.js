module.exports = (function () {
    var _ = require('linq')();	
    var costs = [
        { part: MOVE, cost: 50 },
        { part: WORK, cost: 20 },
        { part: CARRY, cost: 50 },
        { part: ATTACK, cost: 100 },
        { part: RANGED_ATTACK, cost: 150 },
        { part: HEAL, cost: 200 },
        { part: TOUGH, cost: 5 }
    ];
    
    return parts => {
        var partCosts = _.map(parts, p => _.first(costs.filter(c => c.part === p)).cost);
        return _.sum(partCosts);
    };
}());