exports.random_str = function() {
    var len = 32;
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    var max = chars.length;
    var str = '';
    for (var i = 0; i < len; i++) {
　　　　str += chars.charAt(Math.floor(Math.random() * max));
    }
    return str;
};