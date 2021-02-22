require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const filter = require('./filter');

client.on("message", (message) => {
    const isFlushable = filter(message);

    if (isFlushable) {
        message.react('😳');
    }
});

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.DISCORD_TOKEN);