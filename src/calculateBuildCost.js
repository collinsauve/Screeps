module.exports = function calculateBuildCost(parts) {	
    var costs = [
        { part: Game.MOVE, cost: 50 },
        { part: Game.WORK, cost: 20 },
        { part: Game.CARRY, cost: 50 },
        { part: Game.ATTACK, cost: 100 },
        { part: Game.RANGED_ATTACK, cost: 150 },
        { part: Game.HEAL, cost: 200 },
        { part: Game.TOUGH, cost: 5 }
    ];
    
    var partCosts = parts.select( function (p) { 
        return costs.first( function(c) { return c.part === p; }).cost;
    });
    return partCosts.sum();
}