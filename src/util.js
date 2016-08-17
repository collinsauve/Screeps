module.exports = (function () {
    function uuid() {
        return Math.floor((1 + Math.random()) * 0x10000000000000)
        .toString(16)
        .substring(1);
    }

    return {
        uuid: uuid
    };
}());