module.exports = (function () {
    return parts => {
        var partCosts = _.map(parts, p => BODYPART_COST[p]);
        return _.sum(partCosts);
    };
}());