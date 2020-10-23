const Discord = require('discord.js');

module.exports = {
    info: function () {
        return { name: "methods", "description": "List all attack methods.", "type": "premium" };
    },
    run: async function (client, message, args) {
        if (!message.member._roles.includes(process.env.BOT_PERM_PREMIUM))
            return;

        if (message.channel.id != process.env.BOT_CHANNEL_PREMIUM)
            return;

        message.delete().catch(() => { });

        const methodsEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Methods')
            .setDescription('All attack methods')
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL());

        var methods = await client.database.get('methods').value();

        methods.forEach(method => {
            methodsEmbed.addField(method.name, method.description, false);
        });

        message.channel.send(methodsEmbed);
    }
};