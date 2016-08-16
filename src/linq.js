module.exports = () => {

    var mergeSelect = function(array1, array2, fn) {
        var result = [];
        if (array1.length != array2.length) {
            throw "Cannot merge arrays of different lengths";
        }
        for (var i = 0; i < array1.length; i++) {
            result.push(fn(array1[i], array2[i]));
        }
        return result;
    };

    return {
        selectMany: function (fn) {
            var array = this;
            var result1 = array.select(fn);
            var result2 = [];
            result1.forEach(function (a) {
                a.forEach(function(b) {
                    result2.push(b);
                });
            });
            return result2;
        },
        reduce: function (accum, fn) {
            var array = this;
            for (var index = 0; index < array.length; ++index) {
                accum = fn(accum, array[index], index);
            }
            return accum;
        },
        sum: function () {
            var array = this;
            return array.reduce(0, function (accum, element, index) {
                return accum + element;
            });
        },
        firstOrDefault: function (fn) {
            var array = this;
            if (fn !== undefined && fn !== null) {
                array = array.where(fn);
            }
            if (array.length == 0) {
                return null;
            }
            return array[0];
        },
        first: function (fn) {
            var result = this.firstOrDefault(fn);
            if (result === undefined || result === null) {
                throw 'Result does not contain any members';
            }
            return result;
        },
        min: function (fn) {
            var array = this;
            var result = null;
            for (var i = 0; i < array.length; i++) {
                var thisResult = fn(array[i]);
                if (result == null || thisResult < result ) {
                    result = thisResult;
                }
            }
            return result;
        },
        max: function (fn) {
            var array = this;
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
};