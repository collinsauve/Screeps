module.exports = (function (category) {

    const levels = {
        error: 0,
        warning: 1,
        info: 2,
        debug: 3,
    };
    const minimumLevel = 1;

    function log(level, message) {
        if (level <= minimumLevel) {
            console.log(category + " - " + message);
        }
    }

    return {
        error: msg => log(levels.error, msg),
        warn: msg => log(levels.warning, msg),
        info: msg => log(levels.info, msg),
        debug: msg => log(levels.        , msg),
    };
}());