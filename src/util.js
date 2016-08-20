module.exports = (function () {
    function uuid() {
        return Math.floor((1 + Math.random()) * 0x10000000000000)
        .toString(16)
        .substring(1);
    }

    function calculateBuildCost(parts) {
        var partCosts = _.map(parts, p => BODYPART_COST[p]);
        return _.sum(partCosts);
    }

    function loadFolder(folderName, fileNames) {
        const files = _.map(fileNames, name => {
            return { 
                name,
                contents: require(folderName + '.' + name)
            };
        });
        return linq.keyBy(files, 'name');
    }

    return {
        uuid: uuid,
        calculateBuildCost: calculateBuildCost,
        loadFolder: loadFolder
    };
}());