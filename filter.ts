import Discord from 'discord.js';

module.exports = (message : Discord.Message) => {
    var processed = message.content.toLowerCase();
    processed = processed.replace(/[^0-9a-z ]/gi, '');
    var filter = false;

    // Check for key phrases
    filter = 
        processed.includes('its so big') ||
        processed.includes('youre cute') ||
        processed.includes('youre so cute') ||
        processed.includes('its so long') ||
        processed.includes('massive mommy') ||
        processed.includes('she was like are you just going to go now or') ||
        processed.includes('is sexy');

    if (filter) console.log(`(#${message.channel}) @${message.author.username}: ${processed}`);

    return filter;
};