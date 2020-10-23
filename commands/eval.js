const Discord = require('discord.js');

module.exports = {
    info: function () {
        return { name: "eval", "description": "Used to show structures.", "type": "developer" };
    },
    run: async function (client, message, args) {
        if (!process.env.BOT_DEVS.includes(message.author.id))
            return;

        if (message.channel.id != process.env.BOT_CHANNEL_DEV)
            return;

        message.delete().catch(() => { });

        const resultEmbed = new Discord.MessageEmbed()
            .setColor('#00a2ff')
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL());

        try {
            let result = eval(args.join(" "));

            if (result instanceof Promise)
                await result;

            if (typeof result !== "string")
                result = require("util").inspect(result);

            resultEmbed.setTitle('Result');
            resultEmbed.setDescription('```' + result.slice(0, 2000) + '```');

            message.channel.send(resultEmbed);
        } catch (err) {
            resultEmbed.setTitle('Error');
            resultEmbed.setDescription('```' + err.slice(0, 2000) + '```');

            message.channel.send(resultEmbed);
        }
    }
};