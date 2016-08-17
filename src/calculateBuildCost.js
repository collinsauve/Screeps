module.exports = (function () {
    var _ = require('linq');	
    return parts => {
        var partCosts = _.map(parts, p => BODYPART_COST[p]);
        return _.sum(partCosts);
    };
}());