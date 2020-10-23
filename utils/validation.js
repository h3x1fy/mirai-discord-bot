module.exports = {
    isV4Format: function (ip) {
        var ipv4Regex = /^(\d{1,3}\.){3,3}\d{1,3}$/;
        return ipv4Regex.test(ip);
    },
    isValidPort: function (port) {
        var portRegex = /^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$/;
        return portRegex.test(port);
    },
    isValidTime: function (length) {
        if (isNaN(length))
            return false;

        if (length < 10 || length > 300)
            return false;

        return true;
    },
    isValidMethod: function (database, method) {
        return database.get('methods').find({ name: method }).value();
    }
};