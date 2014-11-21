Array.prototype.where = function (fn) {
    var array = this;
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
};

Array.prototype.firstOrDefault = function (fn) {
    var array = this;
    if (fn !== undefined && fn !== null) {
        array = array.where(fn);
    }
    if (array.length == 0) {
        return null;
    }
    return array[0];
};


Array.prototype.select = function (fn) {
    var array = this;
    var result = [];
    for (var i = 0; i < array.length; i++) {
        result.push(fn(array[i]));
    }
    return result;
};
Array.prototype.min = function (fn) {
    var array = this;
    var result = null;
    for (var i = 0; i < array.length; i++) {
        var thisResult = fn(array[i]);
        if (result == null || thisResult < result ) {
            result = thisResult;
        }
    }
    return result;
};
Array.prototype.max = function (fn) {
    var array = this;
    var result = null;
    for (var i = 0; i < array.length; i++) {
        var thisResult = fn(array[i]);
        if (result == null || thisResult > result ) {
            result = thisResult;
        }
    }
    return result;
};

Array.prototype.forEach = function (fn) {
    var array = this;
    for (var index = 0; index < array.length; ++index) {
        fn(array[index], index);
    }
};

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