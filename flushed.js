require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on("message", (message) => {
    const simpleMessage = message.content.toLowerCase();

    if (simpleMessage.startsWith('im') || simpleMessage.startsWith('i\'m') || simpleMessage.startsWith('i’m')) {
        message.react('😳');
    }
});

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.DISCORD_TOKEN);