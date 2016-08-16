module.exports = (function () {
    return {
        distance: function absoluteDistance(pos1, pos2) {
            if (pos1.x === undefined && pos1.pos !== undefined) {
                pos1 = pos1.pos;
            }
            if (pos2.x === undefined && pos2.pos !== undefined) {
                pos2 = pos2.pos;
            }
            return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
        }
    }
}());