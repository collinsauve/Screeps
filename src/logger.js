module.exports = (function () {

    return (category, minimumLevel) => {
        const levels = {
            error: 0,
            warning: 1,
            info: 2,
            debug: 3,
        };
        const levelAbbrev = ['E', 'W', 'I', 'D'];
        const defaultMinimumLevel = levels.info;
        if (minimumLevel === undefined) minimumLevel = defaultMinimumLevel;

        function log(level, message) {
            if (level <= minimumLevel) {
                console.log(levelAbbrev + ':' + category + ": " + message);
            }
        }

        return {
            error: msg => log(levels.error, msg),
            warn: msg => log(levels.warning, msg),
            info: msg => log(levels.info, msg),
            debug: msg => log(levels.debug, msg),
        };
    };
}());