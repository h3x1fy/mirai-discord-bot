const Discord = require('discord.js');

module.exports = {
    info: function () {
        return { name: "help", "description": "List all commands.", "type": "premium" };
    },
    run: async function (client, message, args) {
        if (!message.member._roles.includes(process.env.BOT_PERM_PREMIUM))
            return;

        if (message.channel.id != process.env.BOT_CHANNEL_PREMIUM)
            return;

        message.delete().catch(() => { });

        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Commands')
            .setDescription('All commands list')
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL());

        client.commands.map(command => {
            helpEmbed.addField(`${command.info().name} : ${command.info().type}`, command.info().description, false);
        });

        message.channel.send(helpEmbed);
    }
};