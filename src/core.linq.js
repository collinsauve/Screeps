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

    function keyBy(array, keyName) {
        var result = {};
        array.forEach(item => result[item[keyName]] = item);
        return result;
    }

    function any(array, predicate) {
        for (var index in array) {
            const item = array[index];
            if (predicate(item)) return true;
        }
        return false;
    }

    function contains(array, find) {
        return any(array, i => i === find);
        return r;
    }

    function concat(array1, array2) {

        //TODO: Allow mixed arrays and single elements
        var result = [];
        for (var index1 in array1) {
            result.push(array1[index1]);
        }
        for (var index2 in array2) {
            result.push(array2[index2]);
        }
        return result;
    }

    return {
        keyBy: keyBy,
        any,
        contains,
        concat,
        map: (array, fn) => array === null || array === undefined ? [] : array.map(fn), 
        selectMany: function (array, fn) {
            var result1 = _.map(array, fn);
            var result2 = [];
            result1.forEach(a => a.forEach(b => result2.push(b)));
            return result2;
        },
        reduce: reduce,
        sum: array => reduce(array, 0, (accum, element, index) => accum + element),
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