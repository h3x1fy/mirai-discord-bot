const chalk = require('chalk');

module.exports = {
    log: function (type, msg) {
        switch (type) {
            case 0:
                msg = `${chalk.white('[')} ${chalk.hex('#09ff00')('SUCCESS')} ${chalk.white(`] - ${msg}`)}`;
                break;
            case 1:
                msg = `${chalk.white('[')} ${chalk.hex('#0084ff')('INFO')} ${chalk.white(`] - ${msg}`)}`;
                break;
            case 2:
                msg = `${chalk.white('[')} ${chalk.hex('#ffc400')('WARNING')} ${chalk.white(`] - ${msg}`)}`;
                break;
            case 3:
                msg = `${chalk.white('[')} ${chalk.hex('#ff0000')('ERROR')} ${chalk.white(`] - ${msg}`)}`;
                break;
            default:
                msg = `${chalk.white('[')} ${chalk.hex('#e857ff')('UNKNOWN')} ${chalk.white(`] - ${msg}`)}`;
                break;
        }
        console.log(msg);
    }
};