module.exports = (function () {

    function mergeSelect(array1, array2, fn) {
        var result = [];
        if (array1.length != array2.length) {
            throw "Cannot merge arrays of different lengths";
        }
        for (var i = 0; i < array1.length; i++) {
            result.push(fn(array1[i], array2[i]));
        }
        return result;
    };

    function reduce(array, accum, fn) {
        for (var index = 0; index < array.length; ++index) {
            accum = fn(accum, array[index], index);
        }
        return accum;
    };

    function firstOrDefault(array, fn) {
        if (fn !== undefined && fn !== null) {
            array = array.filter(fn);
        }
        if (array.length == 0) {
            return null;
        }
        return array[0];
    }

    return {
        map: (array, fn) => array === null || array === undefined ? [] : array.map(fn), 
        selectMany: function (array, fn) {
            var result1 = array.select(fn);
            var result2 = [];
            result1.forEach(a => a.forEach(b => result2.push(b)));
            return result2;
        },
        reduce: reduce,
        sum: array => reduce(0, (accum, element, index) => accum + element),
        firstOrDefault: firstOrDefault,
        first: function (array, fn) {
            var result = firstOrDefault(array, fn);
            if (result === undefined || result === null) {
                throw 'Result does not contain any members';
            }
            return result;
        },
        min: function (array, fn) {
            var result = null;
            for (var i = 0; i < array.length; i++) {
                var thisResult = fn(array[i]);
                if (result == null || thisResult < result ) {
                    result = thisResult;
                }
            }
            return result;
        },
        max: function (array, fn) {
            var result = null;
            for (var i = 0; i < array.length; i++) {
                var thisResult = fn === undefined ? array[i] : fn(array[i]);
                if (result == null || thisResult > result ) {
                    result = thisResult;
                }
            }
            return result;
        }           
    }
}());