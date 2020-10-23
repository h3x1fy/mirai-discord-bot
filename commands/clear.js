const Discord = require('discord.js');

module.exports = {
    info: function () {
        return { name: "clear", "description": "clean channel messages.", "type": "developer" };
    },
    run: async function (client, message, args) {
        if (!process.env.BOT_DEVS.includes(message.author.id))
            return;

        message.channel.bulkDelete(parseInt(100)).catch(err => { });
    }
};