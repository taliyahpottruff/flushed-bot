require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const filter = require('./filter');

let optout = [];

// Bot stuff
client.on("message", (message) => {
    if (message.content.startsWith('fb!')) {
        const parts = message.content.split(' ');
        
        switch (parts[1]) {
            case 'stop':
                opt(true, message);
                break;
            case 'start':
                opt(false, message);
                break;
        }

        return;
    }
    
    const optedOut = optout.find(user => user == message.author.id);
    const isFlushable = filter(message);

    if (isFlushable && !optedOut) {
        message.react('😳');
    }
});

function opt (out, message) {
    const index = optout.findIndex(value => value == message.author.id);

    if (out) {
        if (index < 0) {
            optout.push(message.author.id);
            fs.writeFile('./optout.txt', optout, console.error);

            message.reply('sorry... You won\'t be 😳 again...');
        }
    } else {
        if (index >= 0) {
            optout.splice(index, 1);
            fs.writeFile('./optout.txt', optout, console.error);

            message.reply('welcome back!');
        }
    }
}

client.once('ready', () => {
	console.log('Ready!');
});

// Load in optout
const data = fs.readFileSync('./optout.txt', 'utf8');
optout = data.split(',');
console.log(optout);
client.login(process.env.DISCORD_TOKEN);