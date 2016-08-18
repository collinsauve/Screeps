module.exports = (function () {

    return (category, minimumLevel) => {
        const levels = constants.logLevels
        const levelAbbrev = ['E', 'W', 'I', 'D'];
        const defaultMinimumLevel = levels.info;
        if (minimumLevel === undefined) minimumLevel = defaultMinimumLevel;

        function log(level, message) {
            if (level <= minimumLevel) {
                console.log(levelAbbrev[level] + ':' + category + ": " + message());
            }
        }

        return {
            error: msg => log(levels.error, msg),
            warn: msg => log(levels.warning, msg),
            info: msg => log(levels.info, msg),
            debug: msg => log(levels.debug, msg),
            levels: levels
        };
    };
}());