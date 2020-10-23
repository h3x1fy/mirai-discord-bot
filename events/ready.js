const { Console } = require('console');
const logger = require('../utils/logger');

exports.run = client => {
    logger.log(0, 'Ready!');

    var getAttacksCount = function () {
        return Object.keys(client.database.get('attacks').value()).length;
    }
    
    var randomStatus = function () {
        var presets = [
            { message: `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Users.`, "type": "WATCHING" },
            { message: `${process.env.BOT_PREFIX}help`, "type": "WATCHING" },
            { message: `${getAttacksCount()} Attacks.`, "type": "WATCHING" }
        ];

        return presets[Math.floor(Math.random() * presets.length)];
    };

    setInterval(() => {
        var preset = randomStatus();
        client.user.setActivity(preset.message, { type: preset.type });
    }, 5 * 1000);
};