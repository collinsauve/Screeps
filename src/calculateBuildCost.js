module.exports = function calculateBuildCost(parts) {	
    var costs = [
        { part: MOVE, cost: 50 },
        { part: WORK, cost: 20 },
        { part: CARRY, cost: 50 },
        { part: ATTACK, cost: 100 },
        { part: RANGED_ATTACK, cost: 150 },
        { part: HEAL, cost: 200 },
        { part: TOUGH, cost: 5 }
    ];
    
    var partCosts = parts.select( function (p) { 
        return costs.first(c => c.part === p).cost;
    });
    return partCosts.sum();
}